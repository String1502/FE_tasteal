import { bannerImage } from "@/assets/exportImage";
import { useEffect, useState } from "react";
import { resolveImagePathAsync } from "../firebase/image";

export default function useFirebaseImage(path: string | undefined) {
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    if (!path || path === "") {
      setImage(bannerImage);
      return;
    }

    resolveImagePathAsync(path)
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        setImage(bannerImage);
      });
  }, [path]);

  return image;
}
