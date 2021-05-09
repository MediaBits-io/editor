import { TrashIcon } from '@heroicons/react/outline';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil';
import { parseSync } from 'subtitle';
import Button from '../../../../../components/ui/Button';
import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
import { readBlobAsText } from '../../../../../utils/blob';
import classNames from '../../../../../utils/classNames';
import { subtitleIdsState } from '../../../state/atoms/template';
import useSubtitlesDispatcher from '../../../state/dispatchers/subtitles';
import { subtitlesSelector } from '../../../state/selectors/subtitles';
import PanelActionButton from '../../ui/PanelActionButton';
import SideMenuPanel from '../../ui/SideMenuPanel';
import SubtitlesList from './SubtitlesList';
import SubtitlesStyle from './SubtitlesStyle';

type Tabs = 'subtitles' | 'style';

const tabs: { name: string; key: Tabs }[] = [
  { name: 'Subtitles', key: 'subtitles' },
  { name: 'Style', key: 'style' },
];

function SubtitlesToolPanel() {
  const subtitleIds = useRecoilValue(subtitleIdsState);
  const resetSubtitles = useResetRecoilState(subtitlesSelector);
  const { createSubtitle } = useSubtitlesDispatcher();
  const [activeTab, setActiveTab] = useState<Tabs>('subtitles');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = useRecoilCallback(
    () => async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        const contents = await readBlobAsText(file);
        const nodes = parseSync(contents);
        nodes.forEach((node) => {
          if (typeof node.data === 'object') {
            createSubtitle(node.data.text, {
              start: node.data.start,
              end: node.data.end,
            });
          }
        });
      }

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [createSubtitle]
  );

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <SideMenuPanel
      title="Subtitles"
      actions={
        <Tooltip content="Remove all">
          <PanelActionButton icon={TrashIcon} onClick={resetSubtitles} />
        </Tooltip>
      }
    >
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        accept=".vtt,.srt"
      />
      {subtitleIds.length > 0 ? (
        <>
          <nav
            className="flex bg-gray-100 rounded-md mb-3 p-1 space-x-0.5"
            aria-label="Tabs"
          >
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  disabled={isActive}
                  tabIndex={isActive ? -1 : 0}
                  onClick={isActive ? undefined : () => setActiveTab(tab.key)}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive
                      ? 'bg-white shadow text-gray-900 cursor-default'
                      : 'text-gray-500 hover:text-gray-700 focus:text-gray-700 cursor-pointer',
                    'w-1/2 py-2 px-1 text-center font-medium text-sm rounded-md focus:outline-none transition duration-150 ease-in-out'
                  )}
                >
                  {tab.name}
                </button>
              );
            })}
          </nav>
          {activeTab === 'subtitles' && <SubtitlesList />}
          {activeTab === 'style' && <SubtitlesStyle />}
        </>
      ) : (
        <div className="flex flex-col space-y-2">
          <Button
            type="gray"
            onClick={() => createSubtitle('New subtitle line')}
          >
            Manual subtitles
          </Button>
          <Button type="gray" onClick={handleClickUpload}>
            Upload subtitle file
          </Button>
        </div>
      )}
    </SideMenuPanel>
  );
}

export default SubtitlesToolPanel;
