import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Image } from 'react-konva';
import { ShapeConfig } from 'konva/types/Shape';
import InteractiveKonvaElement from '../../InteractiveKonvaElement';

interface Props {
  id: string;
  props: ShapeConfig;
}

// TODO: transformer with crop
// TODO: save ref into state to be able to cache ONCE after blur changes
function ImageRenderer({ id, props }: Props) {
  const imageRef = useRef<Konva.Image | null>(null);

  useEffect(() => {
    // Cache for ability to blur background
    imageRef.current?.cache();
  }, [props.filters]);

  return (
    <InteractiveKonvaElement id={id}>
      {(additionalProps) => (
        <Image
          {...(props as Konva.ImageConfig)}
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
