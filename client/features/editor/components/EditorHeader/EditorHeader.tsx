import React, { RefObject, useState } from 'react';
import ExportModal from '../ExportModal/ExportModal';
import HistoryControls from '../HistoryControls/HistoryControls';
import ZoomControls from '../ZoomControls/ZoomControls';
import Button from '../../../../components/ui/Button';
import Logo from '../../../../components/ui/Logo/Logo';

interface Props {
  editorAreaRef: RefObject<HTMLDivElement>;
  editorMargin: number;
}

function EditorHeader({ editorMargin, editorAreaRef }: Props) {
  const [isExportVisible, setExportVisible] = useState(false);

  const handleClickExport = () => {
    setExportVisible(true);
  };

  const closeExport = () => {
    setExportVisible(false);
  };

  return (
    <div className="flex bg-white border-b w-full p-2 items-center">
      <ExportModal visible={isExportVisible} close={closeExport} />
      <div>
        <Logo dark />
      </div>
      <div className="flex ml-auto items-center space-x-4">
        <HistoryControls />
        <ZoomControls
          editorAreaRef={editorAreaRef}
          editorMargin={editorMargin}
        />
        <Button onClick={handleClickExport} type="primary">
          Export Video
        </Button>
      </div>
    </div>
  );
}

export default EditorHeader;
