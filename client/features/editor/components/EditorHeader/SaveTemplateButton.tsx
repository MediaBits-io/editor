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
        <button
          type="button"
          onClick={downloadTemplate}
          className="w-56 text-left p-2 flex items-start rounded-md hover:bg-gray-50 focus:ring-gray-300 focus-visible:ring-2 focus:outline-none transition ease-in-out duration-150"
        >
          <DownloadToDiskIcon className="flex-shrink-0 p-0.5 h-6 w-6 text-blue-600" />
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900">Save to disk</p>
            <p className="mt-1 text-sm text-gray-500">
              Download the template file to your computer.
            </p>
          </div>
        </button>
        <button
          type="button"
          disabled
          className="w-56 cursor-default text-left p-2 flex items-start rounded-md bg-yellow-50 opacity-50 focus:ring-gray-300 focus-visible:ring-2 focus:outline-none transition ease-in-out duration-150"
        >
          <CloudUpload className="flex-shrink-0 h-6 w-6 text-yellow-700" />
          <div className="ml-4">
            <p className="text-base font-medium text-yellow-900">
              Save to cloud
            </p>
            <p className="mt-1 text-sm text-yellow-600">
              Upload the template to mediabits.io cloud (PRO)
            </p>
          </div>
        </button>
      </Flyout>
    </>
  );
}

export default SaveTemplateButton;
