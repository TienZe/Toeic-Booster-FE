import VocabularyModel, {
  VocabularyWordClass,
  VocabularyWordClassAbbr,
} from "../types/VocabularyModel";
import VocaDefaultThumbnail from "../assets/images/voca/default-voca-image.jpg";
import { LessonVocabulary } from "../types/LessonVocabulary";

export function getPlaceholderImage(width: number, height: number) {
  return `https://placehold.co/${width}x${height}`;
}

export function file2Base64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function fileList2Base64(fileList: FileList): Promise<string> {
  return file2Base64(fileList[0]);
}

export function vocaWordClassAbrr2FullName(abbr: string) {
  switch (abbr) {
    case VocabularyWordClassAbbr.NOUN:
      return VocabularyWordClass.NOUN;
    case VocabularyWordClassAbbr.VERB:
      return VocabularyWordClass.VERB;
    case VocabularyWordClassAbbr.ADJECTIVE:
      return VocabularyWordClass.ADJECTIVE;
    case VocabularyWordClassAbbr.ADVERB:
      return VocabularyWordClass.ADVERB;
    case VocabularyWordClassAbbr.PRONOUN:
      return VocabularyWordClass.PRONOUN;
    case VocabularyWordClassAbbr.PREPOSITION:
      return VocabularyWordClass.PREPOSITION;
    case VocabularyWordClassAbbr.CONJUNCTION:
      return VocabularyWordClass.CONJUNCTION;
    case VocabularyWordClassAbbr.INTERJECTION:
      return VocabularyWordClass.INTERJECTION;
    default:
      return abbr;
  }
}

export function vocaWordClassFullName2Abbr(wordClassFullName: string) {
  switch (wordClassFullName) {
    case VocabularyWordClass.NOUN:
      return VocabularyWordClassAbbr.NOUN;
    case VocabularyWordClass.VERB:
      return VocabularyWordClassAbbr.VERB;
    case VocabularyWordClass.ADJECTIVE:
      return VocabularyWordClassAbbr.ADJECTIVE;
    case VocabularyWordClass.ADVERB:
      return VocabularyWordClassAbbr.ADVERB;
    case VocabularyWordClass.PRONOUN:
      return VocabularyWordClassAbbr.PRONOUN;
    case VocabularyWordClass.PREPOSITION:
      return VocabularyWordClassAbbr.PREPOSITION;
    case VocabularyWordClass.CONJUNCTION:
      return VocabularyWordClassAbbr.CONJUNCTION;
    case VocabularyWordClass.INTERJECTION:
      return VocabularyWordClassAbbr.INTERJECTION;
    default:
      return wordClassFullName;
  }
}

export function isValidVocaWordClass(wordClass: string) {
  return (
    Object.values(VocabularyWordClass).includes(
      wordClass as VocabularyWordClass,
    ) ||
    Object.values(VocabularyWordClass).includes(
      vocaWordClassAbrr2FullName(wordClass) as VocabularyWordClass,
    )
  );
}

export function hasFileData(data: unknown) {
  return data instanceof FileList && data.length > 0;
}

export function checkFileTypeIfExistValue(
  fileList: FileList | undefined,
  fileType: string,
) {
  if (fileList && fileList.length > 0) {
    const file = fileList[0];
    return file.type.includes(fileType);
  }

  return true;
}

export function mustBeImageIfExistValue(fileList?: FileList) {
  return checkFileTypeIfExistValue(fileList, "image");
}

export function mustBeAudioIfExistValue(fileList?: FileList) {
  return checkFileTypeIfExistValue(fileList, "audio");
}

export function shuffleArray<T>(array: T[]): T[] {
  const cloneArr = [...array];
  for (let i = cloneArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
    [cloneArr[i], cloneArr[j]] = [cloneArr[j], cloneArr[i]]; // Swap elements
  }
  return cloneArr;
}

export function secondToMinuteSecondFormat(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function getPhoneValidator(errorMessage?: string) {
  return {
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: errorMessage || "Phone number must be 10 or 11 digits",
    },
  };
}

export function getBingImageByKeyword(keyword: string) {
  return `https://th.bing.com/th?q=${keyword}&c=7&rs=1&p=0&o=5&dpr=2&pid=1.7&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1`;
}

export function getWordThumbnail(voca: VocabularyModel | LessonVocabulary) {
  return voca.thumbnail || getBingImageByKeyword(voca.word);
}

export function strEqualIgnoreCase(str1: string, str2: string) {
  return str1.toLowerCase() === str2.toLowerCase();
}
