import React from 'react';
import { useRecoilValue } from 'recoil';
import Slider from '../../../../../components/ui/Slider';
import { ImageConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function ImageOpacitySetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<ImageConfig>(elementId)
  );
  const { updateElementProps } = useElementsDispatcher();
  const percentageOpacity = Math.floor(+(elementProps.opacity ?? 1) * 100);

  const handleChangeOpacity = (value: number) => {
    updateElementProps(elementId, {
      opacity: value / 100,
    });
  };

  return (
    <>
      <SideMenuSetting label="Opacity">
        <div className="panel-item py-3 flex w-full items-center">
          <Slider
            max={100}
            value={percentageOpacity}
            step={1}
            onChange={handleChangeOpacity}
          />
          <span className="text-xs w-20 ml-1 text-right leading-3">
            {percentageOpacity}%
          </span>
        </div>
      </SideMenuSetting>
    </>
  );
}

export default ImageOpacitySetting;
