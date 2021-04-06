import React, { useCallback } from 'react';
import InteractiveKonvaElement, { MIN_WIDTH } from '../InteractiveKonvaElement';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';
import { Text } from 'react-konva';

const MIN_FONT_SIZE = 8;

interface Props {
  id: string;
  props: Konva.TextConfig;
}

function TextRenderer({ id, props }: Props) {
  const transform = useCallback(
    (
      evt: KonvaEventObject<Event>,
      transformer: Konva.Transformer
    ): Partial<Konva.TextConfig> => {
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
    (evt: KonvaEventObject<Event>): Partial<Konva.TextConfig> => {
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

  return (
    <InteractiveKonvaElement
      id={id}
      anchors={[
        'middle-left',
        'middle-right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ]}
      transform={transform}
      transformEnd={transformEnd}
    >
      {(additionalProps) => <Text {...props} {...additionalProps} />}
    </InteractiveKonvaElement>
  );
}

export default TextRenderer;
