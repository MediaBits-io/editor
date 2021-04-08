import { DuplicateIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import Popover from '../../../../../components/ui/Popover/Popover';
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
      <Popover content="Duplicate" placement="top" className="flex">
        <PanelActionButton
          icon={DuplicateIcon}
          onClick={handleDuplicateClick}
        />
      </Popover>
      <Popover content="Remove (delete)" placement="top" className="flex">
        <PanelActionButton icon={TrashIcon} onClick={handleDeleteClick} />
      </Popover>
    </>
  );
}

export default ShapeActions;
