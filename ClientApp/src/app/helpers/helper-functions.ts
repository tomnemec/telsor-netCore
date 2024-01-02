export function removeDiacritics(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
export function removeSpaces(str: string) {
  return str.replace(/\s/g, '');
}
