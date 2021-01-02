import React from 'react';
import SideMenuPanel from '../../ui/SideMenuPanel';
import AspectRatioSetting from './AspectRatioSetting/AspectRatioSetting';
import BackgroundColorPanelItem from './BackgroundColorSetting';

function SettingsToolPanel() {
  return (
    <SideMenuPanel title="Settings">
      <AspectRatioSetting />
      <BackgroundColorPanelItem />
    </SideMenuPanel>
  );
}

export default SettingsToolPanel;
