import Konva from 'konva';
import { atom, atomFamily } from 'recoil';
import { CanvasDimensions, CanvasElement } from '../../interfaces/StageConfig';

const dimensionsState = atom<CanvasDimensions>({
  key: 'templateDimensionsState',
  default: {
    width: 1080,
    height: 1080,
  },
});

const backgroundState = atom<Konva.ShapeConfig>({
  key: 'backgroundState',
  default: {
    fill: 'rgba(255, 255, 255, 1)',
  },
});

const elementIdsState = atom<string[]>({
  key: 'elementIdsState',
  default: [],
});

const elementsState = atomFamily<CanvasElement | undefined, string>({
  key: 'elementsState',
  default: undefined,
});
