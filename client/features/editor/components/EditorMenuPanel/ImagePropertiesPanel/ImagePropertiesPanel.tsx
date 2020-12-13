import Konva from 'konva';
import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions';
import ImageBlurSetting from './ImageBlurSetting';
import ImageFileSetting from './ImageFileSetting';
import ImageOpacitySetting from './ImageOpacitySetting';

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
      <ImageOpacitySetting elementId={elementId} elementProps={elementProps} />
      <ImageBlurSetting elementId={elementId} elementProps={elementProps} />
    </SideMenuPanel>
  );
}

export default ImagePropertiesPanel;
