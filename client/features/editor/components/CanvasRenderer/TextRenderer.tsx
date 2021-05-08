import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useCallback, useEffect, useRef } from 'react';
import { Rect, Text } from 'react-konva';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import { TextConfig } from '../../interfaces/Shape';
import InteractiveKonvaElement, { MIN_WIDTH } from './InteractiveKonvaElement';

const MIN_FONT_SIZE = 8;

const enabledAnchors = [
  'middle-left',
  'middle-right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];
interface Props {
  id: string;
  props: TextConfig;
}

function TextRenderer({ id, props }: Props) {
  const backgroundRef = useRef<Konva.Rect | null>(null);
  const textRef = useRef<Konva.Text | null>(null);
  const { transformerRef } = ElementRefsContainer.useContainer();

  const transform = useCallback(
    (
      evt: KonvaEventObject<Event>,
      transformer: Konva.Transformer
    ): Partial<TextConfig> => {
      const node = evt.target as Konva.Text;
      const anchor = transformer.getActiveAnchor();

      if (!['middle-right', 'middle-left'].includes(anchor)) {
        return {};
      }

      return {
        width: Math.max(
          node.width() * node.scaleX(),
          node.fontSize(),
          MIN_WIDTH
        ),
        scaleX: 1,
      };
    },
    []
  );

  const transformEnd = useCallback(
    (evt: KonvaEventObject<Event>): Partial<TextConfig> => {
      const textNode = evt.target as Konva.Text;
      return {
        width: Math.max(
          textNode.width() * textNode.scaleX(),
          textNode.measureSize(textNode.text()[0]).width,
          MIN_WIDTH
        ),
        fontSize: Math.max(
          textNode.fontSize() * textNode.scaleY(),
          MIN_FONT_SIZE
        ),
        scaleX: 1,
        scaleY: 1,
      };
    },
    []
  );

  const syncBackground = () => {
    const bg = backgroundRef.current;
    const text = textRef.current;

    if (bg && text) {
      bg.x(text.x());
      bg.y(text.y());
      bg.width(text.width());
      bg.height(text.height());
      bg.scaleX(text.scaleX());
      bg.scaleY(text.scaleY());
      bg.rotation(text.rotation());
    }
  };

  useEffect(() => {
    syncBackground();
    transformerRef.current?.forceUpdate();
    backgroundRef.current?.getLayer()?.batchDraw();
  }, [props, transformerRef]);

  return (
    <InteractiveKonvaElement
      id={id}
      enabledAnchors={enabledAnchors}
      keepRatio
      transform={transform}
      transformEnd={transformEnd}
    >
      {(additionalProps) => (
        <>
          {props.backgroundEnabled && (
            <Rect {...props.background} ref={backgroundRef} />
          )}
          <Text
            {...props}
            {...additionalProps}
            fillEnabled={true}
            fill={props.fillEnabled ? props.fill : 'transparent'}
            onDragMove={(...rest) => {
              additionalProps.onDragMove?.(...rest);
              syncBackground();
            }}
            onDragEnd={(...rest) => {
              additionalProps.onDragEnd?.(...rest);
              syncBackground();
            }}
            onTransform={(...rest) => {
              additionalProps.onTransform?.(...rest);
              syncBackground();
            }}
            onTransformEnd={(...rest) => {
              additionalProps.onTransformEnd?.(...rest);
              syncBackground();
            }}
            ref={(el) => {
              additionalProps.ref.current = el;
              textRef.current = el;
            }}
          />
        </>
      )}
    </InteractiveKonvaElement>
  );
}

export default TextRenderer;
