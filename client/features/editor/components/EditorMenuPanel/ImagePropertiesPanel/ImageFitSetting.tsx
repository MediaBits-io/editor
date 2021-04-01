import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import DropdownSelect from '../../../../../components/ui/DropdownSelect/DropdownSelect';
import DropdownSelectAnchor from '../../../../../components/ui/DropdownSelect/DropdownSelectAnchor';
import DropdownSelectOption from '../../../../../components/ui/DropdownSelect/DropdownSelectOption';
import classNames from '../../../../../utils/classNames';
import { ImageConfig, ImageFit } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

export const options: { label: string; value: ImageFit }[] = [
  {
    label: 'Fill',
    value: 'fill',
  },
  {
    label: 'Scale',
    value: 'scale',
  },
];

interface Props {
  elementId: string;
}

function ImageFitSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<ImageConfig>(elementId)
  );
  const { setTargetElement, targetElement } = useDropdown();

  const selectedImageFit = useMemo(
    () =>
      options.find(({ value }) => value === (elementProps.imageFit ?? 'fill'))!,
    [elementProps.imageFit]
  );

  const handleChangeOption = (imageFit: ImageFit) => {
    updateElementProps<ImageConfig>(elementId, { imageFit });
  };

  return (
    <SideMenuSetting label="Image fit">
      <div ref={setTargetElement}>
        <DropdownSelect
          placement="bottom"
          value={selectedImageFit.value}
          onChange={handleChangeOption}
          targetElement={targetElement}
          wrapperClass="w-68"
          target={({ open }) => (
            <DropdownSelectAnchor
              className={classNames('panel-item', open && 'border-blue-300')}
            >
              {selectedImageFit.label}
            </DropdownSelectAnchor>
          )}
        >
          {options.map(({ label, value }) => (
            <DropdownSelectOption key={value} value={value}>
              {label}
            </DropdownSelectOption>
          ))}
        </DropdownSelect>
      </div>
    </SideMenuSetting>
  );
}

export default ImageFitSetting;
