import Konva from 'konva';
import { atom, atomFamily } from 'recoil';
import { Dimensions, CanvasElement } from '../../interfaces/StageConfig';
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
