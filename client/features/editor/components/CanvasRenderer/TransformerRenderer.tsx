import Konva from 'konva';
import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import { MIN_HEIGHT, MIN_WIDTH } from './InteractiveKonvaElement';

interface Props {
  elementId: string;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

const highlightProps = {
  rotateEnabled: false,
  enabledAnchors: [],
  borderStroke: 'rgba(0, 161, 255, 0.4)',
};

function TransformerRenderer({ elementId, isSelected, isHighlighted }: Props) {
  const { transformerRef, elementRefs } = ElementRefsContainer.useContainer();
  const localTransformerRef = useRef<Konva.Transformer | null>(null);

  const element = elementId ? elementRefs[elementId] : undefined;
  const isVisible = isSelected || isHighlighted;

  useEffect(() => {
    const transformer = localTransformerRef.current;

    if (isVisible && element && transformer) {
      transformer.nodes([element.ref]);
      transformer.getLayer()?.batchDraw();

      if (isSelected) {
        transformerRef.current = transformer;
      }

      return () => {
        transformer.nodes([]);
        transformerRef.current = null;
      };
    }
  }, [element, isSelected, isVisible, localTransformerRef, transformerRef]);

  if (!isVisible) {
    return null;
  }

  return (
    <Transformer
      {...element?.transformerProps}
      ref={localTransformerRef}
      ignoreStroke
      rotationSnaps={[0, 90, 180, 270]}
      keepRatio={element?.transformerProps?.keepRatio ?? false}
      boundBoxFunc={(oldBox, newBox) =>
        newBox.width < MIN_WIDTH || newBox.height < MIN_HEIGHT ? oldBox : newBox
      }
      {...(!isSelected ? highlightProps : {})}
    />
  );
}

export default TransformerRenderer;
