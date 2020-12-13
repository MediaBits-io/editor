import React from 'react';
import Popover from '../../../../components/ui/Popover/Popover';
import { Plan } from '../../../../interfaces';
import { UserContainer } from '../../../../containers/UserContainer';
import classNames from '../../../../utils/classNames';

interface Props {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  onlyPro?: boolean;
}

function FlyoutMenuButton({
  onClick,
  icon: IconComponent,
  title,
  description,
  onlyPro,
}: Props) {
  const { userPlan } = UserContainer.useContainer();

  const isPro = userPlan.plan === Plan.Professional;
  const isDisabledPro = onlyPro && !isPro;

  return (
    <button
      type="button"
      onClick={isDisabledPro ? undefined : onClick}
      disabled={isDisabledPro}
      className={classNames(
        'w-56 text-left flex rounded-md focus:outline-none transition ease-in-out duration-150',
        isDisabledPro
          ? 'cursor-default bg-yellow-50 opacity-50'
          : 'hover:bg-gray-50 focus:ring-gray-300 focus-visible:ring-2'
      )}
    >
      <Popover
        className="flex items-start p-2"
        placement="bottom"
        content="Requires professional"
        closed={!isDisabledPro}
      >
        <IconComponent
          className={classNames(
            'flex-shrink-0 p-0.5 h-6 w-6',
            isDisabledPro ? 'text-yellow-700' : 'text-blue-600'
          )}
        />
        <div className="ml-4">
          <p
            className={classNames(
              'text-base font-medium',
              isDisabledPro ? 'text-yellow-900' : 'text-gray-900'
            )}
          >
            {title}
          </p>
          {description && (
            <p
              className={classNames(
                'mt-1 text-sm',
                isDisabledPro ? 'text-yellow-600' : 'text-gray-500'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </Popover>
    </button>
  );
}

export default FlyoutMenuButton;
