import Konva from 'konva';
import React from 'react';
import Slider from '../../../../../components/ui/Slider';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
  elementProps: Konva.ShapeConfig;
}

function ImageOpacitySetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();
  const percentageOpacity = Math.floor(+(elementProps.opacity ?? 1) * 100);

  const handleChangeOpacity = async (value: number) => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: {
        opacity: value / 100,
      },
    });
  };

  return (
    <>
      <SideMenuSetting label="Opacity">
        <div className="panel-item py-3 flex w-full items-center">
          <Slider
            max={100}
            value={percentageOpacity}
            step={1}
            onChange={handleChangeOpacity}
          />
          <span className="text-xs w-20 ml-1 text-right leading-3">
            {percentageOpacity}%
          </span>
        </div>
      </SideMenuSetting>
    </>
  );
}

export default ImageOpacitySetting;
