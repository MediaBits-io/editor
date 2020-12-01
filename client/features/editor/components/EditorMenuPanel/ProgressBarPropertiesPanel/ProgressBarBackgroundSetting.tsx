import React, { useCallback } from 'react';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { ProgressBarConfig } from 'konva-elements';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { RGBColor } from 'react-color';

interface Props {
  elementId: string;
  elementProps: ProgressBarConfig;
}

function ProgressBarBackgroundSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();

  const changeColor = useCallback(
    (color: RGBColor) => {
      dispatch({
        type: 'update_element',
        id: elementId,
        props: { backgroundColor: toRgba(color) } as Partial<ProgressBarConfig>,
      });
    },
    [dispatch, elementId]
  );

  return (
    <SideMenuSetting label="Background" htmlFor="input-background-color">
      <PanelColorPicker
        rgba={
          elementProps.backgroundColor
            ? fromRgba(elementProps.backgroundColor)
            : undefined
        }
        id="input-background-color"
        onChange={changeColor}
      />
    </SideMenuSetting>
  );
}

export default ProgressBarBackgroundSetting;
