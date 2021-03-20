import React from 'react';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { RGBColor } from 'react-color';
import { fromRgba, toRgba } from '../../../../../utils/color';
import useTemplateDispatcher from '../../../state/dispatchers/template';
import { useRecoilValue } from 'recoil';
import { backgroundState } from '../../../state/atoms/template';

function BackgroundColorSetting() {
  const { updateBackground } = useTemplateDispatcher();
  const background = useRecoilValue(backgroundState);

  const handleChangeColor = (color: RGBColor) => {
    updateBackground({
      fill: toRgba(color),
    });
  };

  return (
    <SideMenuSetting label="Background" htmlFor="input-background-color">
      <PanelColorPicker
        rgba={background.fill ? fromRgba(background.fill) : undefined}
        id="input-background-color"
        onChange={handleChangeColor}
        disableAlpha
      />
    </SideMenuSetting>
  );
}

export default BackgroundColorSetting;
