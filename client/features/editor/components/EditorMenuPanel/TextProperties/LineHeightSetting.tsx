import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import Dropdown from '../../../../../components/ui/Dropdown/Dropdown';
import DropdownButton from '../../../../../components/ui/Dropdown/DropdownButton';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import classNames from '../../../../../utils/classNames';
import { TextConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function LineHeightSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<TextConfig>(elementId)
  );

  const {
    setTargetElement,
    targetElement,
    isOpen,
    toggle,
    close,
  } = useDropdown();
  const [inputValue, setInputValue] = useState(elementProps.lineHeight);

  useEffect(() => {
    setInputValue(elementProps.lineHeight);
  }, [elementProps.lineHeight]);

  const handleChange = (lineHeight: number) => {
    updateElementProps<TextConfig>(elementId, { lineHeight });
  };

  const handleChangeInput = (value: string) => {
    const newValue = Number(value);

    setInputValue(newValue);

    if (
      newValue >= 0.1 &&
      (!elementProps.lineHeight || newValue !== elementProps.lineHeight)
    ) {
      handleChange(newValue);
    }
  };

  const handleBlurInput = () => {
    if (!inputValue || inputValue < 0.1) {
      setInputValue(elementProps.lineHeight);
    }
  };

  return (
    <SideMenuSetting label="Line height" className="w-full">
      <div className="panel-item flex p-0 overflow-hidden">
        <IMaskInput
          // mask={[
          //   { mask: '' },
          //   {
          //     mask: 'numpx',
          //     lazy: false,
          //     blocks: {
          //       num: {
          //         mask: Number,
          //         min: 0,
          //         max: 999,
          //       },
          //     },
          //   },
          // ]}
          mask={Number}
          radix="."
          mapToRadix={[',']}
          scale={2}
          unmask
          signed={false}
          onAccept={handleChangeInput}
          onBlur={handleBlurInput}
          value={`${inputValue}`}
          placeholder="1"
          min={0.1}
          className={classNames(
            'text-right focus:outline-none w-full min-w-0 py-2 px-2',
            isOpen && 'border-blue-300'
          )}
        />

        <Button
          type="custom"
          className="bg-gray-100 focus:outline-none px-0.5 hover:bg-gray-200 focus:bg-gray-200"
          ref={setTargetElement}
          onClick={toggle}
        >
          <ChevronDownIcon className="w-4 h-4" />
        </Button>

        <Dropdown
          wrapperClass="w-29"
          placement="bottom-end"
          targetElement={targetElement}
          isOpen={isOpen}
          close={close}
        >
          <div className="flex flex-col max-h-64 overflow-y-auto">
            {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
              <DropdownButton
                key={value}
                onClick={() => handleChange(value)}
                state={
                  value === elementProps.lineHeight ? 'selected' : 'stateless'
                }
              >
                <span className="text-right">{value}</span>
              </DropdownButton>
            ))}
          </div>
        </Dropdown>
      </div>
    </SideMenuSetting>
  );
}

export default LineHeightSetting;
