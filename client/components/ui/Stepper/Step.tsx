import { Check, X } from 'heroicons-react';
import React from 'react';
import classNames from '../../../utils/classNames';

export type StepType = 'done' | 'progress' | 'pending' | 'error';

interface Props {
  type: StepType;
  title: React.ReactNode;
  info: React.ReactNode;
  last?: boolean;
}

function Step({ type, title, last, info }: Props) {
  const isDone = type === 'done';
  const isProgress = type === 'progress';
  const isPending = type === 'pending';
  const isError = type === 'error';

  return (
    <li className={classNames('relative', !last && 'pb-6')}>
      {!last && (
        <div
          className={classNames(
            '-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full group',
            isDone ? 'bg-blue-600' : 'bg-gray-300'
          )}
          aria-hidden="true"
        />
      )}
      <div className="relative flex items-start">
        <span className="h-9 flex items-center">
          <span
            className={classNames(
              'relative z-10 w-8 h-8 flex items-center justify-center text-blue-600 rounded-full',
              isDone ? 'bg-blue-600' : 'bg-white border-2',
              isProgress
                ? 'border-blue-600'
                : isError
                ? 'border-red-500'
                : 'border-gray-300'
            )}
          >
            {isError && <X className="w-5 h-5 text-red-500" />}
            {isDone && <Check className="w-5 h-5 text-white" />}
            {isProgress && <div className="loader-circle" />}
          </span>
        </span>
        <span className="ml-4 min-w-0 flex flex-col">
          <span
            className={classNames(
              'text-xs font-semibold tracking-wide uppercase',
              isDone && 'text-gray-900',
              isPending && 'text-gray-500',
              isProgress && 'text-blue-600',
              isError && 'text-red-500'
            )}
          >
            {title}
          </span>
          <span className="text-sm text-gray-500">{info}</span>
        </span>
      </div>
    </li>
  );
}

export default Step;
