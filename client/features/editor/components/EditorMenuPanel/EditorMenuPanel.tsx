import React from 'react';
import { useRecoilValue } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';
import { activePanelState } from '../../state/atoms/editor';
import { selectedElementIdSelector } from '../../state/selectors/editor';
import SideMenuPanel from '../ui/SideMenuPanel';
import AudioToolPanel from './AudioToolPanel/AudioToolPanel';
import ElementToolPanel from './ElementToolPanel';
import ImagePropertiesPanel from './ImagePropertiesPanel/ImagePropertiesPanel';
import ImageToolPanel from './ImageToolPanel';
import ProgressBarPropertiesPanel from './ProgressBarPropertiesPanel/ProgressBarPropertiesPanel';
import SettingsToolPanel from './SettingsToolPanel/SettingsToolPanel';
import TextPropertiesPanel from './TextPropertiesPanel/TextPropertiesPanel';
import TextToolPanel from './TextToolPanel';
import WaveformPropertiesPanel from './WaveformPropertiesPanel/WaveformPropertiesPanel';

function EditorMenuPanel() {
  const activePanel = useRecoilValue(activePanelState);
  const selectedElementId = useRecoilValue(selectedElementIdSelector);

  if (selectedElementId) {
    switch (activePanel) {
      case EditorPanel.ImageProperties:
        return <ImagePropertiesPanel elementId={selectedElementId} />;
      case EditorPanel.TextProperties:
        return <TextPropertiesPanel elementId={selectedElementId} />;
      case EditorPanel.WaveformProperties:
        return <WaveformPropertiesPanel elementId={selectedElementId} />;
      case EditorPanel.ProgressBarProperties:
        return <ProgressBarPropertiesPanel elementId={selectedElementId} />;
    }
  }

  switch (activePanel) {
    case EditorPanel.Settings:
      return <SettingsToolPanel />;
    case EditorPanel.Text:
      return <TextToolPanel />;
    case EditorPanel.Image:
      return <ImageToolPanel />;
    case EditorPanel.Audio:
      return <AudioToolPanel />;
    case EditorPanel.Elements:
      return <ElementToolPanel />;
    default:
      console.error(`Panel ${activePanel} does not exist`);
      return <SideMenuPanel />;
  }
}

export default EditorMenuPanel;
