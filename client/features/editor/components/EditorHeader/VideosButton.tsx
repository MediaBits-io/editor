import { VideoCameraOutline } from 'heroicons-react';
import React from 'react';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import Flyout from '../../../../components/ui/Flyout';
import ClearButton from '../ui/ClearButton';

function VideosButton() {
  const {
    isOpen,
    close,
    open,
    setTargetElement,
    targetElement,
  } = useDropdown();

  return (
    <>
      <ClearButton
        onClick={open}
        ref={setTargetElement}
        icon={VideoCameraOutline}
        className="px-2.5"
      >
        Videos
      </ClearButton>
      <Flyout
        placement="bottom-end"
        targetElement={targetElement}
        isOpen={isOpen}
        close={close}
      >
        Videos
      </Flyout>
    </>
  );
}

export default VideosButton;
