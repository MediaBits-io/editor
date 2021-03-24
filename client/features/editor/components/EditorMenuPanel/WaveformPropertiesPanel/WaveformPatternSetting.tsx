import { PatternType, WaveformConfig } from 'konva-elements';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import DropdownSelect from '../../../../../components/ui/DropdownSelect/DropdownSelect';
import DropdownSelectAnchor from '../../../../../components/ui/DropdownSelect/DropdownSelectAnchor';
import DropdownSelectOption from '../../../../../components/ui/DropdownSelect/DropdownSelectOption';
import classNames from '../../../../../utils/classNames';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

export const options: { label: string; value: PatternType }[] = [
  {
    label: 'Wave',
    value: 'wave',
  },
  {
    label: 'Bars',
    value: 'bars',
  },
  {
    label: 'Round Bars',
    value: 'roundBars',
  },
  {
    label: 'Pixel',
    value: 'pixel',
  },
  {
    label: 'Line',
    value: 'line',
  },
  {
    label: 'Curve',
    value: 'curve',
  },
];

interface Props {
  elementId: string;
}

function WaveformPatternSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<WaveformConfig>(elementId)
  );
  const { setTargetElement, targetElement } = useDropdown();

  const selectedPattern = useMemo(
    () => options.find(({ value }) => value === elementProps.pattern)!,
    [elementProps.pattern]
  );

  const handleChangeOption = (pattern: PatternType) => {
    updateElementProps<WaveformConfig>(elementId, { pattern });
  };

  return (
    <SideMenuSetting label="Pattern">
      <div ref={setTargetElement}>
        <DropdownSelect
          placement="bottom"
          value={selectedPattern.value}
          onChange={handleChangeOption}
          targetElement={targetElement}
          wrapperClass="w-68"
          target={({ open }) => (
            <DropdownSelectAnchor
              className={classNames('panel-item', open && 'border-blue-300')}
            >
              {selectedPattern.label}
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

export default WaveformPatternSetting;
