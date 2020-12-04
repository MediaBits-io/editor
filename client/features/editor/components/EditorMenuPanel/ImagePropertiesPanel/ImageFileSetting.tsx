import React from 'react';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import Konva from 'konva';
import AspectRatio from 'react-aspect-ratio';
import useImageInput from '../../../hooks/useImageInput';
import Popover from '../../../../../components/ui/Popover/Popover';

interface Props {
  elementId: string;
  elementProps: Konva.ImageConfig;
}

function ImageFileSetting({ elementId, elementProps }: Props) {
  const { changeImage, inputRef } = useImageInput();
  const { dispatch } = EditorContainer.useContainer();

  const image = elementProps.image as HTMLImageElement;

  const handleClickChangeImage = () => {
    inputRef.current?.click();
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      // Scale according to the previous image size
      const scaleX = elementProps.scaleX ?? 1;
      const scaleY = elementProps.scaleY ?? 1;

      dispatch({
        type: 'update_element',
        id: elementId,
        props: await changeImage(file, {
          width: image.width * scaleX,
          height: image.height * scaleY,
        }),
      });
    }
  };

  return (
    <Popover content="Change image" className="mb-4">
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        onChange={handleChangeImage}
        accept="image/*"
      />
      <button
        type="button"
        className="flex items-center panel-item p-0 overflow-hidden"
        onClick={handleClickChangeImage}
      >
        {image && 'src' in image && (
          <AspectRatio
            className="w-full max-h-80"
            ratio={image.width / image.height}
          >
            <div className="flex items-center justify-center bg-gray-50">
              <img
                className="max-w-full max-h-full"
                src={image.src}
                alt="thumbnail preview"
              />
            </div>
          </AspectRatio>
        )}
      </button>
    </Popover>
  );
}

export default ImageFileSetting;
