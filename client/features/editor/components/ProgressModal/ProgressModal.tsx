import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../../../../components/ui/Button';
import Modal from '../../../../components/ui/Modal/Modal';
import ModalAction from '../../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../../components/ui/Modal/ModalContent';
import ModalFullAction from '../../../../components/ui/Modal/ModalFullAction';
import Stepper from '../../../../components/ui/Stepper/Stepper';
import { progressModalState } from '../../state/atoms/ui';
import { progressVideoSelector } from '../../state/selectors/ui';
import { TaskStatus } from '../../../../interfaces/videos';

function ProgressModal() {
  const [{ visible }, setProgressModalState] = useRecoilState(
    progressModalState
  );
  const video = useRecoilValue(progressVideoSelector);

  const close = () => {
    setProgressModalState((state) => ({ ...state, visible: false }));
  };

  const activeIndex = useMemo(() => {
    switch (video?.status) {
      case TaskStatus.RENDERING:
        return 1;
      case TaskStatus.ERROR:
        return 2;
      case TaskStatus.DONE:
        return 3;
      default:
        return 0;
    }
  }, [video]);

  const handleClickDownload = () => {
    if (video?.url) {
      saveAs(video.url, 'video.mp4');
    }
  };

  return (
    <Modal className="max-w-md" visible={visible}>
      <ModalContent close={close} title="Generating video">
        <p className="mb-3">
          The download link will be available in "Videos". It can take a few
          minutes depending on video length.
        </p>
        <div className="text-left bg-gray-50 p-3 border border-gray-100 rounded-md">
          <Stepper
            error={video && video.status === TaskStatus.ERROR}
            activeIndex={activeIndex}
            steps={[
              {
                title: 'Queueing',
                info: 'Waiting for the video to start rendering',
              },
              {
                title: 'Rendering',
                info: 'Generating the video on our server',
              },
              {
                title: 'Done',
                info: (
                  <>
                    Download link is generated:{' '}
                    <Button
                      disabled={!video?.url}
                      onClick={handleClickDownload}
                      type="link"
                    >
                      download video
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </div>
      </ModalContent>

      <ModalFullAction
        action={
          <ModalAction onClick={close} type="secondary">
            Close
          </ModalAction>
        }
      />
    </Modal>
  );
}

export default ProgressModal;
