import Konva from 'konva';
import { ShapeType } from './Shape';

export type CanvasDimensions = { width: number; height: number };

export interface CanvasElement {
  id: string;
  type: ShapeType;
  props: Konva.ShapeConfig;
}

export interface Template {
  dimensions: CanvasDimensions;
  background: Konva.ShapeConfig;
  elements: CanvasElement[];
}
