import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions/ShapeActions';
import WaveformFillSetting from './WaveformFillSetting';
import WaveformPatternSetting from './WaveformPatternSetting';

interface Props {
  elementId: string;
}

function WaveformPropertiesPanel({ elementId }: Props) {
  return (
    <SideMenuPanel
      title="Waveform"
      previous={EditorPanel.Elements}
      actions={<ShapeActions elementId={elementId} />}
    >
      <WaveformFillSetting elementId={elementId} />
      <WaveformPatternSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default WaveformPropertiesPanel;
