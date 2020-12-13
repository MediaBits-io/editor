import { CloudUpload } from 'heroicons-react';
import React from 'react';
import { saveAs } from 'file-saver';
import Flyout from '../../../../../components/ui/Flyout';
import DownloadToDiskIcon from '../../../../../components/ui/Icons/DownloadToDiskIcon';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { toTemplateJSON } from '../../../utils/template';
import { useToasts } from 'react-toast-notifications';
import FlyoutMenuButton from '../FlyoutMenuButton';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

function SaveTemplateFlyout({ close, isOpen, targetElement }: Props) {
  const { template, dispatch } = EditorContainer.useContainer();
  const { addToast } = useToasts();
  const downloadTemplate = async () => {
    saveAs(
      new Blob([await toTemplateJSON(template)], {
        type: 'application/json',
      })
    );
    dispatch({ type: 'save_changes' });
    addToast('Template saved successfully', { appearance: 'success' });
    close();
  };

  return (
    <Flyout
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
