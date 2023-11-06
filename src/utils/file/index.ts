/**
 * Returns the file extension from a given filename.
 * @param {string} filename - The name of the file.
 * @returns {string} - The file extension.
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "";
}
