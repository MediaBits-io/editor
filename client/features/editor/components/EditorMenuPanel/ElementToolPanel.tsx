import { ProgressBarConfig, WaveformConfig } from 'konva-elements';
import React from 'react';
import { useRecoilCallback } from 'recoil';
import Button from '../../../../components/ui/Button';
import ProgressIcon from '../../../../components/ui/Icons/ProgressIcon';
import WaveformIcon from '../../../../components/ui/Icons/WaveformIcon';
import { ShapeType } from '../../interfaces/Shape';
import { dimensionsState } from '../../state/atoms/template';
import useElementsDispatcher from '../../state/dispatchers/elements';
import SideMenuPanel from '../ui/SideMenuPanel';

function ElementToolPanel() {
  const { createElement } = useElementsDispatcher();

  const handleClickAddWaveform = useRecoilCallback(
    ({ snapshot }) => async () => {
      const dimensions = await snapshot.getPromise(dimensionsState);
      const HWratio = 0.15;
      const height = Math.min(
        dimensions.height * 0.25,
        dimensions.width * 0.75 * HWratio
      );

      createElement<WaveformConfig>(ShapeType.Waveform, {
        pattern: 'roundBars',
        fill: 'rgba(30, 66, 159, 1)',
        width: height / HWratio,
        height,
      });
    },
    [createElement]
  );

  const handleClickAddProgressBar = useRecoilCallback(
    ({ snapshot }) => async () => {
      const dimensions = await snapshot.getPromise(dimensionsState);
      createElement<ProgressBarConfig>(ShapeType.ProgressBar, {
        x: 0,
        y: 0,
        width: dimensions.width,
        height: dimensions.height * 0.01,
        progress: 4,
        max: 10,
        backgroundColor: 'rgba(120, 120, 120, 0.2)',
        fill: 'rgba(30, 66, 159, 1)',
      });
    },
    [createElement]
  );

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
