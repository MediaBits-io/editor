import React, { useLayoutEffect, useRef } from 'react';
import Konva from 'konva';
import { Image } from 'react-konva';
import InteractiveKonvaElement from '../InteractiveKonvaElement';

interface Props {
  id: string;
  props: Konva.ImageConfig;
}

// TODO: transformer with crop
function ImageRenderer({ id, props }: Props) {
  const imageRef = useRef<Konva.Image | null>(null);

  useLayoutEffect(() => {
    // Cache for ability to blur background
    imageRef.current?.cache();
    imageRef.current?.getLayer()?.batchDraw();
  }, [props.filters, props.image]);

  return (
    <InteractiveKonvaElement id={id}>
      {(additionalProps) => (
        <Image
          {...props}
          {...additionalProps}
          ref={(el) => {
            additionalProps.ref.current = el;
            imageRef.current = el;
          }}
        />
      )}
    </InteractiveKonvaElement>
  );
}

export default ImageRenderer;
