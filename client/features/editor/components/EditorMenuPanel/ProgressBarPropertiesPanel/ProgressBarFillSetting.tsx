import { ProgressBarConfig } from '@vincaslt/konva-elements';
import React, { useCallback } from 'react';
import { RGBColor } from 'react-color';
import { useRecoilValue } from 'recoil';
import { fromRgba, toRgba } from '../../../../../utils/color';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import PanelColorPicker from '../../ui/PanelColorPicker';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function ProgressBarFillSetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<ProgressBarConfig>(elementId)
  );
  const { updateElementProps } = useElementsDispatcher();

  const changeColor = useCallback(
    (color: RGBColor) => {
      updateElementProps<ProgressBarConfig>(elementId, { fill: toRgba(color) });
    },
    [elementId, updateElementProps]
  );

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

export default ProgressBarFillSetting;
