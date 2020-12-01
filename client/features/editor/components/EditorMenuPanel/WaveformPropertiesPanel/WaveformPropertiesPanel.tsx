import { WaveformConfig } from 'konva-elements';
import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions';
import WaveformFillSetting from './WaveformFillSetting';
import WaveformPatternSetting from './WaveformPatternSetting';

interface Props {
  elementId: string;
  elementProps: WaveformConfig;
}

function WaveformPropertiesPanel({ elementId, elementProps }: Props) {
  return (
    <SideMenuPanel
      title="Waveform"
      previous={EditorPanel.Elements}
      actions={<ShapeActions elementId={elementId} />}
    >
      <WaveformFillSetting elementId={elementId} elementProps={elementProps} />
      <WaveformPatternSetting
        elementId={elementId}
        elementProps={elementProps}
      />
    </SideMenuPanel>
  );
}

export default WaveformPropertiesPanel;
