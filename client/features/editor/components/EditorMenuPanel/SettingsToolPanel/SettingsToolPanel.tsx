import React, { RefObject } from 'react';
import SideMenuPanel from '../../ui/SideMenuPanel';
import AspectRatioSetting from './AspectRatioSetting/AspectRatioSetting';
import BackgroundColorPanelItem from './BackgroundColorSetting';

interface Props {
  editorAreaRef: RefObject<HTMLDivElement>;
  editorMargin: number;
}

function SettingsToolPanel({ editorAreaRef, editorMargin }: Props) {
  return (
    <SideMenuPanel title="Settings">
      <AspectRatioSetting
        editorAreaRef={editorAreaRef}
        editorMargin={editorMargin}
      />
      <BackgroundColorPanelItem />
    </SideMenuPanel>
  );
}

export default SettingsToolPanel;
