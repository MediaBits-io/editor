import { CloudUpload } from 'heroicons-react';
import React from 'react';
import { saveAs } from 'file-saver';
import Flyout from '../../../../../components/ui/Flyout';
import DownloadToDiskIcon from '../../../../../components/ui/Icons/DownloadToDiskIcon';
import { toTemplateJSON } from '../../../utils/template';
import { useToasts } from 'react-toast-notifications';
import FlyoutMenuButton from '../FlyoutMenuButton';
import useTemplateDispatcher from '../../../state/dispatchers/template';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

function SaveTemplateFlyout({ close, isOpen, targetElement }: Props) {
  const { setCurrentTemplateSaved } = useTemplateDispatcher();
  const { addToast } = useToasts();
  const downloadTemplate = async () => {
    const template = await setCurrentTemplateSaved();
    saveAs(
      new Blob([await toTemplateJSON(template)], {
        type: 'application/json',
      })
    );
    addToast('Template saved successfully', { appearance: 'success' });
    close();
  };

  return (
    <Flyout
      wrapperClass="w-72"
      className="p-3 space-y-2"
      targetElement={targetElement}
      isOpen={isOpen}
      close={close}
    >
      <FlyoutMenuButton
        title="Save to disk"
        description="Download the template file to your computer"
        onClick={downloadTemplate}
        icon={DownloadToDiskIcon}
      />
      <FlyoutMenuButton
        title="Export to cloud"
        description="Upload the template to mediabits.io cloud (PRO)"
        onClick={() => console.info('not implemented yet')}
        icon={CloudUpload}
        onlyPro
      />
    </Flyout>
  );
}

export default SaveTemplateFlyout;
