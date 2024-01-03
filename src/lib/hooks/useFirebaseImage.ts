import { useEffect, useState } from 'react';
import { resolveImagePathAsync } from '../firebase/image';

const staticPath =
  'https://www.sidechef.com/static/images/990a0a055accb65d4d4f.jpg';

export default function useFirebaseImage(
  path: string | undefined,
  quality: number = 100,
  fallback: boolean = true
) {
  const [image, setImage] = useState<string | undefined>();
  useEffect(() => {
    if (!path || path === '') {
      setImage(fallback ? staticPath : '');
      return;
    }

    resolveImagePathAsync(path)
      .then((url) => {
        if (url === '') {
          setImage(fallback ? staticPath : '');
        } else {
          url = url.replace(
            'https://firebasestorage.googleapis.com',
            `https://ik.imagekit.io/5pqzgqjalh/tr:q-${quality}`
          );
          setImage(url);
        }
      })
      .catch((_error) => {
        setImage(path);
      });
  }, [path]);

  return image;
}
