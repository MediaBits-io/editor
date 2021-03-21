import React, { useMemo } from 'react';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { RGBColor } from 'react-color';
import { WaveformConfig } from 'konva-elements';
import { useRecoilValue } from 'recoil';
import { elementPropsSelector } from '../../../state/selectors/elements';
import useElementsDispatcher from '../../../state/dispatchers/elements';

interface Props {
  elementId: string;
}

function WaveformFillSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<WaveformConfig>(elementId)
  );

  const fillRGBA = useMemo(
    () => (elementProps.fill ? fromRgba(elementProps.fill) : undefined),
    [elementProps.fill]
  );

  const changeColor = (color: RGBColor) => {
    updateElementProps<WaveformConfig>(elementId, { fill: toRgba(color) });
  };

  return (
    <SideMenuSetting label="Fill" htmlFor="input-fill-color">
      <PanelColorPicker
        rgba={fillRGBA}
        id="input-fill-color"
        onChange={changeColor}
      />
    </SideMenuSetting>
  );
}

export default WaveformFillSetting;
