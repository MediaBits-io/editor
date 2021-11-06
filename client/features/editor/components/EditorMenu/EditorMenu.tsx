import React from 'react';
import Button from '../../../../components/ui/Button';
import ExternalLink from '../../../../components/ui/ExternalLink';
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
            <ExternalLink
              target="_blank"
              type="custom"
              to="https://vistontea.com/"
              className="block mb-2 ml-auto focus:outline-none"
            >
              <Button
                round
                type="link-light"
                className="text-xs w-16 text-gray-200 focus:!no-underline hover:text-white focus:text-white transition duration-150"
              >
                🍵 Tea?
              </Button>
            </ExternalLink>

            <InfoPopup />
          </div>
        </div>
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
