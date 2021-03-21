import { ChevronDown } from 'heroicons-react';
import Konva from 'konva';
import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import Dropdown from '../../../../../components/ui/Dropdown/Dropdown';
import DropdownButton from '../../../../../components/ui/Dropdown/DropdownButton';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import classNames from '../../../../../utils/classNames';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function TextSizeSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<Konva.TextConfig>(elementId)
  );

  const {
    setTargetElement,
    targetElement,
    isOpen,
    toggle,
    close,
  } = useDropdown();
  const [inputValue, setInputValue] = useState(elementProps.fontSize);

  useEffect(() => {
    setInputValue(elementProps.fontSize && Math.floor(elementProps.fontSize));
  }, [elementProps.fontSize]);

  const handleChange = (fontSize: number) => {
    updateElementProps<Konva.TextConfig>(elementId, { fontSize });
  };

  const handleChangeInput = (value: string) => {
    const newValue = parseInt(value);
    setInputValue(newValue);

    if (
      newValue >= 12 &&
      (!elementProps.fontSize || newValue !== Math.floor(elementProps.fontSize))
    ) {
      handleChange(newValue);
    }
  };

  const handleBlurInput = () => {
    if (!inputValue || inputValue < 12) {
      setInputValue(elementProps.fontSize);
    }
  };

  return (
    <SideMenuSetting label="Size" className="w-full">
      <div className="panel-item flex p-0 overflow-hidden">
        <IMaskInput
          mask={[
            { mask: '' },
            {
              mask: 'numpx',
              lazy: false,
              blocks: {
                num: {
                  mask: Number,
                  min: 0,
                  max: 999,
                },
              },
            },
          ]}
          unmask
          onAccept={handleChangeInput}
          onBlur={handleBlurInput}
          value={`${inputValue}px`}
          placeholder="12px"
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
          <ChevronDown className="w-4 h-4" />
        </Button>

        <Dropdown
          wrapperClass="w-29"
          placement="bottom-end"
          targetElement={targetElement}
          isOpen={isOpen}
          close={close}
        >
          <div className="flex flex-col max-h-64 overflow-y-auto">
            {[18, 24, 36, 48, 64, 72, 96, 144, 288].map((value) => (
              <DropdownButton
                key={value}
                onClick={() => handleChange(value)}
                state={
                  value === elementProps.fontSize ? 'selected' : 'stateless'
                }
              >
                <span className="text-right">{value}px</span>
              </DropdownButton>
            ))}
          </div>
        </Dropdown>
      </div>
    </SideMenuSetting>
  );
}

export default TextSizeSetting;
