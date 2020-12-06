import React, { RefObject } from 'react';
import Konva from 'konva';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import ImageToolPanel from './ImageToolPanel';
import TextToolPanel from './TextToolPanel';
import SettingsToolPanel from './SettingsToolPanel/SettingsToolPanel';
import ElementToolPanel from './ElementToolPanel';
import AudioToolPanel from './AudioToolPanel/AudioToolPanel';
import ImagePropertiesPanel from './ImagePropertiesPanel/ImagePropertiesPanel';
import { EditorPanel } from '../../interfaces/Editor';
import useElements from '../../hooks/useElements';
import SideMenuPanel from '../ui/SideMenuPanel';
import TextPropertiesPanel from './TextPropertiesPanel/TextPropertiesPanel';
import WaveformPropertiesPanel from './WaveformPropertiesPanel/WaveformPropertiesPanel';
import ProgressBarPropertiesPanel from './ProgressBarPropertiesPanel/ProgressBarPropertiesPanel';
import { ProgressBarConfig, WaveformConfig } from 'konva-elements';

interface Props {
  editorAreaRef: RefObject<HTMLDivElement>;
  editorMargin: number;
}

function EditorMenuPanel({ editorAreaRef, editorMargin }: Props) {
  const { state } = EditorContainer.useContainer();
  const { selectedElement } = useElements();

  if (selectedElement) {
    switch (state.activePanel) {
      case EditorPanel.ImageProperties:
        return (
          <ImagePropertiesPanel
            elementId={selectedElement.id}
            elementProps={selectedElement.props as Konva.ImageConfig}
          />
        );
      case EditorPanel.TextProperties:
        return (
          <TextPropertiesPanel
            elementId={selectedElement.id}
            elementProps={selectedElement.props as Konva.TextConfig}
          />
        );
      case EditorPanel.WaveformProperties:
        return (
          <WaveformPropertiesPanel
            elementId={selectedElement.id}
            elementProps={selectedElement.props as WaveformConfig}
          />
        );
      case EditorPanel.ProgressBarProperties:
        return (
          <ProgressBarPropertiesPanel
            elementId={selectedElement.id}
            elementProps={selectedElement.props as ProgressBarConfig}
          />
        );
    }
  }

  switch (state.activePanel) {
    case EditorPanel.Settings:
      return (
        <SettingsToolPanel
          editorAreaRef={editorAreaRef}
          editorMargin={editorMargin}
        />
      );
    case EditorPanel.Text:
      return <TextToolPanel />;
    case EditorPanel.Image:
      return <ImageToolPanel />;
    case EditorPanel.Audio:
      return <AudioToolPanel />;
    case EditorPanel.Elements:
      return <ElementToolPanel />;
    default:
      console.error(`Panel ${state.activePanel} does not exist`);
      return <SideMenuPanel />;
  }
}

export default EditorMenuPanel;
