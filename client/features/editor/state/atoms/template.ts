import Konva from 'konva';
import { atom, atomFamily } from 'recoil';
import { DefaultFonts } from '../../constants';
import { Dimensions, CanvasElement } from '../../interfaces/StageConfig';
import { Subtitle, SubtitleStyle } from '../../interfaces/Subtitles';
import { historyEffect } from '../effects/history';

export const dimensionsState = atom<Dimensions>({
  key: 'templateDimensionsState',
  default: {
    width: 1080,
    height: 1080,
  },
  effects_UNSTABLE: [historyEffect],
});

export const backgroundState = atom<Konva.ShapeConfig>({
  key: 'backgroundState',
  default: {
    fill: 'rgba(255, 255, 255, 1)',
  },
  effects_UNSTABLE: [historyEffect],
});

export const elementIdsState = atom<string[]>({
  key: 'elementIdsState',
  default: [],
  effects_UNSTABLE: [historyEffect],
});

export const elementState = atomFamily<CanvasElement | undefined, string>({
  key: 'elementState',
  default: undefined,
  effects_UNSTABLE: () => [historyEffect],
});

export const subtitlesStyleState = atom<SubtitleStyle>({
  key: 'subtitlesStyleState',
  default: {
    fontSize: 48,
    fontFamily: DefaultFonts.Regular,
    align: 'center',
    fillEnabled: true,
    fill: 'rgba(0, 0, 0, 1)',
    lineHeight: 1,
    shadowEnabled: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    strokeEnabled: false,
    stroke: 'rgba(0, 0, 0, 1)',
    strokeWidth: 1,
    backgroundEnabled: true,
    background: {
      fill: 'rgba(0, 0, 0, 0.2)',
    },
  },
  effects_UNSTABLE: [historyEffect],
});

export const subtitleIdsState = atom<string[]>({
  key: 'subtitleIdsState',
  default: [],
  effects_UNSTABLE: [historyEffect],
});

export const subtitleState = atomFamily<Subtitle | undefined, string>({
  key: 'subtitleState',
  default: undefined,
  effects_UNSTABLE: [historyEffect],
});
