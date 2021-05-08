import React from 'react';
import { RGBColor } from 'react-color';
import { useRecoilValue } from 'recoil';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { TextConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import PanelColorPicker from '../../ui/PanelColorPicker';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function TextBackgroundSetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<TextConfig>(elementId)
  );

  const { updateElementProps } = useElementsDispatcher();

  const handleChangeEnabled = (backgroundEnabled: boolean) => () => {
    updateElementProps<TextConfig>(elementId, {
      backgroundEnabled,
    });
  };

  const changeColor = (color: RGBColor) => {
    updateElementProps<TextConfig>(elementId, {
      background: {
        ...elementProps.background,
        fill: toRgba(color),
      },
    });
  };

  return (
    <SideMenuSetting
      label="Background"
      htmlFor="input-background-color"
      onDelete={handleChangeEnabled(false)}
      onCreate={handleChangeEnabled(true)}
      deleted={!elementProps.backgroundEnabled}
    >
      <PanelColorPicker
        rgba={
          elementProps.background?.fill
            ? fromRgba(elementProps.background.fill)
            : undefined
        }
        id="input-background-color"
        onChange={changeColor}
      />
    </SideMenuSetting>
  );
}

export default TextBackgroundSetting;
