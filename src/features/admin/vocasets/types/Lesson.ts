export default interface Lesson {
  id: string;
  name: string;
  image?: string;
  vocaSetId: string;
}

export const MOCK_LESSONS: Lesson[] = [
  {
    id: "1",
    name: "Job",
    image: "https://www.voca.vn/assets/assets-v2/img/library/architect (4).jpg",
    vocaSetId: "1",
  },
  {
    id: "2",
    name: "Love",
    image:
      "https://www.voca.vn/assets/assets-v2/img/library/sweet%20%284%29.jpg",
    vocaSetId: "1",
  },
  {
    id: "3",
    name: "Place Around Town",
    image:
      "https://www.voca.vn/assets/assets-v2/img/library/gas%20station%20%281%29.jpg",
    vocaSetId: "1",
  },
  {
    id: "4",
    name: "Holidays",
    image:
      "https://www.voca.vn/assets/assets-v2/img/library/reunion%20%282%29.jpg",
    vocaSetId: "1",
  },
];
