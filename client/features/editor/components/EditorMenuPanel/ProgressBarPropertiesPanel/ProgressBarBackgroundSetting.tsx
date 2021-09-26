import React, { useCallback, useMemo } from 'react';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { ProgressBarConfig } from '@vincaslt/konva-elements';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { RGBColor } from 'react-color';
import { useRecoilValue } from 'recoil';
import { elementPropsSelector } from '../../../state/selectors/elements';
import useElementsDispatcher from '../../../state/dispatchers/elements';

interface Props {
  elementId: string;
}

function ProgressBarBackgroundSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<ProgressBarConfig>(elementId)
  );

  const backgroundColorRGBA = useMemo(
    () =>
      elementProps.backgroundColor
        ? fromRgba(elementProps.backgroundColor)
        : undefined,
    [elementProps.backgroundColor]
  );

  const changeColor = useCallback(
    (color: RGBColor) => {
      updateElementProps<ProgressBarConfig>(elementId, {
        backgroundColor: toRgba(color),
      });
    },
    [elementId, updateElementProps]
  );

  return (
    <SideMenuSetting label="Background" htmlFor="input-background-color">
      <PanelColorPicker
        rgba={backgroundColorRGBA}
        id="input-background-color"
        onChange={changeColor}
      />
    </SideMenuSetting>
  );
}

export default ProgressBarBackgroundSetting;
