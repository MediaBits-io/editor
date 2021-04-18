import React from 'react';
import HistoryControls from './HistoryControls/HistoryControls';
import ZoomControls from './ZoomControls/ZoomControls';
import AudioControls from './AudioControls/AudioControls';

function EditorControls() {
  return (
    <div className="flex w-full bg-white space-x-2 p-1.5 justify-between items-center border-b">
      <AudioControls />
      <div className="flex justify-between space-x-2 border-l p-0.5 pl-2">
        <ZoomControls />
        <HistoryControls />
      </div>
    </div>
  );
}

export default EditorControls;
