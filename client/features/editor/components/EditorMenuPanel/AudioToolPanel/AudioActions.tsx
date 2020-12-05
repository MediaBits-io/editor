import { PencilOutline, TrashOutline } from 'heroicons-react';
import React from 'react';
import Popover from '../../../../../components/ui/Popover/Popover';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import PanelActionButton from '../../ui/PanelActionButton';

interface Props {
  onEditClick: () => void;
}

function AudioActions({ onEditClick }: Props) {
  const { dispatch } = EditorContainer.useContainer();

  const handleDeleteClick = () => {
    dispatch({ type: 'remove_audio' });
  };

  return (
    <>
      <Popover content="Edit" placement="top" className="flex">
        <PanelActionButton icon={PencilOutline} onClick={onEditClick} />
      </Popover>
      <Popover content="Remove" placement="top" className="flex">
        <PanelActionButton icon={TrashOutline} onClick={handleDeleteClick} />
      </Popover>
    </>
  );
}

export default AudioActions;
