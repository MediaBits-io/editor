import React, { useRef, useEffect, useCallback } from 'react';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { KonvaNodeEvents, Transformer } from 'react-konva';
import Konva from 'konva';
import useElements from '../hooks/useElements';

export const MIN_WIDTH = 5;
export const MIN_HEIGHT = 5;

interface Props {
  id: string;
  children: (props: Konva.ShapeConfig & KonvaNodeEvents) => React.ReactNode;
  transformerFn?: (node: Konva.Shape) => Konva.ShapeConfig;
  anchors?: string[];
}

const InteractiveKonvaElement = ({
  id,
  anchors,
  children,
  transformerFn,
}: Props) => {
  const shapeRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const { selectedElement } = useElements();
  const { dispatch } = EditorContainer.useContainer();

  const isSelected = selectedElement?.id === id;

  useEffect(() => {
    if (isSelected && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, selectedElement]);

  const handleSelect = () => {
    dispatch({ type: 'select_element', id });
  };

  const handleChange = (props: Konva.ShapeConfig) => {
    dispatch({ type: 'update_element', id, props });
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    handleChange({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransform = useCallback(() => {
    const node = shapeRef.current;
    if (node && transformerFn) {
      node.setAttrs(transformerFn(node));
    }
  }, [transformerFn]);

  const handleTransformEnd = () => {
    const node = shapeRef.current;

    if (node) {
      handleTransform();
      handleChange({
        ...node.getAttrs(),
      });
    }
  };

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
