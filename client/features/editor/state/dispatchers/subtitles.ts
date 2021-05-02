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
    ({ set, snapshot }) => (text: string) => {
      const id = uuid();

      const dimensions = snapshot.getLoadable(dimensionsState).getValue();
      const defaultStyle = snapshot.getLoadable(subtitlesStyleState).getValue();

      if (!('x' in defaultStyle || 'y' in defaultStyle)) {
        const bounds = new Konva.Text({
          ...defaultStyle,
          text,
        }).getClientRect();
        const x = dimensions.width / 2 - bounds.width / 2;
        const y = 0.9 * dimensions.height - bounds.height / 2;

        set(subtitlesStyleState, {
          ...defaultStyle,
          x,
          y,
        });
      }

      const subtitles = last(
        snapshot.getLoadable(subtitlesByEndSelector).getValue()
      );
      const start = subtitles?.end ?? 0;

      // TODO: limit to video length
      set(subtitleSelector(id), {
        id,
        text,
        start,
        end: start + 3000,
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
