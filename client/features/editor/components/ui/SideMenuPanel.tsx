import { ArrowLeftIcon } from '@heroicons/react/outline';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import classNames from '../../../../utils/classNames';
import { EditorPanel } from '../../interfaces/Editor';
import { activePanelState } from '../../state/atoms/editor';
import ClearButton from './ClearButton';

interface Props {
  children?: React.ReactNode;
  title?: React.ReactText;
  className?: string;
  actions?: React.ReactNode;
  previous?: EditorPanel;
}

function SideMenuPanel({
  children,
  title,
  className,
  actions,
  previous,
}: Props) {
  const setActivePanel = useSetRecoilState(activePanelState);

  const handleClickBack = () => {
    if (previous) {
      setActivePanel(previous);
    }
  };

  return (
    <div
      className={classNames(
        'flex flex-col flex-grow overflow-y-hidden bg-white text-gray-900 border-r w-72',
        className
      )}
    >
      <div className="p-3 flex items-center">
        {previous && (
          <ClearButton
            onClick={handleClickBack}
            className="mr-2 px-1 py-1"
            title="Back"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </ClearButton>
        )}
        <h2 className="text-lg font-semibold leading-6 text-black-900">
          {title}
        </h2>
        {actions && (
          <div className="flex items-center ml-auto space-x-1">{actions}</div>
        )}
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto p-3">
        {children}
      </div>
    </div>
  );
}

export default SideMenuPanel;
