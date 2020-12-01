import React from 'react';
import SideMenu from '../ui/SideMenu';
import TextToolButton from './buttons/TextToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import ElementsToolButton from './buttons/ElementsToolButton';
import AudioToolButton from './buttons/AudioToolButton';

function EditorMenu() {
  return (
    <SideMenu>
      <SettingsToolButton />
      <TextToolButton />
      <AudioToolButton />
      <ImageToolButton />
      <ElementsToolButton />
    </SideMenu>
  );
}

export default EditorMenu;
