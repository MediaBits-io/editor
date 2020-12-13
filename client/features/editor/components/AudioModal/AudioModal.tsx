import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Modal from '../../../../components/ui/Modal/Modal';
import ModalFullActions from '../../../../components/ui/Modal/ModalFullActions';
import ModalAction from '../../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../../components/ui/Modal/ModalContent';
import useAudioClipper from '../AudioClipper/useAudioClipper';
import Alert from '../../../../components/ui/Alert';
import { UserContainer } from '../../../../containers/UserContainer';
import { Plan } from '../../../../interfaces';
import FileTooBig from './FileTooBig';

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export interface AudioState {
  url: string;
  data: Blob;
}

interface ClipBounds {
  startPart: number;
  endPart: number;
  duration: number;
}

interface Props {
  visible: boolean;
  close: () => void;
  onContinue?: (clipBuffer: Blob) => Promise<void>;
  initialAudio?: AudioState;
}

const AudioClipper = dynamic(() => import('../AudioClipper/AudioClipper'), {
  ssr: false,
});

function AudioModal({ visible, close, initialAudio, onContinue }: Props) {
  const { userPlanInfo, userPlan } = UserContainer.useContainer();
  const [loading, setLoading] = useState(false);
  const [bounds, setBounds] = useState<ClipBounds>();
  const [audio, setAudio] = useState(initialAudio);
  const [totalDuration, setTotalDuration] = useState<number>();
  const { clipAudio } = useAudioClipper(audio?.data);

  useEffect(() => {
    if (visible) {
      setAudio((audio) => audio ?? initialAudio);
    }
  }, [initialAudio, visible]);

  useEffect(() => {
    if (audio) {
      const audioEl = new Audio();
      audioEl.addEventListener('loadedmetadata', (e) => {
        setTotalDuration((e.target as HTMLAudioElement).duration);
      });
      audioEl.src = audio.url;
    }
  }, [audio]);

  const handleSubmit = async () => {
    if (!audio) {
      return;
    }

    try {
      setLoading(true);
      const audioBuffer = bounds
        ? await clipAudio(bounds.startPart, bounds.endPart)
        : audio.data;
      await onContinue?.(audioBuffer);
      close();
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
    bounds && (bounds.endPart - bounds.startPart) * bounds.duration;
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
            length is {Math.floor(clipDuration)} seconds.
          </div>
          {isFree && <div>Upgrade for longer clips</div>}
        </Alert>
      );
    }

    return null;
  };

  return (
    <Modal visible={visible}>
      {fileTooBig ? (
        <FileTooBig
          onCancel={close}
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
              <ModalAction disabled={loading} onClick={close} type="secondary">
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
    </Modal>
  );
}

export default AudioModal;
