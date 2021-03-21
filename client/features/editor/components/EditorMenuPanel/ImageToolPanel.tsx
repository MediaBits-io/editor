import React from 'react';
import { ShapeType } from '../../interfaces/Shape';
import SideMenuPanel from '../ui/SideMenuPanel';
import useImageInput from '../../hooks/useImageInput';
import Button from '../../../../components/ui/Button';
import { UploadOutline } from 'heroicons-react';
import useElementsDispatcher from '../../state/dispatchers/elements';

// TODO: clear images at some point (when leaving editor?)
function ImageToolPanel() {
  const { createElement } = useElementsDispatcher();
  const { changeImage, inputRef } = useImageInput();

  const handleClickAddImage = () => {
    inputRef.current?.click();
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      const defaultProps = await changeImage(file);
      createElement(ShapeType.Image, {
        ...defaultProps,
        blurRadius: 0,
      });
    }
  };

  return (
    <SideMenuPanel title="Image">
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        onChange={handleChangeImage}
        accept="image/*"
      />
      <Button type="gray" icon={UploadOutline} onClick={handleClickAddImage}>
        Upload image
      </Button>
    </SideMenuPanel>
  );
}

export default ImageToolPanel;
