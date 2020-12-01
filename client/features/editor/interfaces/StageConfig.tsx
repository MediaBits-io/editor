import Konva from 'konva';
import { ShapeType } from './Shape';

export interface CanvasElement {
  id: string;
  type: ShapeType;
  props: Konva.ShapeConfig;
}

export interface Template {
  dimensions: { width: number; height: number };
  background: Konva.ShapeConfig;
  elements: CanvasElement[];
}
