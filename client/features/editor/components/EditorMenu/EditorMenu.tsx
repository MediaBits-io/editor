import React from 'react';
import SideMenu from '../ui/SideMenu';
import TextToolButton from './buttons/TextToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import ElementsToolButton from './buttons/ElementsToolButton';
import InfoPopup from './InfoPopup';
import SubtitlesToolButton from './buttons/SubtitlesToolButton';

function EditorMenu() {
  return (
    <SideMenu>
      <SettingsToolButton />
      <TextToolButton />
      <ImageToolButton />
      <ElementsToolButton />
      <SubtitlesToolButton />
      <InfoPopup />
    </SideMenu>
  );
}

export default EditorMenu;
