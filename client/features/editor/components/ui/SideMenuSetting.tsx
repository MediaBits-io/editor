import React from 'react';
import classNames from '../../../../utils/classNames';

interface Props extends React.HTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  htmlFor?: string;
  noLabel?: boolean;
}

const SideMenuSetting = ({
  label,
  noLabel,
  htmlFor,
  className,
  children,
  ...rest
}: Props) => {
  const contents = (
    <>
      <span className="block text-sm font-semibold mb-2 leading-4 text-black-900">
        {label}
      </span>
      {children}
    </>
  );
  const classes = classNames('mb-4', className);
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
