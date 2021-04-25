import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { appReadyState } from '../state/atoms/app';

function AppController() {
  const setAppReady = useSetRecoilState(appReadyState);

  useEffect(() => {
    setAppReady({ rendered: true });
  }, [setAppReady]);

  return null;
}

export default AppController;
