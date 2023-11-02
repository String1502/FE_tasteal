import bannerPath from "@/assets/banner.jpg";
import { useEffect, useState } from "react";
import { resolveImagePathAsync } from "../firebase/image";

export default function useFirebaseImage(path: string | undefined) {
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    if (!path || path === "") {
      setImage(bannerPath);
      return;
    }

    resolveImagePathAsync(path)
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        setImage(bannerPath);
      });
  }, [path]);

  return image;
}
