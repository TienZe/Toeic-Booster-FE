export default interface UpdateVocaSetRequest {
  id: string;
  name?: string;
  level?: string;
  thumbnail?: string;
  target: string;
  description: string;
}
