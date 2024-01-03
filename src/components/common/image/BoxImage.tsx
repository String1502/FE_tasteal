import { resolveImagePathAsync } from '@/lib/firebase/image';
import { Box, BoxProps, Skeleton } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';

export const defaultPathImage =
  'https://www.sidechef.com/static/images/990a0a055accb65d4d4f.jpg';

export type ImageQuality =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 100;

function BoxImage({
  ...props
}: BoxProps & { src: string; alt?: string; quality?: ImageQuality }) {
  const [image, setImage] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!props.src || props.src === '') {
      setImage(defaultPathImage);
      setLoading(false);
      return;
    }
    if (props.src.includes('https')) {
      setImage(props.src);
      setLoading(false);
      return;
    }

    resolveImagePathAsync(props.src)
      .then((url) => {
        if (url === '') {
          setImage(defaultPathImage);
          setLoading(false);
        } else {
          // Đổi quality
          url = url.replace(
            'https://firebasestorage.googleapis.com',
            `https://ik.imagekit.io/5pqzgqjalh/tr:q-${props.quality ?? 80}`
          );
          setImage(url);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setImage(props.src);
        setLoading(false);
      });
  }, [props.src]);

  return (
    <>
      {loading ||
        (!image && (
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              ...props.sx,
            }}
          />
        ))}
      {!loading && image && (
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                ...props.sx,
              }}
            />
          }
        >
          <Box
            loading="lazy"
            component={'img'}
            {...props}
            src={image ?? defaultPathImage}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'relative',
              ...props.sx,
            }}
          />
        </Suspense>
      )}
    </>
  );
}

export default BoxImage;
