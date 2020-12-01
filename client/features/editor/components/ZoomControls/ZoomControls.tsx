import React, { RefObject } from 'react';
import DropdownMenuAnchor from '../../../../components/ui/DropdownMenu/DropdownMenuAnchor';
import DropdownMenu from '../../../../components/ui/DropdownMenu/DropdownMenu';
import DropdownMenuButton from '../../../../components/ui/DropdownMenu/DropdownMenuButton';
import useDropdownMenu from '../../../../components/ui/DropdownMenu/useDropdownMenu';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import useZoom from '../../hooks/useZoom';
import ClearButton from '../ui/ClearButton';
import classNames from '../../../../utils/classNames';

interface Props {
  editorAreaRef: RefObject<HTMLDivElement>;
  editorMargin: number;
}

function ZoomControls({ editorMargin, editorAreaRef }: Props) {
  const { state } = EditorContainer.useContainer();
  const { fillScreen, fitToScreen, setScale } = useZoom({
    editorAreaRef,
    editorMargin,
  });
  const { setTargetElement, targetElement } = useDropdownMenu();

  return (
    <DropdownMenu
      placement="bottom"
      targetElement={targetElement}
      target={({ open }) => (
        <div ref={setTargetElement}>
          <DropdownMenuAnchor
            as={ClearButton}
            title="Zoom"
            className={classNames('px-2.5', open && 'bg-gray-100 ring-2')}
          >
            {Math.floor(state.zoom * 100)}%
          </DropdownMenuAnchor>
        </div>
      )}
    >
      <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
        <div>
          <DropdownMenuButton onClick={() => fitToScreen()}>
            Fit
          </DropdownMenuButton>
          <DropdownMenuButton onClick={() => fillScreen()}>
            Fill
          </DropdownMenuButton>
        </div>
        <div>
          {[3, 2, 1.25, 1, 0.75, 0.5, 0.25, 0.1].reverse().map((scale) => (
            <DropdownMenuButton onClick={() => setScale(scale)} key={scale}>
              {scale * 100}%
            </DropdownMenuButton>
          ))}
        </div>
      </div>
    </DropdownMenu>
  );
}

export default ZoomControls;
