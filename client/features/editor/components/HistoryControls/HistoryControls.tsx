import React from 'react';
import RedoIcon from '../../../../components/ui/Icons/RedoIcon';
import UndoIcon from '../../../../components/ui/Icons/UndoIcon';
import Popover from '../../../../components/ui/Popover/Popover';
import useEditorHistory from '../../hooks/useEditorHistory';
import ClearButton from '../ui/ClearButton';

function HistoryControls() {
  const { redo, undo, hasFuture, hasPast } = useEditorHistory();

  return (
    <div className="flex items-center space-x-2">
      <Popover content="Undo (ctrl+z)" placement="top" closed={!hasPast}>
        <ClearButton disabled={!hasPast} onClick={undo}>
          <UndoIcon className="w-4 h-4" />
        </ClearButton>
      </Popover>
      <Popover content="Redo (ctrl+y)" placement="top" closed={!hasFuture}>
        <ClearButton disabled={!hasFuture} onClick={redo}>
          <RedoIcon className="w-4 h-4" />
        </ClearButton>
      </Popover>
    </div>
  );
}

export default HistoryControls;
