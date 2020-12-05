import React from 'react';
import AspectRatio from 'react-aspect-ratio';
import DropdownSelectOption from '../../../../../../components/ui/DropdownSelect/DropdownSelectOption';
import classNames from '../../../../../../utils/classNames';

interface Props {
  value: string;
  orientation: string;
  dimensions: { width: number; height: number };
}

function AspectRatioOption({ orientation, value, dimensions }: Props) {
  const remSize = 9 / 4;
  const ratio = dimensions.width / dimensions.height;

  return (
    <DropdownSelectOption value={value}>
      {({ active, selected }) => (
        <div className="flex min-w-full items-center">
          <div className="flex items-center justify-center w-9 h-9 mr-4">
            <AspectRatio
              className={classNames(
                'border-2 transition duration-150',
                active ? 'border-gray-500' : 'border-gray-400',
                selected && 'border-blue-700'
              )}
              style={{ width: `${remSize * ratio}rem` }}
              ratio={ratio}
            />
          </div>
          <strong className="flex justify-between w-40">
            {orientation}
            <span
              className={classNames(
                'font-normal',
                selected ? 'text-blue-700' : 'text-gray-400'
              )}
            >
              {value}
            </span>
          </strong>
        </div>
      )}
    </DropdownSelectOption>
  );
}

export default AspectRatioOption;
