import React from 'react';
import SideMenu from '../ui/SideMenu';
import TextToolButton from './buttons/TextToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import ElementsToolButton from './buttons/ElementsToolButton';
import AudioToolButton from './buttons/AudioToolButton';
import Button from '../../../../components/ui/Button';
import { QuestionMarkCircle } from 'heroicons-react';
import Popover from '../../../../components/ui/Popover/Popover';

// TODO: add info modal on "about" click
function EditorMenu() {
  return (
    <SideMenu>
      <SettingsToolButton />
      <TextToolButton />
      <AudioToolButton />
      <ImageToolButton />
      <ElementsToolButton />
      <div className="mt-auto flex flex-grow">
        <Popover content="Info" className="mt-auto" placement="top">
          <Button round type="black" icon={QuestionMarkCircle} />
        </Popover>
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
