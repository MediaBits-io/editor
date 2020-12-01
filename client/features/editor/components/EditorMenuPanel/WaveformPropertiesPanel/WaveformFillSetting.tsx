import React, { useCallback } from 'react';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';
import PanelColorPicker from '../../ui/PanelColorPicker';
import { fromRgba, toRgba } from '../../../../../utils/color';
import { RGBColor } from 'react-color';
import { WaveformConfig } from 'konva-elements';

interface Props {
  elementId: string;
  elementProps: WaveformConfig;
}

function WaveformFillSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();

  const changeColor = useCallback(
    (color: RGBColor) => {
      dispatch({
        type: 'update_element',
        id: elementId,
        props: { fill: toRgba(color) } as Partial<WaveformConfig>,
      });
    },
    [dispatch, elementId]
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

export default WaveformFillSetting;
