import React from 'react';
import { IMaskInput } from 'react-imask';
import IMask from 'imask';
import { dateToTimeString, timeStringToDate } from '../../../../utils/time';

interface Props {
  className?: string;
  label: string;
  value: string;
  onChange: (
    value: string,
    mask: IMask.InputMask<IMask.MaskedDateOptions>
  ) => void;
}

function TimestampInput({ value, onChange, className, label }: Props) {
  return (
    <label className={className}>
      <span className="block text-left text-gray-400 text-xs">{label}</span>
      <IMaskInput
        mask={Date}
        radix="."
        lazy={false}
        pattern="HH:mm:ss.m3"
        className="bg-gray-600 text-white p-2 rounded-md w-28 focus:ring-gray-500 focus:outline-none focus:ring-2"
        blocks={{
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
          },
          mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
          ss: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
          m3: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 999,
          },
        }}
        value={value}
        onAccept={onChange}
        format={dateToTimeString}
        parse={timeStringToDate}
      />
    </label>
  );
}

export default TimestampInput;
