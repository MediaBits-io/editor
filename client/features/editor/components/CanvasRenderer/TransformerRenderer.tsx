import React, { useEffect } from 'react';
import { Transformer } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import { selectedElementIdState } from '../../state/atoms/editor';
import {
  MIN_HEIGHT,
  MIN_WIDTH,
} from '../InteractiveKonvaElement/InteractiveKonvaElement';

function TransformerRenderer() {
  const { transformerRef, elementRefs } = ElementRefsContainer.useContainer();
  const selectedElementId = useRecoilValue(selectedElementIdState);

  const element = selectedElementId
    ? elementRefs[selectedElementId]
    : undefined;

  useEffect(() => {
    const transformer = transformerRef.current;

    if (element && transformer) {
      transformer.nodes([element.ref]);
      transformer.getLayer()?.batchDraw();

      return () => {
        transformer.nodes([]);
      };
    }
  }, [element, transformerRef]);

  if (!selectedElementId) {
    return null;
  }

  return (
    <Transformer
      {...element?.transformerProps}
      ref={transformerRef}
      rotationSnaps={[0, 90, 180, 270]}
      keepRatio
      boundBoxFunc={(oldBox, newBox) =>
        newBox.width < MIN_WIDTH || newBox.height < MIN_HEIGHT ? oldBox : newBox
      }
    />
  );
}

export default TransformerRenderer;
