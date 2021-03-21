import Konva from 'konva';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useDropdown from '../../../../../../components/ui/Dropdown/useDropdown';
import DropdownSelect from '../../../../../../components/ui/DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../../../../../../components/ui/DropdownSelect/DropdownSelectOption';
import { ALL_FONTS } from '../../../../constants';
import useElementsDispatcher from '../../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../../state/selectors/elements';
import SideMenuSetting from '../../../ui/SideMenuSetting';
import FontFamilySelectAnchor from './FontFamilySelectAnchor';

interface Props {
  elementId: string;
}

function FontFamilySetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<Konva.TextConfig>(elementId)
  );

  const { setTargetElement, targetElement } = useDropdown();

  const handleChangeOption = (fontFamily?: string) => {
    updateElementProps(elementId, { fontFamily });
  };

  return (
    <SideMenuSetting label="Font family">
      <div ref={setTargetElement}>
        <DropdownSelect
          placement="bottom"
          value={elementProps.fontFamily}
          wrapperClass="w-68"
          onChange={handleChangeOption}
          targetElement={targetElement}
          target={({ open }) => (
            <FontFamilySelectAnchor open={open}>
              <span
                style={{ fontFamily: elementProps.fontFamily }}
                className="leading-5"
              >
                {elementProps.fontFamily}
              </span>
            </FontFamilySelectAnchor>
          )}
        >
          {ALL_FONTS.map((fontFamily) => (
            <DropdownSelectOption
              key={fontFamily}
              value={fontFamily}
              style={{ fontFamily }}
            >
              <span className="text-base">{fontFamily}</span>
            </DropdownSelectOption>
          ))}
        </DropdownSelect>
      </div>
    </SideMenuSetting>
  );
}

export default FontFamilySetting;
