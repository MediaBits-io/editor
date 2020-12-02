import React, { useState } from 'react';
import ExportModal from '../ExportModal/ExportModal';
import Button from '../../../../components/ui/Button';
import Logo from '../../../../components/ui/Logo/Logo';
import {
  DownloadOutline,
  FolderOpenOutline,
  Heart,
  SaveAsOutline,
  SparklesOutline,
  VideoCameraOutline,
} from 'heroicons-react';
import ClearButton from '../ui/ClearButton';
import Popover from '../../../../components/ui/Popover/Popover';

function EditorHeader() {
  const [isExportVisible, setExportVisible] = useState(false);

  const handleClickExport = () => {
    setExportVisible(true);
  };

  const closeExport = () => {
    setExportVisible(false);
  };

  // TODO: hide pro when not pro
  return (
    <div className="flex bg-white border-b w-full p-2 items-center">
      <ExportModal visible={isExportVisible} close={closeExport} />
      <div className="flex items-center mr-8">
        <Logo dark />
        <Popover
          content={
            <span className="flex items-center space-x-1">
              <span>You are using Pro, thank you!</span>
              <Heart className="w-4 h-4 text-red-500" />
            </span>
          }
        >
          <SparklesOutline className="text-yellow-400 hover:text-yellow-500" />
        </Popover>
      </div>
      <div className="flex flex-grow items-center justify-between">
        <div className="flex items-center space-x-2">
          <ClearButton icon={FolderOpenOutline} className="px-2.5">
            Open template
          </ClearButton>
          <ClearButton icon={SaveAsOutline} className="px-2.5">
            Save template
          </ClearButton>

          <ClearButton className="px-2.5" icon={VideoCameraOutline}>
            Videos
          </ClearButton>

          <Button
            type="custom"
            icon={SparklesOutline}
            className="py-1.5 px-2.5 rounded-md font-semibold bg-yellow-50 hover:bg-yellow-100 focus:bg-yellow-100 transition duration-150 border border-transparent text-yellow-600 focus:text-yellow-700 hover:text-yellow-700 focus:ring-yellow-300 focus:outline-none focus:ring-2"
          >
            Pro
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleClickExport}
            icon={DownloadOutline}
            type="primary"
          >
            Export video
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditorHeader;
