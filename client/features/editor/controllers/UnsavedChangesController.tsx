import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useTemplateDispatcher from '../state/dispatchers/template';
import { hasUnsavedChangesSelector } from '../state/selectors/editor';

function UnsavedChangesController() {
  const hasUnsavedChanges = useRecoilValue(hasUnsavedChangesSelector);
  const { setCurrentTemplateSaved } = useTemplateDispatcher();

  useEffect(() => {
    setCurrentTemplateSaved();
  }, [setCurrentTemplateSaved]);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    const unloadCallback = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, [hasUnsavedChanges]);

  return null;
}

export default UnsavedChangesController;
