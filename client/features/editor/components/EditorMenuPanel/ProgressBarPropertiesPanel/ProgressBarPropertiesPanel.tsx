import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions/ShapeActions';
import ProgressBarBackgroundSetting from './ProgressBarBackgroundSetting';
import ProgressBarFillSetting from './ProgressBarFillSetting';

interface Props {
  elementId: string;
}

function ProgressBarPropertiesPanel({ elementId }: Props) {
  return (
    <SideMenuPanel
      title="Progress Bar"
      previous={EditorPanel.Elements}
      actions={<ShapeActions elementId={elementId} />}
    >
      <ProgressBarFillSetting elementId={elementId} />
      <ProgressBarBackgroundSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default ProgressBarPropertiesPanel;
