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

// Mapping from Toeic part to number of questions
export const PART_TO_QUESTION_RANGE: Record<Part, [number, number]> = {
  part1: [1, 6],
  part2: [7, 31],
  part3: [32, 70],
  part4: [71, 100],
  part5: [101, 130],
  part6: [131, 146],
  part7: [147, 200],
};

/**
 * Given an array of parts (e.g., ["PART_1", "PART_2"]) returns an array of question numbers for those parts.
 * Example: ["PART_1"] => [1,2,3,4,5,6]
 *          ["PART_1", "PART_2"] => [1,2,3,4,5,6,7,8,...,31]
 */
export function getQuestionNumbersFromParts(parts: Part[]): number[] {
  const numbers: number[] = [];

  for (const part of parts) {
    const [start, end] = PART_TO_QUESTION_RANGE[part];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
  }

  return numbers.sort((a, b) => a - b);
}

export function getPartOfQuestionNumber(questionNumber: number): Part {
  for (const part of PARTS) {
    const [start, end] = PART_TO_QUESTION_RANGE[part];
    if (questionNumber >= start && questionNumber <= end) {
      return part;
    }
  }

  return "part1";
}
