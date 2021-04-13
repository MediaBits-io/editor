import React, { useCallback, useEffect, useRef } from 'react';
import InteractiveKonvaElement, {
  MIN_WIDTH,
} from '../InteractiveKonvaElement/InteractiveKonvaElement';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';
import { Text } from 'react-konva';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';

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
  props: Konva.TextConfig;
}

function TextRenderer({ id, props }: Props) {
  const textRef = useRef<Konva.Text | null>(null);
  const { transformerRef } = ElementRefsContainer.useContainer();

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

  useEffect(() => {
    transformerRef.current?.forceUpdate();
  }, [props.fontFamily, transformerRef]);

  return (
    <InteractiveKonvaElement
      id={id}
      enabledAnchors={enabledAnchors}
      transform={transform}
      transformEnd={transformEnd}
    >
      {(additionalProps) => (
        <Text
          {...props}
          {...additionalProps}
          ref={(el) => {
            additionalProps.ref.current = el;
            textRef.current = el;
          }}
        />
      )}
    </InteractiveKonvaElement>
  );
}

export default TextRenderer;
