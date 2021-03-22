import { MusicNoteOutline } from 'heroicons-react';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EditorPanel } from '../../../interfaces/Editor';
import { activePanelState } from '../../../state/atoms/editor';
import { audioSelector } from '../../../state/selectors/audio';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';
import SideMenuButton from '../../ui/SideMenuButton';

function AudioToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([EditorPanel.Audio])
  );
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
