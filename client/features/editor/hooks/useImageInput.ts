import { useRef } from 'react';
import Konva from 'konva';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';

function useImageInput() {
  const { template } = EditorContainer.useContainer();
  const inputRef = useRef<HTMLInputElement>(null);

  const changeImage = async (
    file: File,
    scaleTo?: {
      width: number;
      height: number;
    }
  ) => {
    return new Promise<Konva.ImageConfig>((resolve, reject) => {
      const image = new Image();

      image.src = URL.createObjectURL(file);

      const onLoad = () => {
        const { width, height } = image;

        const scale = Math.min(
          1,
          template.dimensions.width / width,
          template.dimensions.height / height,
          scaleTo ? Math.max(scaleTo.width / width, scaleTo.height / height) : 1
        );

        resolve({ image, scaleX: scale, scaleY: scale });

        image.removeEventListener('load', onLoad);
      };

      image.addEventListener('load', onLoad);
    });
  };

  return {
    inputRef,
    changeImage,
  };
}

export default useImageInput;
