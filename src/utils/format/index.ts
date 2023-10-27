import unidecode from "unidecode";

export function removeDiacritics(text: string): string {
  return unidecode(text);
}
