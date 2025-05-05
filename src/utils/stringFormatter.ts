export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function briefString(str: string, maxWords: number = 25) {
  const words = str.split(" ");
  if (words.length <= maxWords) {
    return str;
  }
  return words.slice(0, maxWords).join(" ") + "...";
}