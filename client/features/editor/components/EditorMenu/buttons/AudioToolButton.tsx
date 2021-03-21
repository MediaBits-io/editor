import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { MusicNoteOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activePanelState } from '../../../state/atoms/editor';
import { audioSelector } from '../../../state/selectors/audio';

function AudioToolButton() {
  const { selected } = useEditorMenuButton([EditorPanel.Audio]);
  const setActivePanel = useSetRecoilState(activePanelState);
  const audio = useRecoilValue(audioSelector);

  const handleClick = () => {
    setActivePanel(EditorPanel.Audio);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={MusicNoteOutline}
      toggled={!!audio}
    >
      Audio
    </SideMenuButton>
  );
}

export default AudioToolButton;
