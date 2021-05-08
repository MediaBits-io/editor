import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import { useRecoilCallback } from 'recoil';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import useGuideLines from '../../hooks/useGuideLines';
import {
  guideLinesState,
  highlightedElementIdState,
} from '../../state/atoms/editor';
import { dimensionsState } from '../../state/atoms/template';
import useElementsDispatcher from '../../state/dispatchers/elements';

export const MIN_WIDTH = 5;
export const MIN_HEIGHT = 5;

interface Props {
  id: string;
  children: (props: Konva.ShapeConfig & KonvaNodeEvents) => React.ReactElement;
  transform?: (
    evt: KonvaEventObject<Event>,
    transformer: Konva.Transformer
  ) => Konva.ShapeConfig;
  transformEnd?: (
    evt: KonvaEventObject<Event>,
    transformer: Konva.Transformer
  ) => Konva.ShapeConfig;
  enabledAnchors?: string[];
  keepRatio?: boolean;
}

const InteractiveKonvaElement = ({
  id,
  children,
  transform,
  transformEnd,
  enabledAnchors,
  keepRatio,
}: Props) => {
  const {
    updateElementProps,
    selectElement,
    deleteElement,
  } = useElementsDispatcher();
  const {
    transformerRef,
    elementNodes,
    setElementRef,
  } = ElementRefsContainer.useContainer();
  const { updateGuideLines } = useGuideLines();
  const shapeRef = useRef<Konva.Shape>(null);

  useEffect(() => {
    if (shapeRef.current) {
      setElementRef(id, shapeRef.current, { keepRatio, enabledAnchors });

      return () => {
        setElementRef(id, undefined);
      };
    }
  }, [enabledAnchors, id, keepRatio, setElementRef]);

  const handleSelect = useCallback(
    (evt: KonvaEventObject<MouseEvent>) => {
      evt.cancelBubble = true;
      selectElement(id);
    },
    [id, selectElement]
  );

  const handleChange = useCallback(
    (props: Konva.ShapeConfig) => {
      updateElementProps(id, props);
    },
    [id, updateElementProps]
  );

  const isOutOfBounds = useRecoilCallback(
    ({ snapshot }) => (node: Konva.Shape) => {
      const dimensions = snapshot.getLoadable(dimensionsState).getValue();
      return (
        node.x() + node.width() * node.scaleX() <= 0 ||
        node.x() >= dimensions.width ||
        node.y() + node.height() * node.scaleY() <= 0 ||
        node.y() >= dimensions.height
      );
    },
    []
  );

  const handleDragEnd = useRecoilCallback(
    ({ reset }) => () => {
      reset(guideLinesState);

      if (!shapeRef.current) {
        return;
      }

      if (isOutOfBounds(shapeRef.current)) {
        deleteElement(id);
      } else {
        handleChange({
          x: shapeRef.current.x(),
          y: shapeRef.current.y(),
        });
      }
    },
    [deleteElement, handleChange, id, isOutOfBounds]
  );

  const handleTransform = useCallback(
    (evt: KonvaEventObject<Event>) => {
      const shape = shapeRef.current;
      const anchor = transformerRef.current?.getActiveAnchor();

      if (!shape) {
        return;
      }

      if (anchor) {
        const lines = updateGuideLines(shape, elementNodes, anchor);

        lines.forEach((line) => {
          switch (line.orientation) {
            case 'vertical': {
              const scaleX = shape.scaleX();
              const width = shape.width() * scaleX;

              let relativeDiff = line.stop - shape.x() - line.edgeOffset;

              if (anchor.includes('left')) {
                relativeDiff *= -1;
                shape.x(line.stop);
              }

              shape.scaleX(scaleX * ((width + relativeDiff) / width));
              break;
            }
            case 'horizontal': {
              const scaleY = shape.scaleY();
              const height = shape.height() * scaleY;

              let relativeDiff = line.stop - shape.y() - line.edgeOffset;

              if (anchor.includes('top')) {
                relativeDiff *= -1;
                shape.y(line.stop);
              }

              shape.scaleY(scaleY * ((height + relativeDiff) / height));
              break;
            }
          }
        });
      }

      if (transformerRef.current && transform) {
        shape.setAttrs(transform(evt, transformerRef.current));
      }
    },
    [elementNodes, transform, transformerRef, updateGuideLines]
  );

  const handleTransformEnd = useRecoilCallback(
    ({ reset }) => (evt: KonvaEventObject<Event>) => {
      reset(guideLinesState);

      if (!shapeRef.current) {
        return;
      }

      if (transformerRef.current && transformEnd) {
        shapeRef.current.setAttrs(transformEnd(evt, transformerRef.current));
      }

      if (isOutOfBounds(shapeRef.current)) {
        deleteElement(id);
      } else {
        handleChange({
          ...shapeRef.current.getAttrs(),
        });
      }
    },
    [
      deleteElement,
      handleChange,
      id,
      isOutOfBounds,
      transformEnd,
      transformerRef,
    ]
  );

  const handleMouseEnter = useRecoilCallback(
    ({ set, snapshot }) => () => {
      const highlightedElementId = snapshot
        .getLoadable(highlightedElementIdState)
        .getValue();
      if (highlightedElementId !== id) {
        set(highlightedElementIdState, id);
      }
    },
    [id]
  );

  const handleMouseLeave = useRecoilCallback(
    ({ reset }) => () => {
      reset(highlightedElementIdState);
    },
    []
  );

  const handleDragMove = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      if (!(e.target instanceof Konva.Stage)) {
        updateGuideLines(e.target, elementNodes).forEach((line) => {
          if (line.orientation === 'vertical') {
            e.target.x(line.stop - line.edgeOffset);
          } else {
            e.target.y(line.stop - line.edgeOffset);
          }
        });
      }
    },
    [elementNodes, updateGuideLines]
  );

  return useMemo(() => {
    return children({
      id,
      onClick: handleSelect,
      onTap: handleSelect,
      ref: shapeRef,
      draggable: true,
      onDragEnd: handleDragEnd,
      onDragMove: handleDragMove,
      onDragStart: handleSelect,
      onTransformEnd: handleTransformEnd,
      onTransform: handleTransform,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    });
  }, [
    children,
    handleDragEnd,
    handleDragMove,
    handleMouseEnter,
    handleMouseLeave,
    handleSelect,
    handleTransform,
    handleTransformEnd,
    id,
  ]);
};

export default InteractiveKonvaElement;
