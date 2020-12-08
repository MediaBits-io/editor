import { ChevronDown } from 'heroicons-react';
import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { IMaskInput } from 'react-imask';
import Button from '../../../../../components/ui/Button';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import classNames from '../../../../../utils/classNames';
import SideMenuSetting from '../../ui/SideMenuSetting';
import DropdownButton from '../../../../../components/ui/Dropdown/DropdownButton';
import Dropdown from '../../../../../components/ui/Dropdown/Dropdown';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';

interface Props {
  elementId: string;
  elementProps: Konva.TextConfig;
}

function TextSizeSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();
  const {
    setTargetElement,
    targetElement,
    isOpen,
    toggle,
    close,
  } = useDropdown();
  const [inputValue, setInputValue] = useState(elementProps.fontSize);

  useEffect(() => {
    setInputValue(elementProps.fontSize);
  }, [elementProps.fontSize]);

  const handleChange = (fontSize: number) => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: { fontSize } as Konva.TextConfig,
    });
  };

  const handleChangeInput = (value: string) => {
    const newValue = parseInt(value);
    setInputValue(newValue);

    if (newValue >= 12 && newValue !== elementProps.fontSize) {
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
                <span className="w-16 text-right">{value}px</span>
              </DropdownButton>
            ))}
          </div>
        </Dropdown>
      </div>
    </SideMenuSetting>
  );
}

export default TextSizeSetting;
