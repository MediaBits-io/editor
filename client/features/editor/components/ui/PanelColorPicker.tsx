import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import Dropdown from '../../../../components/ui/Dropdown/Dropdown';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import Popover from '../../../../components/ui/Popover/Popover';
import Slider from '../../../../components/ui/Slider';
import classNames from '../../../../utils/classNames';
import { fromHex, isValidHex, toHex } from '../../../../utils/color';

interface Props {
  id: string;
  rgba?: RGBColor;
  onChange: (rgba: RGBColor) => void;
  disableAlpha?: boolean;
}

function PanelColorPicker({ id, rgba, disableAlpha, onChange }: Props) {
  const color = rgba && toHex(rgba);
  const opacity = rgba?.a;
  const percentageOpacity = Math.round((opacity ?? 1) * 100);

  const {
    setTargetElement,
    targetElement,
    isOpen,
    toggle,
    close,
  } = useDropdown();
  const [inputValue, setInputValue] = useState(color);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleChangeOpacity = useCallback(
    (value: number) => {
      if (rgba) {
        onChange({ ...rgba, a: value / 100 });
      }
    },
    [onChange, rgba]
  );

  const handleChangeColor = useCallback(
    ({ rgb }: ColorResult) => {
      onChange(rgb);
    },
    [onChange]
  );

  const handleChangeInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);

      if (isValidHex(e.target.value)) {
        onChange(fromHex(e.target.value, opacity));
      }
    },
    [onChange, opacity]
  );

  const handleBlurInput = useCallback(() => {
    const lowercaseHex = inputValue?.toLowerCase();

    if (lowercaseHex === color) {
      return;
    }

    if (lowercaseHex && isValidHex(lowercaseHex)) {
      onChange(fromHex(lowercaseHex, opacity));
    } else if (color) {
      setInputValue(color);
    }
  }, [inputValue, color, onChange, opacity]);

  return (
    <div
      className={classNames(
        'flex flex-col panel-item space-y-2',
        isOpen && 'border-blue-300'
      )}
    >
      <div className="flex w-full items-center">
        <label htmlFor={id} className="w-36 text-gray-400 cursor-pointer">
          Color
        </label>
        <input
          id={id}
          className="flex w-full min-w-0 text-right focus:outline-none"
          placeholder="#000000"
          onBlur={handleBlurInput}
          value={inputValue}
          onChange={handleChangeInputValue}
        />
        <div className="w-20 ml-1 flex">
          <Popover
            content="Pick a color"
            placement="right"
            closed={isOpen}
            className={classNames(
              'ml-auto rounded-md p-0.5 border focus:ring-blue-300 focus-within:border-blue-300 focus-within:ring-2 hover:border-blue-300 transition duration-150',
              isOpen && 'border-transparent ring-2'
            )}
          >
            <button
              ref={setTargetElement}
              id={`button-${id}`}
              type="button"
              onClick={toggle}
              style={{ backgroundColor: color }}
              className="flex items-center justify-center rounded h-4 w-4 focus:outline-none"
            />
          </Popover>

          <Dropdown
            placement="bottom-end"
            autoClose={false}
            targetElement={targetElement}
            isOpen={isOpen}
            close={close}
          >
            <SketchPicker
              disableAlpha={disableAlpha}
              styles={{
                default: {
                  picker: {
                    boxShadow: 'inherit',
                    borderRadius: 'inherit',
                    borderColor: 'inherit',
                  },
                },
              }}
              color={rgba}
              onChange={handleChangeColor}
            />
          </Dropdown>
        </div>
      </div>
      {!disableAlpha && (
        <div className="flex w-full items-center">
          <span className="w-36 text-gray-400">Opacity</span>
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
      )}
    </div>
  );
}

export default PanelColorPicker;
