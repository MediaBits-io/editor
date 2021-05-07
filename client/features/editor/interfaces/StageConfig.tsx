import Konva from 'konva';
import { ShapeType } from './Shape';
import { Subtitle } from './Subtitles';

export type Dimensions = { width: number; height: number };

export interface CanvasElement {
  id: string;
  type: ShapeType;
  props: Konva.ShapeConfig;
}

export interface Template {
  dimensions: Dimensions;
  background: Konva.ShapeConfig;
  elements: CanvasElement[];
  subtitles?: {
    entries: Subtitle[];
    style: Konva.TextConfig;
  };
}
