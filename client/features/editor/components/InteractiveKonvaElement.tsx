import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { KonvaNodeEvents } from 'react-konva';
import { ElementRefsContainer } from '../containers/ElementRefsContainer';
import useElementsDispatcher from '../state/dispatchers/elements';

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

  const handleDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
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
    },
    [transform, transformerRef]
  );

  const handleTransformEnd = useCallback(
    (evt: KonvaEventObject<Event>) => {
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

  return useMemo(
    () =>
      children({
        id,
        onClick: handleSelect,
        onTap: handleSelect,
        ref: shapeRef,
        draggable: true,
        onDragEnd: handleDragEnd,
        onDragStart: handleSelect,
        onTransformEnd: handleTransformEnd,
        onTransform: handleTransform,
      }),
    [
      children,
      handleDragEnd,
      handleSelect,
      handleTransform,
      handleTransformEnd,
      id,
    ]
  );
};

export default InteractiveKonvaElement;
