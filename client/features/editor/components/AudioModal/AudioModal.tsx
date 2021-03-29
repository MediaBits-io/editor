import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/ui/Modal/Modal';
import ModalFullActions from '../../../../components/ui/Modal/ModalFullActions';
import ModalAction from '../../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../../components/ui/Modal/ModalContent';
import useAudioClipper from '../AudioClipper/useAudioClipper';
import Alert from '../../../../components/ui/Alert';
import FileTooBig from './FileTooBig';
import { ENABLE_UPGRADES } from '../../../../constants';
import AudioClipper from '../AudioClipper/AudioClipper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userPlanState } from '../../../../state/atoms/user';
import { Plan } from '../../../../interfaces/plans';
import { userPlanInfoSelector } from '../../../../state/selectors/user';
import { audioModalState } from '../../state/atoms/ui';

const MAX_FILE_SIZE = 50 * 1024 * 1024;

interface ClipBounds {
  startPart: number;
  endPart: number;
  duration: number;
}

function AudioModalInner() {
  const [{ onContinue, initialAudio }, setAudioModalState] = useRecoilState(
    audioModalState
  );
  const userPlan = useRecoilValue(userPlanState);
  const userPlanInfo = useRecoilValue(userPlanInfoSelector);
  const [loading, setLoading] = useState(false);
  const [bounds, setBounds] = useState<ClipBounds>();
  const [audio, setAudio] = useState(initialAudio);
  const [totalDuration, setTotalDuration] = useState<number>();
  const { clipAudio } = useAudioClipper(audio?.data);

  useEffect(() => {
    if (audio) {
      const audioEl = new Audio();
      audioEl.addEventListener('loadedmetadata', (e) => {
        setTotalDuration((e.target as HTMLAudioElement).duration);
      });
      audioEl.src = audio.url;
    }
  }, [audio]);

  const closeModal = () => {
    setAudioModalState((state) => ({ ...state, visible: false }));
  };

  const handleSubmit = async () => {
    if (!audio) {
      return;
    }

    try {
      setLoading(true);
      const audioBuffer = bounds
        ? await clipAudio(bounds.startPart, bounds.endPart)
        : audio.data;
      onContinue?.(audioBuffer);
      closeModal();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setAudio(undefined);
  };

  const changeAudioFile = (data: Blob) => {
    if (audio && initialAudio?.url !== audio.url) {
      URL.revokeObjectURL(audio.url);
    }

    setAudio({
      data,
      url: URL.createObjectURL(data),
    });
  };

  const clipDuration =
    bounds && Math.round((bounds.endPart - bounds.startPart) * bounds.duration);
  const clipTooLong =
    !!clipDuration && userPlanInfo.durationLimit < clipDuration;
  const trimRequired =
    !!totalDuration && totalDuration > userPlanInfo.durationLimit;
  const fileTooBig = audio && audio.data.size > MAX_FILE_SIZE;
  const isFree = userPlan.plan === Plan.Free;

  const title = audio ? 'Trim audio' : 'Add audio';

  const renderError = () => {
    if (!clipDuration) {
      return null;
    }

    if (clipTooLong) {
      return (
        <Alert
          type="error"
          title="Selected audio clip is too long"
          className="mt-4"
        >
          <div>
            Maximum duration is {userPlanInfo.durationLimit} seconds. Your clip
            length is {clipDuration} seconds.
          </div>
          {isFree && ENABLE_UPGRADES && <div>Upgrade for longer clips</div>}
        </Alert>
      );
    }

    return null;
  };

  return (
    <>
      {fileTooBig ? (
        <FileTooBig
          onCancel={closeModal}
          onBack={handleTryAgain}
          onContinue={handleSubmit}
          trimRequired={trimRequired}
        />
      ) : (
        <>
          <ModalContent title={fileTooBig ? undefined : title}>
            <AudioClipper
              onChange={setBounds}
              audioFile={audio?.data}
              setAudioFile={changeAudioFile}
            />
            {renderError()}
          </ModalContent>
          <ModalFullActions
            dismiss={
              <ModalAction
                disabled={loading}
                onClick={closeModal}
                type="secondary"
              >
                Cancel
              </ModalAction>
            }
            submit={
              <ModalAction
                loading={loading}
                disabled={!totalDuration || !bounds || clipTooLong}
                onClick={handleSubmit}
              >
                Confirm
              </ModalAction>
            }
          />
        </>
      )}
    </>
  );
}

function AudioModal() {
  const { visible } = useRecoilValue(audioModalState);
  return (
    <Modal visible={visible}>
      <AudioModalInner />
    </Modal>
  );
}

export default AudioModal;
