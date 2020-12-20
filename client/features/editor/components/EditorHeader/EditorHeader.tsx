import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import Logo from '../../../../components/ui/Logo/Logo';
import { SparklesOutline } from 'heroicons-react';
import ExportButton from './ExportButton';
import { UserContainer } from '../../../../containers/UserContainer';
import { Plan } from '../../../../interfaces';
import OpenTemplateButton from './OpenTemplate/OpenTemplateButton';
import SaveTemplateButton from './SaveTemplate/SaveTemplateButton';
import VideosButton from './Videos/VideosButton';
import LoginModal from '../LoginModal';
import { ENABLE_UPGRADES } from '../../../../constants';

function EditorHeader() {
  const [loginVisible, setLoginVisible] = useState(false);
  const { userPlan } = UserContainer.useContainer();

  const isPro = userPlan.plan === Plan.Professional;

  const handleClickUpgrade = () => {
    setLoginVisible(true);
  };

  return (
    <div className="flex bg-white border-b w-full p-2 items-center">
      <LoginModal close={() => setLoginVisible(false)} visible={loginVisible} />
      <div className="flex pr-5 mr-5">
        <Logo dark pro={isPro} />
      </div>

      <div className="flex flex-grow items-center justify-between">
        <div className="flex items-center space-x-2">
          <OpenTemplateButton />
          <SaveTemplateButton />
          <VideosButton />
          {ENABLE_UPGRADES && (
            <Button
              onClick={handleClickUpgrade}
              type="custom"
              icon={SparklesOutline}
              className="py-1.5 px-2.5 rounded-md font-semibold bg-yellow-50 hover:bg-yellow-100 focus:bg-yellow-100 transition duration-150 border border-transparent text-yellow-600 focus:text-yellow-700 hover:text-yellow-700 focus:ring-yellow-300 focus:outline-none focus:ring-2"
            >
              {isPro ? 'Professional' : 'Upgrade'}
            </Button>
          )}
        </div>

        <ExportButton />
      </div>
    </div>
  );
}

export default EditorHeader;
