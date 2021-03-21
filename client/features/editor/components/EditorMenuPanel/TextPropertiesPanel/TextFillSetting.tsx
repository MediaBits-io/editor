import React from 'react';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { RGBColor } from 'react-color';
import Konva from 'konva';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { useRecoilValue } from 'recoil';
import { elementPropsSelector } from '../../../state/selectors/elements';

interface Props {
  elementId: string;
}

function TextFillSetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<Konva.TextConfig>(elementId)
  );

  const { updateElementProps } = useElementsDispatcher();

  const changeColor = (color: RGBColor) => {
    updateElementProps<Konva.TextConfig>(elementId, { fill: toRgba(color) });
  };

  return (
    <SideMenuSetting label="Fill" htmlFor="input-fill-color">
      <PanelColorPicker
        rgba={elementProps.fill ? fromRgba(elementProps.fill) : undefined}
        id="input-fill-color"
        onChange={changeColor}
      />
    </SideMenuSetting>
  );
}

export default TextFillSetting;
