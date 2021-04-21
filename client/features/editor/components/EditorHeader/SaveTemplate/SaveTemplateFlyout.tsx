import { CloudUploadIcon } from '@heroicons/react/solid';
import React from 'react';
import Flyout from '../../../../../components/ui/Flyout';
import DownloadToDiskIcon from '../../../../../components/ui/Icons/DownloadToDiskIcon';
import useTemplate from '../../../hooks/useTemplate';
import FlyoutMenuButton from '../FlyoutMenuButton';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

function SaveTemplateFlyout({ close, isOpen, targetElement }: Props) {
  const { downloadTemplate } = useTemplate();

  const handleSaveClick = () => {
    downloadTemplate();
    close();
  };

  return (
    <Flyout
      wrapperClass="w-72"
      className="p-3 space-y-1.5"
      targetElement={targetElement}
      isOpen={isOpen}
      close={close}
    >
      <FlyoutMenuButton
        title={
          <span className="flex justify-between items-start">
            <span>Save to disk</span>
            <span className="text-xs text-gray-400 p-0.5">(ctrl+s)</span>
          </span>
        }
        description="Download the template file to your computer"
        onClick={handleSaveClick}
        icon={DownloadToDiskIcon}
      />
      <FlyoutMenuButton
        title="Export to cloud"
        description="Upload the template to mediabits.io cloud (PRO)"
        onClick={() => console.info('not implemented yet')}
        icon={CloudUploadIcon}
        onlyPro
      />
    </Flyout>
  );
}

export default SaveTemplateFlyout;
