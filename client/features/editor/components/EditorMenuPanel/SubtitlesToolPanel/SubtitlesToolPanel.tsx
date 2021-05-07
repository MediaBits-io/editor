import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import classNames from '../../../../../utils/classNames';
import { subtitleIdsState } from '../../../state/atoms/template';
import useSubtitlesDispatcher from '../../../state/dispatchers/subtitles';
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
  const { createSubtitle } = useSubtitlesDispatcher();
  const [activeTab, setActiveTab] = useState<Tabs>('subtitles');

  return (
    <SideMenuPanel title="Subtitles">
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
        <Button type="gray" onClick={() => createSubtitle('New subtitle line')}>
          Manual subtitles
        </Button>
      )}
    </SideMenuPanel>
  );
}

export default SubtitlesToolPanel;
