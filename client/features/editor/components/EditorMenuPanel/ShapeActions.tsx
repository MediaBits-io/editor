import {
  ArrowDownOutline,
  ArrowUpOutline,
  TrashOutline,
} from 'heroicons-react';
import React from 'react';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import PanelActionButton from '../ui/PanelActionButton';

interface Props {
  elementId: string;
}

function ShapeActions({ elementId }: Props) {
  const { dispatch, template } = EditorContainer.useContainer();

  const handleDeleteClick = () => {
    dispatch({ type: 'delete_element', id: elementId });
  };

  const handleMoveUpClick = () => {
    dispatch({ type: 'reorder_element', id: elementId, inc: 1 });
  };

  const handleMoveDownClick = () => {
    dispatch({ type: 'reorder_element', id: elementId, inc: -1 });
  };

  return (
    <>
      <PanelActionButton
        title="Move layer up"
        icon={ArrowUpOutline}
        onClick={handleMoveUpClick}
        disabled={
          template.elements[template.elements.length - 1]?.id === elementId
        }
      />
      <PanelActionButton
        title="Move layer down"
        icon={ArrowDownOutline}
        onClick={handleMoveDownClick}
        disabled={template.elements[0]?.id === elementId}
      />
      <PanelActionButton
        title="Remove"
        icon={TrashOutline}
        onClick={handleDeleteClick}
      />
    </>
  );
}

export default ShapeActions;
