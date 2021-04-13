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
}

const InteractiveKonvaElement = ({
  id,
  children,
  transform,
  transformEnd,
  enabledAnchors,
}: Props) => {
  const { updateElementProps, selectElement } = useElementsDispatcher();
  const { transformerRef, setElementRef } = ElementRefsContainer.useContainer();
  const { updateGuideLines } = useGuideLines();
  const shapeRef = useRef<Konva.Shape>(null);

  useEffect(() => {
    if (shapeRef.current) {
      setElementRef(id, shapeRef.current, { enabledAnchors });

      return () => {
        setElementRef(id, undefined);
      };
    }
  }, [enabledAnchors, id, setElementRef]);

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

  const handleDragEnd = useRecoilCallback(
    ({ reset }) => (e: Konva.KonvaEventObject<DragEvent>) => {
      reset(guideLinesState);
      handleChange({
        x: e.target.x(),
        y: e.target.y(),
      });
    },
    [handleChange]
  );

  const handleTransform = useCallback(
    (evt: KonvaEventObject<Event>) => {
      if (shapeRef.current && transformerRef.current && transform) {
        shapeRef.current.setAttrs(transform(evt, transformerRef.current));
      }
      // TODO: Snap on resize. When transforming snap (and show guidelines) only on the active edge
      // requestAnimationFrame(() => {
      //   if (shapeRef.current) {
      //     updateGuideLines(shapeRef.current);
      //   }
      // });
    },
    [transform, transformerRef]
  );

  const handleTransformEnd = useRecoilCallback(
    ({ reset }) => (evt: KonvaEventObject<Event>) => {
      // reset(guideLinesState);

      if (!shapeRef.current) {
        return;
      }

      if (transformerRef.current && transformEnd) {
        shapeRef.current.setAttrs(transformEnd(evt, transformerRef.current));
      }

      handleChange({
        ...shapeRef.current.getAttrs(),
      });
    },
    [handleChange, transformEnd, transformerRef]
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
        updateGuideLines(e.target)?.forEach((line) => {
          if (line.orientation === 'vertical') {
            e.target.x(line.stop - line.edgeOffset);
          } else {
            e.target.y(line.stop - line.edgeOffset);
          }
        });
      }
    },
    [updateGuideLines]
  );

  return useMemo(
    () =>
      children({
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
      }),
    [
      children,
      handleDragEnd,
      handleDragMove,
      handleMouseEnter,
      handleMouseLeave,
      handleSelect,
      handleTransform,
      handleTransformEnd,
      id,
    ]
  );
};

export default InteractiveKonvaElement;
