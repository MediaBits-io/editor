import { PatternType, WaveformConfig } from 'konva-elements';
import React from 'react';
import DropdownSelect from '../../../../../components/ui/DropdownSelect/DropdownSelect';
import DropdownSelectAnchor from '../../../../../components/ui/DropdownSelect/DropdownSelectAnchor';
import DropdownSelectOption from '../../../../../components/ui/DropdownSelect/DropdownSelectOption';
import useDropdownSelect from '../../../../../components/ui/DropdownSelect/useDropdownSelect';
import classNames from '../../../../../utils/classNames';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
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
  elementProps: WaveformConfig;
}

function WaveformPatternSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();
  const { setTargetElement, targetElement } = useDropdownSelect();

  const selectedPattern = options.find(
    ({ value }) => value === elementProps.pattern
  )!;

  const handleChangeOption = (pattern: PatternType) => {
    dispatch({ type: 'update_element', id: elementId, props: { pattern } });
  };

  return (
    <SideMenuSetting label="Pattern">
      <div ref={setTargetElement}>
        <DropdownSelect
          placement="bottom"
          value={selectedPattern.value}
          onChange={handleChangeOption}
          targetElement={targetElement}
          target={({ open }) => (
            <DropdownSelectAnchor
              className={classNames('panel-item', open && 'border-blue-300')}
            >
              {selectedPattern.label}
            </DropdownSelectAnchor>
          )}
        >
          {options.map(({ label, value }) => (
            <DropdownSelectOption value={value}>
              <span className="w-52">{label}</span>
            </DropdownSelectOption>
          ))}
        </DropdownSelect>
      </div>
    </SideMenuSetting>
  );
}

export default WaveformPatternSetting;
