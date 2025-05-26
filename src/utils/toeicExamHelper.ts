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

export function splitQuestionGroupsToParts(
  allQuestionGroups: QuestionGroup[],
  onlyParts: Part[] = PARTS,
) {
  const parts = PARTS.filter((part) => onlyParts.includes(part)).map((part) => {
    const questionGroups = allQuestionGroups.filter(
      (group) => group.part === part,
    );

    if (questionGroups.length > 0) {
      return {
        [part]: questionGroups,
      };
    }

    return {};
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

export function getDisplayedPart(part: Part) {
  return "Part " + part.replace("part", "");
}
