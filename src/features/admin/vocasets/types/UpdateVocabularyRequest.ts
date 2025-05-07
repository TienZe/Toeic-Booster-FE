import CreateVocabularyRequest from "./CreateVocabularyRequest";

export default interface UpdateVocabularyRequest extends CreateVocabularyRequest {
  id: number|string;
}
