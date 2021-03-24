import { ArrowDownOutline } from 'heroicons-react';
import { head } from 'ramda';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Popover from '../../../../../components/ui/Popover/Popover';
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
    <Popover
      content="Move layer down"
      placement="top"
      className="flex"
      closed={moveDownDisabled}
    >
      <PanelActionButton
        icon={ArrowDownOutline}
        onClick={handleMoveDownClick}
        disabled={moveDownDisabled}
      />
    </Popover>
  );
}

export default MoveLayerDownAction;
