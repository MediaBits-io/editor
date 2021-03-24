import Konva from 'konva';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Slider from '../../../../../components/ui/Slider';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function ImageBlurSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<Konva.ImageConfig>(elementId)
  );

  // TODO: maybe save filter as string in template and let renderer handle conversion
  const handleChangeBlur = async (value: number) => {
    let filters = elementProps.filters;

    if (value > 0 && !filters?.includes(Konva.Filters.Blur)) {
      filters = [...(elementProps.filters ?? []), Konva.Filters.Blur];
    } else if (!value) {
      filters = filters?.filter((filter) => filter !== Konva.Filters.Blur);
    }

    updateElementProps<Konva.ImageConfig>(elementId, {
      blurRadius: value,
      filters,
    });
  };

  return (
    <>
      <SideMenuSetting label="Blur">
        <div className="panel-item py-3 flex w-full items-center">
          <Slider
            max={20}
            value={elementProps.blurRadius}
            step={1}
            onChange={handleChangeBlur}
          />
          <span className="text-xs w-20 ml-1 text-right leading-3">
            {elementProps.blurRadius}px
          </span>
        </div>
      </SideMenuSetting>
    </>
  );
}

export default ImageBlurSetting;
