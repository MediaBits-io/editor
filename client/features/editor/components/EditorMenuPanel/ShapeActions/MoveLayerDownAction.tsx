import { ArrowDownIcon } from '@heroicons/react/outline';
import { head } from 'ramda';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
import { elementIdsState } from '../../../state/atoms/template';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import PanelActionButton from '../../ui/PanelActionButton';

interface Props {
  elementId: string;
}

function MoveLayerDownAction({ elementId }: Props) {
  const elementIds = useRecoilValue(elementIdsState);
  const { reorderElement } = useElementsDispatcher();

  const handleMoveDownClick = () => {
    reorderElement(elementId, -1);
  };

  const moveDownDisabled = head(elementIds) === elementId;

  return (
    <Tooltip
      content="Move layer down"
      placement="top"
      className="flex"
      closed={moveDownDisabled}
    >
      <PanelActionButton
        icon={ArrowDownIcon}
        onClick={handleMoveDownClick}
        disabled={moveDownDisabled}
      />
    </Tooltip>
  );
}

export default MoveLayerDownAction;
