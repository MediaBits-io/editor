import { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';
import useTemplateDispatcher from '../state/dispatchers/template';
import { toTemplateJSON } from '../utils/template';

function useTemplate() {
  const { setCurrentTemplateSaved } = useTemplateDispatcher();
  const { addToast } = useToasts();

  const downloadTemplate = useCallback(async () => {
    const template = await setCurrentTemplateSaved();
    saveAs(
      new Blob([await toTemplateJSON(template)], {
        type: 'application/json',
      })
    );
    addToast('Template saved successfully', { appearance: 'success' });
  }, [addToast, setCurrentTemplateSaved]);

  return {
    downloadTemplate,
  };
}

export default useTemplate;
