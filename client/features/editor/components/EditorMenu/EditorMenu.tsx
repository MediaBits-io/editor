import React from 'react';
import SideMenu from '../ui/SideMenu';
import TextToolButton from './buttons/TextToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import ElementsToolButton from './buttons/ElementsToolButton';
import InfoPopup from './InfoPopup';
import Logo from '../../../../components/ui/Logo/Logo';
import { useRecoilValue } from 'recoil';
import { userPlanState } from '../../../../state/atoms/user';
import { Plan } from '../../../../interfaces/plans';

function EditorMenu() {
  const userPlan = useRecoilValue(userPlanState);

  const isPro = userPlan.plan === Plan.Professional;
  return (
    <SideMenu>
      <Logo pro={isPro} />
      <div className="flex flex-col flex-grow space-y-2 px-2 pt-2 pb-1.5 bg-gray-800">
        <SettingsToolButton />
        <TextToolButton />
        <ImageToolButton />
        <ElementsToolButton />
        {/* <SubtitlesToolButton /> */}
        <InfoPopup />
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
