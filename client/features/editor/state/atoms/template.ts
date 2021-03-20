import Konva from 'konva';
import { atom, atomFamily } from 'recoil';
import { Dimensions, CanvasElement } from '../../interfaces/StageConfig';

export const dimensionsState = atom<Dimensions>({
  key: 'templateDimensionsState',
  default: {
    width: 1080,
    height: 1080,
  },
});

export const backgroundState = atom<Konva.ShapeConfig>({
  key: 'backgroundState',
  default: {
    fill: 'rgba(255, 255, 255, 1)',
  },
});

export const elementIdsState = atom<string[]>({
  key: 'elementIdsState',
  default: [],
});

export const elementState = atomFamily<CanvasElement | undefined, string>({
  key: 'elementState',
  default: undefined,
});
