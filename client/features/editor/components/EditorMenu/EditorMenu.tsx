import React from 'react';
import Logo from '../../../../components/ui/Logo/Logo';
import SideMenu from '../ui/SideMenu';
import ElementsToolButton from './buttons/ElementsToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import SubtitlesToolButton from './buttons/SubtitlesToolButton';
import TextToolButton from './buttons/TextToolButton';
import InfoPopup from './InfoPopup';
import UpgradedMessage from './UpgradedMessage';

function EditorMenu() {
  return (
    <SideMenu>
      <Logo />
      <div className="flex flex-col flex-grow space-y-2 px-2 pt-2 pb-1.5 bg-gray-800">
        <SettingsToolButton />
        <TextToolButton />
        <ImageToolButton />
        <ElementsToolButton />
        <SubtitlesToolButton />
        <div className="flex flex-grow">
          <div className="mt-auto">
            <UpgradedMessage />
            <InfoPopup />
          </div>
        </div>
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
