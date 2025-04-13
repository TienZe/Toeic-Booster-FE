import {
  groupQuestionData,
  TOEIC_PARTS,
} from "../../admin/new_exams/types/examType";
import { PracticeDetailConverted } from "../types/PracticeDetailConverted";
import {
  groupQuestionDetailResponse,
  PracticeDetailResponse,
} from "../types/PracticeDetailResponse";

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

export const convertPracticeResponse = (data: PracticeDetailResponse) => {
  const result: PracticeDetailConverted = {
    name: data.test.name,
    tags: data.test.tags || [{ id: "1", name: "2024" }],
    partData: [
      { part: "part1", groupQuestionData: [] },
      { part: "part2", groupQuestionData: [] },
      { part: "part3", groupQuestionData: [] },
      { part: "part4", groupQuestionData: [] },
      { part: "part5", groupQuestionData: [] },
      { part: "part6", groupQuestionData: [] },
      { part: "part7", groupQuestionData: [] },
    ],
  };

  data.test.groupQuestions.forEach((group: groupQuestionDetailResponse) => {
    const partIndex = result.partData.findIndex(
      (part) => part.part === group.part.key,
    );

    const audioMedia = group.questionMedia.find(
      (audio) => audio.type === "audio",
    );
    const imageMedia = group.questionMedia.filter(
      (image) => image.type === "image",
    );

    const image = imageMedia.map((img) => {
      return {
        fileUrl: img.url,
        index: img.index,
      };
    });

    const questionData = group.questions.map((questionItem) => {
      return {
        questionId: questionItem.id,
        questionNumber: questionItem.questionNumber,
        question: questionItem.question,
        answer: questionItem.answer,
        correctAnswer: questionItem.correctAnswer,
        userAnswer: {
          id: questionItem?.userAnswer?.[0]?.id ?? null,
          userAnswer: questionItem?.userAnswer?.[0]?.userAnswer ?? null,
          isCorrect: questionItem?.userAnswer?.[0]?.isCorrect ?? null,
        },
        explain: questionItem.explain,
      };
    });

    questionData.sort((a, b) => a.questionNumber - b.questionNumber);
    const groupQuestionData: groupQuestionData = {
      audioUrl: audioMedia?.url ?? null,
      image: image,
      transcript: group.transcript,
      detail: group.detail,
      questionData: questionData,
    };

    result.partData[partIndex].groupQuestionData.push(groupQuestionData);
  });

  return result;
};

export const parseHtmlToText = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};
