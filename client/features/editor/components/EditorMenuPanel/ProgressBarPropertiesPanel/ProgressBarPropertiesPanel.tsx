import { ProgressBarConfig } from 'konva-elements';
import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions';
import ProgressBarBackgroundSetting from './ProgressBarBackgroundSetting';
import ProgressBarFillSetting from './ProgressBarFillSetting';

interface Props {
  elementId: string;
  elementProps: ProgressBarConfig;
}

function ProgressBarPropertiesPanel({ elementId, elementProps }: Props) {
  return (
    <SideMenuPanel
      title="Progress Bar"
      previous={EditorPanel.Elements}
      actions={<ShapeActions elementId={elementId} />}
    >
      <ProgressBarFillSetting
        elementId={elementId}
        elementProps={elementProps}
      />
      <ProgressBarBackgroundSetting
        elementId={elementId}
        elementProps={elementProps}
      />
    </SideMenuPanel>
  );
}

export default ProgressBarPropertiesPanel;
