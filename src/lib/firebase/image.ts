import createCacheAsyncFunction from "@/utils/cache/createCacheAsyncFunction";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import { getDownloadURL, ref } from "firebase/storage";
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
