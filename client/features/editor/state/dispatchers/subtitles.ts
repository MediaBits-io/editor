import Konva from 'konva';
import { last } from 'ramda';
import { useRecoilCallback } from 'recoil';
import { uuid } from '../../../../utils/uuid';
import { ShapeType } from '../../interfaces/Shape';
import { Subtitle } from '../../interfaces/Subtitles';
import { dimensionsState, subtitlesStyleState } from '../atoms/template';
import {
  subtitlesByEndSelector,
  subtitleSelector,
} from '../selectors/subtitles';

function useSubtitlesDispatcher() {
  const createSubtitle = useRecoilCallback(
    ({ set, snapshot }) => (
      text: string,
      time?: { start: number; end: number }
    ) => {
      const id = uuid();

      const dimensions = snapshot.getLoadable(dimensionsState).getValue();
      const defaultStyle = snapshot.getLoadable(subtitlesStyleState).getValue();

      if (!('x' in defaultStyle || 'y' in defaultStyle)) {
        const x = dimensions.width / 2;
        const y = 0.9 * dimensions.height;
        const width = 0.8 * dimensions.width;

        const bounds = new Konva.Text({
          ...defaultStyle,
          width,
          text,
        }).getClientRect();

        console.log(
          'W',
          {
            ...defaultStyle,
            width,
            text,
          },
          bounds.height
        );

        set(subtitlesStyleState, {
          ...defaultStyle,
          width,
          // offsetX: width / 2,
          x,
          y,
        });
      }

      const getTime = () => {
        const subtitles = last(
          snapshot.getLoadable(subtitlesByEndSelector).getValue()
        );
        const start = subtitles?.end ?? 0;
        return {
          start,
          end: start + 3,
        };
      };

      const { start, end } = time ?? getTime();

      // TODO: limit to video length
      set(subtitleSelector(id), {
        id,
        text,
        start,
        end,
        type: ShapeType.Subtitle,
      });
    },
    []
  );

  const updateSubtitle = useRecoilCallback(
    ({ set }) => (id: string, properties: Partial<Omit<Subtitle, 'id'>>) => {
      set(
        subtitleSelector(id),
        (subtitle) =>
          subtitle && {
            ...subtitle,
            ...properties,
          }
      );
    }
  );
  return { createSubtitle, updateSubtitle };
}

export default useSubtitlesDispatcher;
