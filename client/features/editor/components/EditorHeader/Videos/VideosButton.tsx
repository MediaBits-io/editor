import { VideoCameraOutline } from 'heroicons-react';
import React from 'react';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import ClearButton from '../../ui/ClearButton';
import VideosFlyout from './VideosFlyout';

function VideosButton() {
  const {
    isOpen,
    close,
    toggle,
    setTargetElement,
    targetElement,
  } = useDropdown();

  return (
    <>
      <ClearButton
        onClick={toggle}
        ref={setTargetElement}
        icon={VideoCameraOutline}
        className="px-2.5"
      >
        Videos
      </ClearButton>
      <VideosFlyout
        close={close}
        isOpen={isOpen}
        targetElement={targetElement}
      />
    </>
  );
}

export default VideosButton;
