import { ProgressBarConfig, WaveformConfig } from 'konva-elements';
import React from 'react';
import Button from '../../../../components/ui/Button';
import ProgressIcon from '../../../../components/ui/Icons/ProgressIcon';
import WaveformIcon from '../../../../components/ui/Icons/WaveformIcon';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import useElements from '../../hooks/useElements';
import { ShapeType } from '../../interfaces/Shape';
import SideMenuPanel from '../ui/SideMenuPanel';

function ElementToolPanel() {
  const { template } = EditorContainer.useContainer();
  const { createElement } = useElements();

  const handleClickAddWaveform = () => {
    const HWratio = 0.15;
    const height = Math.min(
      template.dimensions.height * 0.25,
      template.dimensions.width * 0.75 * HWratio
    );

    createElement<WaveformConfig>(ShapeType.Waveform, {
      pattern: 'roundBars',
      fill: 'rgba(30, 66, 159, 1)',
      width: height / HWratio,
      height,
    });
  };

  const handleClickAddProgressBar = () => {
    createElement<ProgressBarConfig>(ShapeType.ProgressBar, {
      x: 0,
      y: 0,
      width: template.dimensions.width,
      height: template.dimensions.height * 0.01,
      progress: 4,
      max: 10,
      backgroundColor: 'rgba(120, 120, 120, 0.2)',
      fill: 'rgba(30, 66, 159, 1)',
    });
  };

  return (
    <SideMenuPanel title="Elements">
      <Button
        type="gray"
        onClick={handleClickAddWaveform}
        icon={WaveformIcon}
        className="mb-2"
      >
        Add waveform
      </Button>
      <Button
        type="gray"
        onClick={handleClickAddProgressBar}
        icon={ProgressIcon}
      >
        Add progress bar
      </Button>
    </SideMenuPanel>
  );
}

export default ElementToolPanel;
