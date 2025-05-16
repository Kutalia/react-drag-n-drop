// Based on https://gist.github.com/jordymeow/ed083811e407e89b49c0eecd7f722695
import { useState, useEffect, useRef } from 'react'

interface ImgObj {
  src: string | null
  status: 'loaded' | 'loading' | 'failed'
}

export const useImage = (src: string | null) => {
  const [image, setImage] = useState<ImgObj>({ src: null, status: 'loading' });
  const imgEl = useRef<HTMLImageElement>(null);
  const loadedUrls = useRef(new Set());

  useEffect(() => {
    const onload = () => {
      setImage(img => {
        loadedUrls.current.add(img.src);
        return { ...img, status: 'loaded' };
      });

    };

    const onerror = () => { setImage(img => ({ ...img, status: 'failed' })) };
    imgEl.current = document.createElement('img');
    imgEl.current.addEventListener('load', onload);
    imgEl.current.addEventListener('error', onerror);

    return function cleanup() {
      if (imgEl.current) {
        imgEl.current.removeEventListener('load', onload);
        imgEl.current.removeEventListener('error', onerror);
      }
    };
  }, []);


  useEffect(() => {
    if (!src || loadedUrls.current.has(src)) {
      // No image, or already loaded.
      setImage({ src, status: 'loaded' });
    }
    else {
      // New image to load.
      if (imgEl.current) {
        imgEl.current.src = src;
      }
      setImage({ src, status: 'loading' });
    }
  }, [src]);

  return {
    src: image.src,
    isLoading: image.status === 'loading',
    isLoaded: image.status === 'loaded',
    hasFailed: image.status === 'failed'
  };
};

export default useImage;