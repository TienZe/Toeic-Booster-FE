export default interface UpdateVocaSetRequest {
  id: string;
  name?: string;
  tags?: number[];
  thumbnail?: string;
  description: string|null;
}
