import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Image } from 'react-konva';
import InteractiveKonvaElement from '../InteractiveKonvaElement';
import { KonvaEventObject } from 'konva/types/Node';
import { ImageConfig, ImageFit } from '../../interfaces/Shape';
import Konva from 'konva';

interface Props {
  id: string;
  props: ImageConfig;
}

function ImageRenderer({ id, props }: Props) {
  const imageRef = useRef<Konva.Image | null>(null);

  const transform = useCallback(
    (evt: KonvaEventObject<Event>): Partial<ImageConfig> => {
      const node = evt.target as Konva.Image;

      if (node.isCached()) {
        node.clearCache();
      }

      const imageFit: ImageFit = node.getAttr('imageFit');
      const image = node.image()!;
      const imageWidth = image.width as number;
      const imageHeight = image.height as number;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const width = node.width() * scaleX;
      const height = node.height() * scaleY;

      const aspectRatio = width / height;
      const imageRatio = imageWidth / imageHeight;

      let crop = { x: 0, y: 0, width: imageWidth, height: imageHeight };

      if (imageFit === 'fill') {
        const cropWidth =
          aspectRatio >= imageRatio ? imageWidth : imageHeight * aspectRatio;
        const cropHeight =
          aspectRatio >= imageRatio ? imageWidth / aspectRatio : imageHeight;
        const cropX = (imageWidth - cropWidth) / 2;
        const cropY = (imageHeight - cropHeight) / 2;
        crop = { x: cropX, y: cropY, width: cropWidth, height: cropHeight };
      }

      return {
        scaleX: 1,
        scaleY: 1,
        width,
        height,
        crop,
      };
    },
    []
  );

  const transformEnd = useCallback(
    (evt: KonvaEventObject<Event>): Partial<ImageConfig> => {
      evt.target.cache();
      return {};
    },
    []
  );

  useLayoutEffect(() => {
    // Cache for ability to blur background
    imageRef.current?.cache();
    imageRef.current?.getLayer()?.batchDraw();
  }, [props.filters, props.image]);

  useEffect(() => {
    imageRef.current?.fire('transform');
    imageRef.current?.fire('transformend');
  }, [props.imageFit]);

  return (
    <InteractiveKonvaElement
      transform={transform}
      transformEnd={transformEnd}
      id={id}
    >
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
