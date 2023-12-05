import { useEffect, useState } from 'react';
import { resolveImagePathAsync } from '../firebase/image';

const staticPath =
    'https://www.sidechef.com/static/images/990a0a055accb65d4d4f.jpg';

export default function useFirebaseImage(path: string | undefined) {
    const [image, setImage] = useState<string | undefined>();
    useEffect(() => {
        if (!path || path === '') {
            setImage(staticPath);
            return;
        }

        resolveImagePathAsync(path)
            .then((url) => {
                if (url === '') {
                    setImage(staticPath);
                } else {
                    url = url.replace(
                        'https://firebasestorage.googleapis.com',
                        'https://ik.imagekit.io/5pqzgqjalh/tr:q-1'
                    );
                    setImage(url);
                }
            })
            .catch((error) => {
                setImage(path);
            });
    }, [path]);

    return image;
}
