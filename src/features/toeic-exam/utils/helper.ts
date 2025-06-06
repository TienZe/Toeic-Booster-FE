import { TOEIC_PARTS } from "../../admin/new_exams/types/examType";

export const toHHMMSS = (secs: number) => {
  //const sec_num = parseInt(secs, 10);
  const sec_num = secs;
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export const countTotalQuestions = (partSelect: string[]) => {
  let totalQuestions = 0;
  for (const part of partSelect) {
    switch (part) {
      case "part1":
        totalQuestions += TOEIC_PARTS.Part1.questionCount;
        break;
      case "part2":
        totalQuestions += TOEIC_PARTS.Part2.questionCount;
        break;
      case "part3":
        totalQuestions += TOEIC_PARTS.Part3.questionCount;
        break;
      case "part4":
        totalQuestions += TOEIC_PARTS.Part4.questionCount;
        break;
      case "part5":
        totalQuestions += TOEIC_PARTS.Part5.questionCount;
        break;
      case "part6":
        totalQuestions += TOEIC_PARTS.Part6.questionCount;
        break;
      case "part7":
        totalQuestions += TOEIC_PARTS.Part7.questionCount;
        break;
      default:
        break;
    }
  }
  return totalQuestions;
};

export const sortPartArray = (partArray: string[]) => {
  return partArray.slice().sort((a, b) => {
    const numA = parseInt(a.replace("part", ""), 10);
    const numB = parseInt(b.replace("part", ""), 10);

    return numA - numB;
  });
};

export const parseHtmlToText = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};
