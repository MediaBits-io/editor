import React from 'react';
import { useRecoilValue } from 'recoil';
import RedoIcon from '../../../../components/ui/Icons/RedoIcon';
import UndoIcon from '../../../../components/ui/Icons/UndoIcon';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import useHistoryDispatcher from '../../state/dispatchers/history';
import {
  canRedoSelector,
  canUndoSelector,
} from '../../state/selectors/history';
import ClearButton from '../ui/ClearButton';

function HistoryControls() {
  const canUndo = useRecoilValue(canUndoSelector);
  const canRedo = useRecoilValue(canRedoSelector);
  const { redo, undo } = useHistoryDispatcher();

  return (
    <div className="flex items-center space-x-2">
      <Tooltip content="Undo (ctrl+z)" placement="top" closed={!canUndo}>
        <ClearButton disabled={!canUndo} onClick={undo}>
          <UndoIcon className="w-4 h-4" />
        </ClearButton>
      </Tooltip>
      <Tooltip content="Redo (ctrl+y)" placement="top" closed={!canRedo}>
        <ClearButton disabled={!canRedo} onClick={redo}>
          <RedoIcon className="w-4 h-4" />
        </ClearButton>
      </Tooltip>
    </div>
  );
}

export default HistoryControls;
