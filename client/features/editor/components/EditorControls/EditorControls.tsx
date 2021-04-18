import React from 'react';
import HistoryControls from './HistoryControls/HistoryControls';
import ZoomControls from './ZoomControls/ZoomControls';
import AudioControls from './AudioControls/AudioControls';

function EditorControls() {
  return (
    <div className="flex w-full space-x-2 px-2 pt-2 justify-between items-center">
      <AudioControls />
      <div className="bg-white rounded-md border p-1.5 flex justify-between space-x-2">
        <ZoomControls />
        <HistoryControls />
      </div>
    </div>
  );
}

export default EditorControls;
