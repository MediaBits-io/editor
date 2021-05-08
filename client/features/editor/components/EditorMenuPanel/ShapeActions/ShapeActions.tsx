import { DuplicateIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import PanelActionButton from '../../ui/PanelActionButton';
import MoveLayerDownAction from './MoveLayerDownAction';
import MoveLayerUpAction from './MoveLayerUpAction';

interface Props {
  elementId: string;
}

function ShapeActions({ elementId }: Props) {
  const { duplicateElement, deleteElement } = useElementsDispatcher();

  const handleDuplicateClick = () => {
    duplicateElement(elementId);
  };

  const handleDeleteClick = () => {
    deleteElement(elementId);
  };

  return (
    <>
      <MoveLayerUpAction elementId={elementId} />
      <MoveLayerDownAction elementId={elementId} />
      <Tooltip content="Duplicate" className="flex">
        <PanelActionButton
          icon={DuplicateIcon}
          onClick={handleDuplicateClick}
        />
      </Tooltip>
      <Tooltip content="Remove (delete)" className="flex">
        <PanelActionButton icon={TrashIcon} onClick={handleDeleteClick} />
      </Tooltip>
    </>
  );
}

export default ShapeActions;
