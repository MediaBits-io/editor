import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions/ShapeActions';
import ImageBlurSetting from './ImageBlurSetting';
import ImageFileSetting from './ImageFileSetting';
import ImageOpacitySetting from './ImageOpacitySetting';

interface Props {
  elementId: string;
}

function ImagePropertiesPanel({ elementId }: Props) {
  return (
    <SideMenuPanel
      title="Image"
      previous={EditorPanel.Image}
      actions={<ShapeActions elementId={elementId} />}
    >
      <ImageFileSetting elementId={elementId} />
      <ImageOpacitySetting elementId={elementId} />
      <ImageBlurSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default ImagePropertiesPanel;
