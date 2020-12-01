import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { MusicNoteOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';

function AudioToolButton() {
  const { dispatch } = EditorContainer.useContainer();
  const { selected } = useEditorMenuButton([EditorPanel.Audio]);

  const handleClick = () => {
    dispatch({ type: 'open_editor_panel', panel: EditorPanel.Audio });
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={MusicNoteOutline}
    >
      Audio
    </SideMenuButton>
  );
}

export default AudioToolButton;
