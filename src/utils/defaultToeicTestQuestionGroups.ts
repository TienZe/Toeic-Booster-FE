import { TOEIC_PARTS } from "../features/admin/new_exams/types/examType";
import { QuestionGroup } from "../types/ToeicExam";

const DEFAULT_QUESTION_GROUP_PART1: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part1.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part1",
    transcript: "",
    passage: null,
    groupIndex: groupIndex,
    questions: Array.from(
      { length: TOEIC_PARTS.Part1.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          groupIndex * TOEIC_PARTS.Part1.questionPerGroup +
          questionIndex +
          TOEIC_PARTS.Part1.start,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),

    medias: [],
  }),
);

const DEFAULT_QUESTION_GROUP_PART2: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part2.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part2",
    transcript: "",
    passage: null,
    groupIndex: groupIndex + TOEIC_PARTS.Part2.startGroupQuestionIndex,
    questions: Array.from(
      { length: TOEIC_PARTS.Part2.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          groupIndex * TOEIC_PARTS.Part2.questionPerGroup +
          questionIndex +
          TOEIC_PARTS.Part2.start,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),
    medias: [],
  }),
);

const DEFAULT_QUESTION_GROUP_PART3: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part3.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part3",
    transcript: "",
    passage: null,
    groupIndex: groupIndex + TOEIC_PARTS.Part3.startGroupQuestionIndex,
    questions: Array.from(
      { length: TOEIC_PARTS.Part3.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          TOEIC_PARTS.Part3.start +
          groupIndex * TOEIC_PARTS.Part3.questionPerGroup +
          questionIndex,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),
    medias: [],
  }),
);

const DEFAULT_QUESTION_GROUP_PART4: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part4.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part4",
    transcript: "",
    passage: null,
    groupIndex: groupIndex + TOEIC_PARTS.Part4.startGroupQuestionIndex,
    questions: Array.from(
      { length: TOEIC_PARTS.Part4.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          TOEIC_PARTS.Part4.start +
          groupIndex * TOEIC_PARTS.Part4.questionPerGroup +
          questionIndex,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),
    medias: [],
  }),
);

const DEFAULT_QUESTION_GROUP_PART5: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part5.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part5",
    transcript: null,
    passage: null,
    groupIndex: groupIndex + TOEIC_PARTS.Part5.startGroupQuestionIndex,
    questions: Array.from(
      { length: TOEIC_PARTS.Part5.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          TOEIC_PARTS.Part5.start +
          groupIndex * TOEIC_PARTS.Part5.questionPerGroup +
          questionIndex,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),
    medias: [],
  }),
);

const DEFAULT_QUESTION_GROUP_PART6: QuestionGroup[] = Array.from(
  { length: TOEIC_PARTS.Part6.groupQuestion },
  (_, groupIndex) => ({
    id: "",
    part: "part6",
    transcript: null,
    passage: null,
    groupIndex: groupIndex + TOEIC_PARTS.Part6.startGroupQuestionIndex,
    questions: Array.from(
      { length: TOEIC_PARTS.Part6.questionPerGroup },
      (_, questionIndex) => ({
        id: 0,
        question: "",
        explanation: "",
        questionNumber:
          TOEIC_PARTS.Part6.start +
          groupIndex * TOEIC_PARTS.Part6.questionPerGroup +
          questionIndex,
        A: "",
        B: "",
        C: "",
        D: "",
        correctAnswer: "",
      }),
    ),
    medias: [],
  }),
);

function getDefaultPart7QuestionGroup() {
  const data: QuestionGroup[] = [];
  let currentStart = TOEIC_PARTS.Part7.start;
  let groupIndex = TOEIC_PARTS.Part7.startGroupQuestionIndex;

  [
    { groupCount: 4, questionPerGroup: 2 },
    { groupCount: 2, questionPerGroup: 3 },
    { groupCount: 1, questionPerGroup: 4 },
    { groupCount: 1, questionPerGroup: 3 },
    { groupCount: 2, questionPerGroup: 4 },
    { groupCount: 5, questionPerGroup: 5 },
  ].forEach(({ groupCount, questionPerGroup }) => {
    for (let i = 0; i < groupCount; i++) {
      data.push({
        id: "",
        part: "part7",
        transcript: null,
        passage: null,
        groupIndex: groupIndex,
        questions: Array.from(
          { length: questionPerGroup },
          (_, questionIndex) => ({
            id: 0,
            question: "",
            explanation: "",
            questionNumber: currentStart + questionIndex,
            A: "",
            B: "",
            C: "",
            D: "",
            correctAnswer: "",
          }),
        ),
        medias: [],
      });

      groupIndex++;

      currentStart += questionPerGroup;
    }
  });

  return data;
}

export const DEFAULT_QUESTION_GROUP = [
  ...DEFAULT_QUESTION_GROUP_PART1,
  ...DEFAULT_QUESTION_GROUP_PART2,
  ...DEFAULT_QUESTION_GROUP_PART3,
  ...DEFAULT_QUESTION_GROUP_PART4,
  ...DEFAULT_QUESTION_GROUP_PART5,
  ...DEFAULT_QUESTION_GROUP_PART6,
  ...getDefaultPart7QuestionGroup(),
];
