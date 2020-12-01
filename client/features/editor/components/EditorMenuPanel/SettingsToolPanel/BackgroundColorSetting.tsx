import React, { useCallback } from 'react';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { RGBColor } from 'react-color';
import { fromRgba, toRgba } from '../../../../../utils/color';

function BackgroundColorSetting() {
  const { template, dispatch } = EditorContainer.useContainer();

  const changeColor = useCallback(
    (color: RGBColor) => {
      dispatch({
        type: 'update_stage',
        config: {
          background: { ...template.background, fill: toRgba(color) },
        },
      });
    },
    [dispatch, template.background]
  );

  return (
    <SideMenuSetting label="Background" htmlFor="input-background-color">
      <PanelColorPicker
        rgba={
          template.background.fill
            ? fromRgba(template.background.fill)
            : undefined
        }
        id="input-background-color"
        onChange={changeColor}
        disableAlpha
      />
    </SideMenuSetting>
  );
}

export default BackgroundColorSetting;
