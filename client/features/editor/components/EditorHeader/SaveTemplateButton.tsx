import { CloudUpload } from 'heroicons-react';
import React from 'react';
import { saveAs } from 'file-saver';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import Flyout from '../../../../components/ui/Flyout';
import DownloadToDiskIcon from '../../../../components/ui/Icons/DownloadToDiskIcon';
import SaveIcon from '../../../../components/ui/Icons/SaveIcon';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import ClearButton from '../ui/ClearButton';
import { toTemplateJSON } from '../../utils/template';
import { useToasts } from 'react-toast-notifications';
import FlyoutMenuButton from './FlyoutMenuButton';

function SaveTemplateButton() {
  const { template, dispatch } = EditorContainer.useContainer();
  const { addToast } = useToasts();
  const {
    isOpen,
    close,
    toggle,
    setTargetElement,
    targetElement,
  } = useDropdown();

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
    <>
      <ClearButton
        onClick={toggle}
        ref={setTargetElement}
        icon={SaveIcon}
        className="px-2.5"
      >
        Save template
      </ClearButton>
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
    </>
  );
}

export default SaveTemplateButton;
