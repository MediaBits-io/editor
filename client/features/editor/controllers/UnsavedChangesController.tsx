import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useBeforeUnload } from 'react-use';
import useTemplateDispatcher from '../state/dispatchers/template';
import { hasUnsavedChangesSelector } from '../state/selectors/editor';

function UnsavedChangesController() {
  const hasUnsavedChanges = useRecoilValue(hasUnsavedChangesSelector);
  const { setCurrentTemplateSaved } = useTemplateDispatcher();

  useBeforeUnload(hasUnsavedChanges, 'You have unsaved changes, are you sure?');

  useEffect(() => {
    setCurrentTemplateSaved();
  }, [setCurrentTemplateSaved]);

  return null;
}

export default UnsavedChangesController;
