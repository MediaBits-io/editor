import { ClockIcon, TrashIcon } from '@heroicons/react/outline';
import React, { ChangeEvent } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../../utils/classNames';
import { formatTime } from '../../../../../utils/time';
import { Subtitle } from '../../../interfaces/Subtitles';
import { audioProgressState } from '../../../state/atoms/audio';
import useSubtitlesDispatcher from '../../../state/dispatchers/subtitles';
import { subtitleSelector } from '../../../state/selectors/subtitles';
import PanelActionButton from '../../ui/PanelActionButton';

interface Props {
  subtitle: Subtitle;
}

function SubtitleCard({ subtitle }: Props) {
  const { updateSubtitle } = useSubtitlesDispatcher();
  const resetSubtitle = useResetRecoilState(subtitleSelector(subtitle.id));
  const audioProgress = useRecoilValue(audioProgressState);

  const isActive =
    audioProgress >= subtitle.start && audioProgress < subtitle.end;

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateSubtitle(subtitle.id, { text: e.target.value });
  };

  // TODO: on click/focus select, selected=focused style
  return (
    <div
      className={classNames(
        'panel-item flex flex-col mb-3',
        isActive && 'border-gray-400'
      )}
    >
      <div className="text-gray-400 text-xs flex items-center justify-between">
        <div className="flex items-center">
          <span className="flex items-center font-mono">
            <ClockIcon className="w-4 h-4 mr-1" />
            {formatTime(subtitle.start)}
          </span>
          <span className="flex items-center border-l ml-2 pl-2 font-mono">
            <ClockIcon className="w-4 h-4 mr-1 transform -scale-x-1" />
            {formatTime(subtitle.end)}
          </span>
        </div>
        <Tooltip content="Delete" placement="top">
          <PanelActionButton icon={TrashIcon} onClick={() => resetSubtitle()} />
        </Tooltip>
      </div>
      <textarea
        rows={3}
        className={
          'border-0 -mx-3 -mb-2 px-3 py-2 bg-transparent sm:text-sm sm:leading-5 focus:outline-none focus:ring-0'
        }
        value={subtitle.text}
        onChange={handleChangeText}
      />
    </div>
  );
}

export default SubtitleCard;
