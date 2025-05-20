import { Part, QuestionGroup } from "../types/ToeicExam";

export const ABCD: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
export const ABC: ("A" | "B" | "C")[] = ["A", "B", "C"];

export const PARTS: Part[] = [
  "part1",
  "part2",
  "part3",
  "part4",
  "part5",
  "part6",
  "part7",
];

export function answerIndexToLabel(index: number) {
  return ["A", "B", "C", "D"][index] as "A" | "B" | "C" | "D";
}

export function splitQuestionGroupsToParts(questionGroups: QuestionGroup[]) {
  const parts = PARTS.map((part) => {
    return {
      [part]: questionGroups.filter((group) => group.part === part),
    };
  });

  // Combine all parts into one object
  const combinedParts = parts.reduce(
    (acc, partObj) => ({
      ...acc,
      ...partObj,
    }),
    {},
  );

  return combinedParts;
}
