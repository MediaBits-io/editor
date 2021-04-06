import { VideoCameraIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import { unseenVideosCountSelector } from '../../../../../state/selectors/videos';
import ClearButton from '../../ui/ClearButton';
import VideosFlyout from './VideosFlyout';

function VideosButton() {
  const unseenVideosCount = useRecoilValue(unseenVideosCountSelector);
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
        icon={VideoCameraIcon}
        notifications={unseenVideosCount}
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
