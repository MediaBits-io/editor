import React from 'react';
import { RGBColor } from 'react-color';
import { useRecoilValue } from 'recoil';
import Slider from '../../../../../components/ui/Slider';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { TextConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import PanelColorPicker from '../../ui/PanelColorPicker';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function TextShadowSetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<TextConfig>(elementId)
  );

  const { updateElementProps } = useElementsDispatcher();

  const handleChangeEnabled = (shadowEnabled: boolean) => () => {
    updateElementProps<TextConfig>(elementId, { shadowEnabled });
  };

  const handleChangeColor = (color: RGBColor) => {
    updateElementProps<TextConfig>(elementId, {
      shadowColor: toRgba(color),
    });
  };

  const handleChangeShadowBlur = (shadowBlur: number) => {
    updateElementProps<TextConfig>(elementId, { shadowBlur });
  };

  const shadowBlur = elementProps.shadowBlur ?? 0;

  return (
    <SideMenuSetting
      label="Shadow"
      htmlFor="input-shadow-color"
      onDelete={handleChangeEnabled(false)}
      onCreate={handleChangeEnabled(true)}
      deleted={!elementProps.shadowEnabled}
    >
      <PanelColorPicker
        rgba={
          elementProps.shadowColor
            ? fromRgba(elementProps.shadowColor)
            : undefined
        }
        id="input-shadow-color"
        onChange={handleChangeColor}
      >
        <div className="flex w-full items-center">
          <span className="w-36 text-gray-400">Blur</span>
          <Slider
            max={20}
            value={shadowBlur}
            step={1}
            onChange={handleChangeShadowBlur}
          />
          <span className="text-xs w-20 ml-1 text-right leading-3">
            {shadowBlur}px
          </span>
        </div>
      </PanelColorPicker>
    </SideMenuSetting>
  );
}

export default TextShadowSetting;
