import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useCallback, useEffect, useRef } from 'react';
import { KonvaNodeEvents, Transformer } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { selectedElementIdState } from '../state/atoms/editor';
import useElementsDispatcher from '../state/dispatchers/elements';

export const MIN_WIDTH = 5;
export const MIN_HEIGHT = 5;

interface Props {
  id: string;
  children: (props: Konva.ShapeConfig & KonvaNodeEvents) => React.ReactNode;
  transform?: (
    evt: KonvaEventObject<Event>,
    transformer: Konva.Transformer
  ) => Konva.ShapeConfig;
  transformEnd?: (
    evt: KonvaEventObject<Event>,
    transformer: Konva.Transformer
  ) => Konva.ShapeConfig;
  anchors?: string[];
}

const InteractiveKonvaElement = ({
  id,
  anchors,
  children,
  transform,
  transformEnd,
}: Props) => {
  const shapeRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const { updateElementProps, selectElement } = useElementsDispatcher();
  const selectedElementId = useRecoilValue(selectedElementIdState);

  const isSelected = selectedElementId === id;

  useEffect(() => {
    if (isSelected && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleSelect = () => {
    selectElement(id);
  };

  const handleChange = useCallback(
    (props: Konva.ShapeConfig) => {
      updateElementProps(id, props);
    },
    [id, updateElementProps]
  );

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    handleChange({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransform = useCallback(
    (evt: KonvaEventObject<Event>) => {
      const node = shapeRef.current;
      if (node && transformerRef.current && transform) {
        node.setAttrs(transform(evt, transformerRef.current));
      }
    },
    [transform]
  );

  const handleTransformEnd = useCallback(
    (evt: KonvaEventObject<Event>) => {
      const node = shapeRef.current;

      if (!node) {
        return;
      }

      if (node && transformerRef.current && transformEnd) {
        node.setAttrs(transformEnd(evt, transformerRef.current));
      }

      handleChange({
        ...node.getAttrs(),
      });
    },
    [handleChange, transformEnd]
  );

  return (
    <>
      {children({
        id,
        onClick: handleSelect,
        onTap: handleSelect,
        ref: shapeRef,
        draggable: true,
        onDragEnd: handleDragEnd,
        onTransformEnd: handleTransformEnd,
        onTransform: handleTransform,
      })}

      {isSelected && (
        <Transformer
          ref={transformerRef}
          enabledAnchors={anchors}
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < MIN_WIDTH || newBox.height < MIN_HEIGHT
              ? oldBox
              : newBox
          }
        />
      )}
    </>
  );
};

export default InteractiveKonvaElement;
