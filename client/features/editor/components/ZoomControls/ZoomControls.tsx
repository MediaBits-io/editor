import React from 'react';
import DropdownMenuAnchor from '../../../../components/ui/DropdownMenu/DropdownMenuAnchor';
import DropdownMenu from '../../../../components/ui/DropdownMenu/DropdownMenu';
import DropdownMenuButton from '../../../../components/ui/DropdownMenu/DropdownMenuButton';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import useZOomControls from '../../hooks/useZoomControls';
import ClearButton from '../ui/ClearButton';
import classNames from '../../../../utils/classNames';
import Popover from '../../../../components/ui/Popover/Popover';
import { useRecoilState } from 'recoil';
import { zoomState } from '../../state/atoms/editor';

function ZoomControls() {
  const [zoom, setZoom] = useRecoilState(zoomState);
  const { fillToScreen, fitToScreen } = useZOomControls();
  const { setTargetElement, targetElement } = useDropdown();

  return (
    <DropdownMenu
      placement="top"
      targetElement={targetElement}
      target={({ open }) => (
        <div ref={setTargetElement}>
          <Popover
            content="Zoom"
            className="mt-auto"
            placement="top"
            closed={open}
          >
            <DropdownMenuAnchor
              as={ClearButton}
              className={classNames(
                'px-2.5',
                open && 'bg-gray-100 ring-gray-300 ring-2'
              )}
            >
              {Math.floor(zoom * 100)}%
            </DropdownMenuAnchor>
          </Popover>
        </div>
      )}
    >
      <div className="overflow-y-auto divide-y divide-gray-100">
        <div>
          {[3, 2, 1.25, 1, 0.75, 0.5, 0.25, 0.1].map((scale) => (
            <DropdownMenuButton onClick={() => setZoom(scale)} key={scale}>
              {scale * 100}%
            </DropdownMenuButton>
          ))}
        </div>
        <div>
          <DropdownMenuButton onClick={fitToScreen}>Fit</DropdownMenuButton>
          <DropdownMenuButton onClick={fillToScreen}>Fill</DropdownMenuButton>
        </div>
      </div>
    </DropdownMenu>
  );
}

export default ZoomControls;
