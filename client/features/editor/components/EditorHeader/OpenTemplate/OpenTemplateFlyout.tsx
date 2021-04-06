import { CloudDownloadIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import Flyout from '../../../../../components/ui/Flyout';
import UploadToDiskIcon from '../../../../../components/ui/Icons/UploadToDiskIcon';
import FlyoutMenuButton from '../FlyoutMenuButton';
import { readBlobAsText } from '../../../../../utils/blob';
import DiscardChangesModal from '../../DiscardChangesModal';
import {
  autoCorrectTemplateIssues,
  loadTemplateFonts,
  loadTemplateImages,
} from '../../../utils/template';
import { useToasts } from 'react-toast-notifications';
import NotificationContent from '../../../../../components/ui/Notification/NotificationContent';
import ExternalLink from '../../../../../components/ui/ExternalLink';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingState } from '../../../state/atoms/editor';
import { Template } from '../../../interfaces/StageConfig';
import useTemplateDispatcher from '../../../state/dispatchers/template';
import { EditorAreaContainer } from '../../../containers/EditorAreaContainer';
import { hasUnsavedChangesSelector } from '../../../state/selectors/editor';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

function OpenTemplateFlyout({ isOpen, close, targetElement }: Props) {
  const { getScreenDimensions } = EditorAreaContainer.useContainer();
  const hasUnsavedChanges = useRecoilValue(hasUnsavedChangesSelector);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { setLoadedTemplate } = useTemplateDispatcher();
  const [isDiscardChangesVisible, setDiscardChangesVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToasts();

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    if (
      file &&
      (file.type === 'application/json' || file.name.endsWith('.json'))
    ) {
      let loadingTimeout: any;

      try {
        loadingTimeout = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        const template: Template = JSON.parse(await readBlobAsText(file));
        await Promise.all([
          loadTemplateImages(template),
          loadTemplateFonts(template),
        ]);
        autoCorrectTemplateIssues(template);

        // Do not show loader if all fonts loaded from cache
        clearTimeout(loadingTimeout);

        setLoadedTemplate(template, getScreenDimensions());
      } catch (e) {
        console.error(e);
        addToast(
          <NotificationContent title="Failed to load template">
            Please contact support through
            <ExternalLink
              className="mx-1"
              newTab
              to="mailto:support@mediabits.io"
            >
              support@mediabits.io
            </ExternalLink>
          </NotificationContent>,
          { appearance: 'error', autoDismiss: false }
        );
        if (loadingTimeout) {
          clearTimeout(loadingTimeout);
        }
        setIsLoading(false);
      }
    }
  };

  const handleClickOpen = () => {
    if (hasUnsavedChanges) {
      setDiscardChangesVisible(true);
    } else {
      inputRef.current?.click();
    }
  };

  const handleDiscardClick = () => {
    inputRef.current?.click();
    setDiscardChangesVisible(false);
  };

  const handleCancelDiscardClick = () => {
    setDiscardChangesVisible(false);
  };

  return (
    <>
      <DiscardChangesModal
        visible={isDiscardChangesVisible}
        ok={handleDiscardClick}
        cancel={handleCancelDiscardClick}
      />
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        accept=".json,application/json"
      />
      <Flyout
        wrapperClass="w-72"
        className="p-3 space-y-2"
        targetElement={targetElement}
        isOpen={isOpen}
        close={close}
      >
        <FlyoutMenuButton
          title="Open from disk"
          description="Select the template file from your computer"
          onClick={handleClickOpen}
          icon={UploadToDiskIcon}
        />
        <FlyoutMenuButton
          title="Import from cloud"
          description="Download the template from mediabits.io cloud (PRO)"
          onClick={() => console.info('not implemented yet')}
          icon={CloudDownloadIcon}
          onlyPro
        />
      </Flyout>
    </>
  );
}

export default OpenTemplateFlyout;
