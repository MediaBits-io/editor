import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import { omit } from 'ramda';
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
  centered?: boolean;
}

const InteractiveKonvaElement = ({
  id,
  children,
  transform,
  transformEnd,
  enabledAnchors,
  keepRatio,
  centered,
}: Props) => {
  const { updateElementProps, selectElement, deleteElement } =
    useElementsDispatcher();
  const { transformerRef, elementNodes, setElementRef } =
    ElementRefsContainer.useContainer();
  const { updateGuideLines } = useGuideLines();
  const shapeRef = useRef<Konva.Shape>(null);

  useEffect(() => {
    if (shapeRef.current) {
      setElementRef(id, shapeRef.current, {
        keepRatio,
        enabledAnchors,
      });

      if (centered) {
        shapeRef.current.offsetX(shapeRef.current.width() / 2);
        shapeRef.current.offsetY(shapeRef.current.height() / 2);
      }
      console.log(
        'ELEE',
        centered,
        shapeRef.current.offsetX(),
        shapeRef.current.x()
      );

      return () => {
        setElementRef(id, undefined);
      };
    }
  }, [centered, enabledAnchors, id, keepRatio, setElementRef]);

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
    ({ snapshot }) =>
      (node: Konva.Shape) => {
        const dimensions = snapshot.getLoadable(dimensionsState).getValue();
        return (
          node.x() - node.offsetX() + node.width() * node.scaleX() <= 0 ||
          node.x() - node.offsetX() >= dimensions.width ||
          node.y() - node.offsetY() + node.height() * node.scaleY() <= 0 ||
          node.y() - node.offsetY() >= dimensions.height
        );
      },
    []
  );

  const handleDragEnd = useRecoilCallback(
    ({ reset }) =>
      () => {
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

      const scaleX = shape.scaleX();
      const width = shape.width() * scaleX;
      const scaleY = shape.scaleY();
      const height = shape.height() * scaleY;

      if (anchor) {
        const lines = updateGuideLines(shape, elementNodes, anchor);

        // console.log('STOP', relativeDiff, line.stop);

        lines.forEach((line) => {
          switch (line.orientation) {
            case 'vertical': {
              // TODO: fixme, could be that line.stop has old fixed offset, should recalculate with scaled maybe?
              let relativeDiff = line.stop - shape.x() - line.edgeOffset;

              if (anchor.includes('left')) {
                relativeDiff *= -1;
                console.log('STOP', relativeDiff, line.stop);
                if (centered) {
                  shape.x(line.stop + (shape.width() + relativeDiff) / 2);
                } else {
                  shape.x(line.stop);
                }
              }

              // TODO: centered resize width (right) snapping
              shape.scaleX(
                scaleX * ((shape.width() + relativeDiff) / shape.width())
              );
              break;
            }
            case 'horizontal': {
              // const offsetY = shape.offsetY() * scaleY;
              let relativeDiff = line.stop - shape.y() - line.edgeOffset;

              if (anchor.includes('top')) {
                relativeDiff *= -1;
                if (centered) {
                  shape.y(line.stop + (shape.height() + relativeDiff) / 2);
                } else {
                  shape.y(line.stop);
                }
              }

              shape.scaleY(
                scaleY * ((shape.height() + relativeDiff) / shape.height())
              );
              break;
            }
          }
        });
      }

      // console.log(
      //   'tra 1',
      //   shape.offsetX(),
      //   shape.scaleX(),
      //   shape.x(),
      //   shape.width()
      // );

      // const offsetXBefore = (shape.width() * shape.scaleX()) / 2;
      // const xBefore = shape.x();

      if (transformerRef.current && transform) {
        shape.setAttrs(transform(evt, transformerRef.current));
      }

      // const offsetXAfter = (shape.width() * shape.scaleX()) / 2;
      // const xAfter = shape.x();

      // console.log('tra 2', offsetXBefore, xBefore, offsetXAfter, xAfter);

      if (centered) {
        // if (anchor.includes('left')) {
        //   relativeDiff *= -1;
        //   shape.x(line.stop);
        // }

        // const diffX = (shape.width() * shape.scaleX()) / 2 - shape.offsetX();
        // shape.x(
        //   shape.x() - (shape.width() * shape.scaleX()) / 2 + shape.offsetX()
        // );
        // shape.x(shape.x() - diffX);
        shape.offsetX(shape.width() / 2);
        shape.offsetY(shape.height() / 2);
      }
    },
    [centered, elementNodes, transform, transformerRef, updateGuideLines]
  );

  const handleTransformEnd = useRecoilCallback(
    ({ reset }) =>
      (evt: KonvaEventObject<Event>) => {
        reset(guideLinesState);

        const shape = shapeRef.current;

        if (!shape) {
          return;
        }

        if (transformerRef.current && transformEnd) {
          shape.setAttrs(transformEnd(evt, transformerRef.current));
        }

        if (centered) {
          // shape.x(shape.x() - shape.width() / 2 + shape.offsetX());
          // shape.y(shape.y() - shape.height() / 2 + shape.offsetY());
          shape.offsetX(shape.width() / 2);
          shape.offsetY(shape.height() / 2);
        }

        if (isOutOfBounds(shape)) {
          deleteElement(id);
        } else {
          handleChange({
            ...omit(centered ? ['offsetX', 'offsetY'] : [], shape.getAttrs()),
          });
        }
      },
    [
      centered,
      deleteElement,
      handleChange,
      id,
      isOutOfBounds,
      transformEnd,
      transformerRef,
    ]
  );

  const handleMouseEnter = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
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
    ({ reset }) =>
      () => {
        reset(highlightedElementIdState);
      },
    []
  );

  const handleDragMove = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      const node = e.target;
      if (!(node instanceof Konva.Stage)) {
        updateGuideLines(node, elementNodes).forEach((line) => {
          if (line.orientation === 'vertical') {
            node.x(line.stop - line.edgeOffset);
          } else {
            node.y(line.stop - line.edgeOffset);
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
