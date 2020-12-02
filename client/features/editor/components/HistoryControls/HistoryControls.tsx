import React from 'react';
import RedoIcon from '../../../../components/ui/Icons/RedoIcon';
import UndoIcon from '../../../../components/ui/Icons/UndoIcon';
import useEditorHistory from '../../hooks/useEditorHistory';
import ClearButton from '../ui/ClearButton';

function HistoryControls() {
  const { redo, undo, hasFuture, hasPast } = useEditorHistory();

  return (
    <div className="flex items-center space-x-2">
      <ClearButton disabled={!hasPast} onClick={undo} title="Undo">
        <UndoIcon className="w-4 h-4" />
      </ClearButton>
      <ClearButton disabled={!hasFuture} onClick={redo} title="Redo">
        <RedoIcon className="w-4 h-4" />
      </ClearButton>
    </div>
  );
}

export default HistoryControls;
