import { ArrowUpIcon } from '@heroicons/react/outline';
import { last } from 'ramda';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Popover from '../../../../../components/ui/Popover/Popover';
import { elementIdsState } from '../../../state/atoms/template';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import PanelActionButton from '../../ui/PanelActionButton';

interface Props {
  elementId: string;
}

function MoveLayerUpAction({ elementId }: Props) {
  const elementIds = useRecoilValue(elementIdsState);
  const { reorderElement } = useElementsDispatcher();

  const handleMoveUpClick = () => {
    reorderElement(elementId, 1);
  };

  const moveUpDisabled = last(elementIds) === elementId;

  return (
    <Popover
      content="Move layer up"
      placement="top"
      className="flex"
      closed={moveUpDisabled}
    >
      <PanelActionButton
        icon={ArrowUpIcon}
        onClick={handleMoveUpClick}
        disabled={moveUpDisabled}
      />
    </Popover>
  );
}

export default MoveLayerUpAction;
