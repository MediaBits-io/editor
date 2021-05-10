import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useCallback, useEffect, useRef } from 'react';
import { Rect, Shape, Text } from 'react-konva';
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
  centered?: boolean;
}

function TextRenderer({ id, props, centered }: Props) {
  const backgroundRef = useRef<Konva.Rect | null>(null);
  const textRef = useRef<Konva.Text | null>(null);
  const { transformerRef } = ElementRefsContainer.useContainer();

  const transform = useCallback(
    (
      evt: KonvaEventObject<Event>,
      transformer: Konva.Transformer
    ): Partial<TextConfig> => {
      const textNode = evt.target as Konva.Text;
      const anchor = transformer.getActiveAnchor();

      if (!['middle-right', 'middle-left'].includes(anchor)) {
        return {};
      }

      return {
        width: Math.max(
          textNode.width() * textNode.scaleX(),
          textNode.fontSize(),
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
          textNode.fontSize(),
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
      bg.visible(text.visible());

      if (centered) {
        bg.offsetX(text.offsetX());
        bg.offsetY(text.offsetY());
      }
    }
  };

  useEffect(() => {
    transformerRef.current?.forceUpdate();
  }, [props, transformerRef]);

  return (
    <InteractiveKonvaElement
      id={id}
      enabledAnchors={enabledAnchors}
      keepRatio
      centeredScaling={centered}
      transform={transform}
      transformEnd={transformEnd}
    >
      {(additionalProps) => (
        <>
          <Shape sceneFunc={syncBackground} />
          {props.backgroundEnabled && (
            <Rect {...props.background} ref={backgroundRef} />
          )}
          <Text
            verticalAlign="middle"
            {...props}
            {...additionalProps}
            fillEnabled={true}
            fill={props.fillEnabled ? props.fill : 'transparent'}
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
