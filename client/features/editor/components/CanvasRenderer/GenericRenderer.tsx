import Konva from 'konva';
import { ShapeConfig } from 'konva/types/Shape';
import React from 'react';
import { KonvaNodeEvents } from 'react-konva';
import InteractiveKonvaElement from '../InteractiveKonvaElement/InteractiveKonvaElement';

interface Props {
  id: string;
  component: React.ComponentType<ShapeConfig & KonvaNodeEvents>;
  props: Konva.ShapeConfig;
}

function GenericRenderer({ id, component: Component, props }: Props) {
  return (
    <InteractiveKonvaElement id={id}>
      {(additionalProps) => <Component {...props} {...additionalProps} />}
    </InteractiveKonvaElement>
  );
}

export default GenericRenderer;
