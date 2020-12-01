import React, { useRef, useEffect, useCallback } from 'react';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { KonvaNodeEvents, Transformer } from 'react-konva';
import Konva from 'konva';
import { isTruthy } from '../../../utils/boolean';
import { ShapeTransformerConfig } from '../interfaces/Shape';
import useElements from '../hooks/useElements';

const MIN_WIDTH = 1;
const MIN_HEIGHT = 1;

interface Props {
  id: string;
  children: (props: Konva.ShapeConfig & KonvaNodeEvents) => React.ReactNode;
  transformerConfig?: ShapeTransformerConfig;
}

const InteractiveKonvaElement = ({
  id,
  children,
  transformerConfig = {},
}: Props) => {
  const shapeRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const { selectedElement } = useElements();
  const { dispatch } = EditorContainer.useContainer();

  const {
    anchors = { x: true, y: true },
    type: transformerType = 'scale',
  } = transformerConfig;

  const isSelected = selectedElement?.id === id;

  useEffect(() => {
    if (isSelected && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, selectedElement]);

  const resetNodeScale = useCallback(() => {
    const node = shapeRef.current;
    if (node && transformerType === 'resize') {
      node.setAttrs({
        width: Math.max(node.width() * node.scaleX(), MIN_WIDTH),
        height: Math.max(node.height() * node.scaleY(), MIN_HEIGHT),
        scaleX: 1,
        scaleY: 1,
      });
    }
  }, [transformerType]);

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

  const handleTransformEnd = () => {
    const node = shapeRef.current;

    if (node) {
      resetNodeScale();
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
        onTransform: resetNodeScale,
      })}

      {isSelected && (
        <Transformer
          ref={transformerRef}
          enabledAnchors={[
            anchors.x && 'middle-left',
            anchors.x && 'middle-right',
            anchors.y && 'top-center',
            anchors.y && 'bottom-center',
            anchors.y && anchors.x && 'top-left',
            anchors.y && anchors.x && 'top-right',
            anchors.y && anchors.x && 'bottom-left',
            anchors.y && anchors.x && 'bottom-right',
          ].filter(isTruthy)}
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
