import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../utils/classNames';
import PanelActionButton from './PanelActionButton';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  htmlFor?: string;
  noLabel?: boolean;
  deleted?: boolean;
  onDelete?: () => void;
  onCreate?: () => void;
}

const SideMenuSetting = ({
  label,
  noLabel,
  htmlFor,
  className,
  children,
  onDelete,
  onCreate,
  deleted,
  ...rest
}: Props) => {
  const contents = (
    <>
      <div className={classNames('flex items-center justify-between pb-1')}>
        <span className="block text-sm font-medium text-gray-700">{label}</span>
        {deleted
          ? onCreate && (
              <Tooltip key="enable" content="Enable" className="flex">
                <PanelActionButton icon={PlusIcon} onClick={onCreate} />
              </Tooltip>
            )
          : onDelete && (
              <Tooltip key="disable" content="Disable" className="flex">
                <PanelActionButton icon={MinusIcon} onClick={onDelete} />
              </Tooltip>
            )}
      </div>
      {!deleted && children}
    </>
  );

  const classes = classNames(
    'flex flex-col',
    deleted ? 'mb-2' : 'mb-4',
    className
  );

  return noLabel ? (
    <div className={classes} {...rest}>
      {contents}
    </div>
  ) : (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {contents}
    </label>
  );
};

export default SideMenuSetting;
