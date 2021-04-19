import { ReplyIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRecoilValue } from 'recoil';
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
      <Tooltip content="Undo (ctrl+z)" placement="bottom" closed={!canUndo}>
        <ClearButton icon={ReplyIcon} disabled={!canUndo} onClick={undo} />
      </Tooltip>
      <Tooltip content="Redo (ctrl+y)" placement="bottom" closed={!canRedo}>
        <ClearButton
          icon={ReplyIcon}
          disabled={!canRedo}
          onClick={redo}
          className="transform -scale-x-1"
        />
      </Tooltip>
    </div>
  );
}

export default HistoryControls;
