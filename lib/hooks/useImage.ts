import { useState, useEffect, useCallback, useRef } from 'react';

interface NetworkImage {
  loaded: boolean;
  image: HTMLImageElement | null;
}

export const useImage = (src: string): [HTMLImageElement, boolean] => {
  const [networkImage, setNetworkImage] = useState<NetworkImage>({
    loaded: false,
    image: null,
  });

  useEffect(() => {
    const newImage = new window.Image();
    newImage.src = src;
    setNetworkImage({ loaded: false, image: newImage });

    const onLoad = () => {
      console.log('onLoad');
      setNetworkImage({ loaded: true, image: newImage });
    };
    newImage.onload = onLoad;

    return newImage.removeEventListener('load', onLoad);
  }, [src, setNetworkImage]);

  const { image, loaded } = networkImage;
  return [image, loaded];
};
