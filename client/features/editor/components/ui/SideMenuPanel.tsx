import { ArrowLeftOutline } from 'heroicons-react';
import React from 'react';
import classNames from '../../../../utils/classNames';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import { EditorPanel } from '../../interfaces/Editor';
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
  const { dispatch } = EditorContainer.useContainer();

  const handleClickBack = () => {
    if (previous) {
      dispatch({ type: 'open_editor_panel', panel: previous });
    }
  };

  return (
    <div
      className={classNames(
        'flex flex-col mt-2 mb-2 p-4 rounded-md w-72 bg-white text-gray-900 border',
        className
      )}
    >
      <div className="mb-6 flex items-center">
        {previous && (
          <ClearButton onClick={handleClickBack} className="mr-2" title="Back">
            <ArrowLeftOutline className="w-4 h-4" />
          </ClearButton>
        )}
        <h2 className="text-lg font-semibold leading-6 text-black-900">
          {title}
        </h2>
        {actions && (
          <div className="flex items-center ml-auto space-x-1">{actions}</div>
        )}
      </div>
      {children}
    </div>
  );
}

export default SideMenuPanel;
