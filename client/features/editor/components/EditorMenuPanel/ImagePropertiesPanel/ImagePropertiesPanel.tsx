import Konva from 'konva';
import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions';
import ImageFileSetting from './ImageFileSetting';

interface Props {
  elementId: string;
  elementProps: Konva.ImageConfig;
}

function ImagePropertiesPanel({ elementId, elementProps }: Props) {
  return (
    <SideMenuPanel
      title="Image"
      previous={EditorPanel.Image}
      actions={<ShapeActions elementId={elementId} />}
    >
      <ImageFileSetting elementId={elementId} elementProps={elementProps} />
    </SideMenuPanel>
  );
}

export default ImagePropertiesPanel;
