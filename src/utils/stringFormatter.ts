export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function briefString(str: string, maxCharacters: number = 50) {
  if (str.length <= maxCharacters) {
    return str;
  }

  const strSlice = str.slice(0, maxCharacters);

  if (strSlice[maxCharacters] === " ") {
    return strSlice + " ...";
  }

  // Remove the last word
  const words = strSlice.split(" ");
  words.pop();
  return words.join(" ") + " ...";
}
