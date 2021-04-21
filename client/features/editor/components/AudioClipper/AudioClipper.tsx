import React, { useRef, useState } from 'react';
import Loader from '../../../../components/ui/Loader/Loader';
import classNames from '../../../../utils/classNames';
import Waveform from './Waveform';

interface Props {
  audioFile?: Blob;
  setAudioFile: (file: Blob) => void;
  onChange: (bounds: {
    startPart: number;
    endPart: number;
    duration: number;
  }) => void;
}

function AudioClipper({ audioFile, setAudioFile, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setLoading] = useState(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      setAudioFile(file);
      setLoading(true);
    }
  };

  const handleClickImport = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        accept="audio/*"
      />
      <div className="bg-gray-700 shadow-inner overflow-hidden rounded-lg">
        {audioFile && (
          <div className={classNames('relative p-4', isLoading && 'h-40')}>
            {isLoading && (
              <div className="absolute flex inset-0">
                <Loader className="m-auto" />
              </div>
            )}

            <Waveform
              onChange={onChange}
              audioFile={audioFile}
              setLoading={setLoading}
              isLoading={isLoading}
            />
          </div>
        )}

        {!audioFile && (
          <button
            onClick={handleClickImport}
            className="w-full p-4 h-40 text-base text-gray-300 hover:text-gray-200"
          >
            <span className="flex flex-col justify-center text-center">
              <span className="mb-1">Click to select audio</span>
              <span className="text-sm text-gray-500">Max size is 50MB</span>
            </span>
          </button>
        )}
      </div>
    </>
  );
}

export default AudioClipper;
