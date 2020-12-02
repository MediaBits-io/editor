import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import { EditorPanel } from '../../interfaces/Editor';
import { Template } from '../../interfaces/StageConfig';
import { EditorState } from './interfaces';
import reducer from './reducer';

const initialTemplate: Template = {
  dimensions: {
    width: 1080,
    height: 1080,
  },
  background: {
    fill: 'rgba(255, 255, 255, 1)',
  },
  elements: [],
};

const initialState: EditorState = {
  template: {
    present: initialTemplate,
    past: [],
    future: [],
  },
  lastSaved: initialTemplate,
  activePanel: EditorPanel.Settings,
  zoom: 1,
};

interface OverridableProps {
  state: EditorState;
  dispatch: React.Dispatch<any>;
}

function useEditorState(
  initialValue: {
    override?: OverridableProps;
  } = {}
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    template: state.template.present,
    dispatch,
    ...initialValue.override,
  };
}

export const EditorContainer = createContainer(useEditorState);
