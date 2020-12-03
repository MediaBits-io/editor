import React from 'react';
import SideMenu from '../ui/SideMenu';
import TextToolButton from './buttons/TextToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import ElementsToolButton from './buttons/ElementsToolButton';
import AudioToolButton from './buttons/AudioToolButton';
import InfoPopup from './InfoPopup';

function EditorMenu() {
  return (
    <SideMenu>
      <SettingsToolButton />
      <TextToolButton />
      <AudioToolButton />
      <ImageToolButton />
      <ElementsToolButton />
      <InfoPopup />
    </SideMenu>
  );
}

export default EditorMenu;
