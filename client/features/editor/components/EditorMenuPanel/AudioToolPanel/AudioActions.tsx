import { PencilOutline, ScissorsOutline, TrashOutline } from 'heroicons-react';
import React from 'react';
import Popover from '../../../../../components/ui/Popover/Popover';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import PanelActionButton from '../../ui/PanelActionButton';

interface Props {
  onEditClick: () => void;
  onTrimClick: () => void;
}

function AudioActions({ onEditClick, onTrimClick }: Props) {
  const { dispatch } = EditorContainer.useContainer();

  const handleDeleteClick = () => {
    dispatch({ type: 'remove_audio' });
  };

  return (
    <>
      <Popover content="Trim audio" placement="top" className="flex">
        <PanelActionButton icon={ScissorsOutline} onClick={onTrimClick} />
      </Popover>
      <Popover content="Change file" placement="top" className="flex">
        <PanelActionButton icon={PencilOutline} onClick={onEditClick} />
      </Popover>
      <Popover content="Remove" placement="top" className="flex">
        <PanelActionButton icon={TrashOutline} onClick={handleDeleteClick} />
      </Popover>
    </>
  );
}

export default AudioActions;
