import createCacheAsyncFunction from "@/utils/cache/createCacheAsyncFunction";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

/**
 * Firebase Storage debug identifier
 */
const FIREBASE_IMGAGE = "FirebaseImage";

/**
 * Format log string with firebase image identifier.
 */
const debugStringFormatter = createDebugStringFormatter(FIREBASE_IMGAGE);

/**
 * Resolve image path to download url.
 *
 * @param {string} path - The path of the image.
 * @returns {Promise<string>} A promise that resolves with the image url.
 */
export const resolveImagePathAsync = createCacheAsyncFunction(
  async (path: string): Promise<string> => {
    const storageRef = ref(storage, path);

    try {
      const url = await getDownloadURL(storageRef);
      return Promise.resolve(url);
    } catch (error) {
      console.log(debugStringFormatter("Failed to get image url"), error);
      return Promise.resolve("");
    }
  }
);

export async function uploadImage(
  file: File,
  ...path: string[]
): Promise<string> {
  const storageRef = ref(storage, path.join("/"));

  let imagePath = "";

  uploadBytes(storageRef, file)
    .then((snapshot) => {
      console.log(debugStringFormatter("Uploaded a blob or file!"), snapshot);
      imagePath = snapshot.ref.fullPath;
    })
    .catch((e) => {
      console.log(debugStringFormatter("Failed to upload a blob or file!"), e);
    });

  if (path) {
    return Promise.resolve(imagePath);
  } else {
    return Promise.reject(imagePath);
  }
}
