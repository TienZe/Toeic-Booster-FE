import axiosClient from "../../axios";
import ApiResponse from "../../types/ApiResponse";
import PaginatedData from "../../types/PaginatedData";
import { TranslationResult } from "../../types/translate";
import { WordItem, WordResult } from "../../types/voca-search";
import VocabularyModel, { VocabularyWordClassAbbr } from "../../types/VocabularyModel";
import { GetSystemWordsRequest } from "./types/GetSystemWordsRequest";

const VOCA_SEARCH_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function searchWord(word: string) {
  const response = await axiosClient.get<WordResult[]>(VOCA_SEARCH_API + word);

  const wordResult = response.data[0];

  let phonetic = wordResult.phonetic;

  const nonEmptyPhoneticPair = wordResult.phonetics.find(
    (phoneticPair) => phoneticPair.audio && phoneticPair.text,
  );

  let phoneticAudio = "";

  if (nonEmptyPhoneticPair) {
    phonetic = nonEmptyPhoneticPair.text;
    phoneticAudio = nonEmptyPhoneticPair.audio;
  }

  const wordItems: WordItem[] = [];

  for (const meaning of wordResult.meanings) {
    const partOfSpeech = shortenPartOfSpeech(meaning.partOfSpeech);

    for (const definition of meaning.definitions) {
      wordItems.push({
        word: wordResult.word,
        pronunciation: phonetic,
        pronunciationAudio: phoneticAudio,
        partOfSpeech,
        definition: definition.definition,
        example: definition.example,
      });
    }
  }

  // Translate the definition to get the meaning
  // const definitions = wordItems.map((item) => item.definition);
  // const meanings = await translateListOfText(definitions);

  // wordItems.forEach((item, index) => {
  //   item.meaning = meanings[index].text;
  // });

  return wordItems;
}

export async function translateListOfText(listOfParagraph: string[]) {
  const response = await axiosClient.post<TranslationResult[]>(
    "translate/listText",
    {
      from: "en",
      to: "vi",
      listText: listOfParagraph,
    },
  );

  return response.data;
}

function shortenPartOfSpeech(partOfSpeech: string) {
  switch (partOfSpeech) {
    case "noun":
      return VocabularyWordClassAbbr.NOUN;
    case "verb":
      return VocabularyWordClassAbbr.VERB;
    case "adjective":
      return VocabularyWordClassAbbr.ADJECTIVE;
    case "adverb":
      return VocabularyWordClassAbbr.ADVERB;
    case "pronoun":
      return VocabularyWordClassAbbr.PRONOUN;
    case "preposition":
      return VocabularyWordClassAbbr.PREPOSITION;
    case "conjunction":
      return VocabularyWordClassAbbr.CONJUNCTION;
    case "interjection":
      return VocabularyWordClassAbbr.INTERJECTION;
  }

  return partOfSpeech;
}


export async function getSystemWords(request: GetSystemWordsRequest) {
  const response = await axiosClient.get<ApiResponse<PaginatedData<VocabularyModel>>>(
    "vocabularies",
    {
      params: request,
    },
  );

  return response.data.data;
}