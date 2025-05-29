import { QuestionGroup } from "../../../../types/ToeicExam";
import { ExamResponse, groupQuestionResponse } from "../types/ExamResponse";
import { groupQuestionData } from "../types/examType";
import NewExamRequest from "../types/NewExamRequest";

export const convertExamData = (data: groupQuestionData[]) => {
  const result = data.map((item) => {
    const imagePreview = item.image
      ?.sort((a, b) => a.index - b.index)
      .map((item) => item.fileUrl);
    return {
      ...item,
      //audioPreview: item.audioUrl,
      imagePreview: imagePreview,
    };
  });
  return result;
};

export const convertExamResponse = (data: ExamResponse) => {
  const result: NewExamRequest = {
    name: data.name,
    tags: data.tags || [{ id: "1", name: "2024" }],
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

  data.groupQuestions.forEach((group: groupQuestionResponse) => {
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
        id: img.id,
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
        explain: questionItem.explain,
      };
    });

    questionData.sort((a, b) => a.questionNumber - b.questionNumber);
    const groupQuestionData: groupQuestionData = {
      id: group.id,
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

function validateCommonQuestionGroup(questionGroup: QuestionGroup) {
  const { questions } = questionGroup;

  for (const question of questions) {
    const { correctAnswer } = question;

    if (!correctAnswer) {
      return [
        "correctAnswer",
        "Please check the correct answer for each question",
      ];
    }
  }

  return false;
}

export function isBlankQuestionGroup(questionGroup: QuestionGroup) {
  const { questions, medias } = questionGroup;

  if (questionGroup.passage) {
    return false;
  }

  if (questionGroup.transcript) {
    return false;
  }

  if (medias.length > 0) {
    return false;
  }

  for (const question of questions) {
    if (
      question.question ||
      question.explanation ||
      question.A ||
      question.B ||
      question.C ||
      question.D ||
      question.correctAnswer
    ) {
      return false;
    }
  }

  return true;
}

function validatePart1(questionGroup: QuestionGroup) {
  const commonValidateResult = validateCommonQuestionGroup(questionGroup);
  if (commonValidateResult) {
    return commonValidateResult;
  }

  const { medias } = questionGroup;

  const hasAudio = medias.some((media) => media.fileType === "audio");
  if (!hasAudio) {
    return ["audio", "Please add one audio for this question"];
  }

  const hasImage = medias.some((media) => media.fileType === "image");
  if (!hasImage) {
    return ["image", "Please add one image for this question"];
  }

  return false;
}

function validatePart2(questionGroup: QuestionGroup) {
  const commonValidateResult = validateCommonQuestionGroup(questionGroup);
  if (commonValidateResult) {
    return commonValidateResult;
  }

  const { medias } = questionGroup;

  const hasAudio = medias.some((media) => media.fileType === "audio");
  if (!hasAudio) {
    return ["audio", "Please add one audio for this question"];
  }

  return false;
}

function validatePart3(questionGroup: QuestionGroup) {
  const commonValidateResult = validateCommonQuestionGroup(questionGroup);
  if (commonValidateResult) {
    return commonValidateResult;
  }

  const { medias } = questionGroup;

  const hasAudio = medias.some((media) => media.fileType === "audio");
  if (!hasAudio) {
    return ["audio", "Please add one audio for this question"];
  }

  if (!questionGroup.transcript) {
    return ["transcript", "Please add a transcript for each question"];
  }

  for (const question of questionGroup.questions) {
    if (!question.A || !question.B || !question.C || !question.D) {
      return ["A, B, C, D", "Please add answer A, B, C, D for each question"];
    }

    if (!question.question) {
      return ["question", "Please add a question for each question"];
    }
  }

  return false;
}

function validatePart5(questionGroup: QuestionGroup) {
  const commonValidateResult = validateCommonQuestionGroup(questionGroup);
  if (commonValidateResult) {
    return commonValidateResult;
  }

  for (const question of questionGroup.questions) {
    if (!question.A || !question.B || !question.C || !question.D) {
      return ["A, B, C, D", "Please add answer A, B, C, D for each question"];
    }

    if (!question.question) {
      return ["question", "Please add a question for each question"];
    }
  }

  return false;
}

function validatePart6(questionGroup: QuestionGroup) {
  const commonValidateResult = validateCommonQuestionGroup(questionGroup);
  if (commonValidateResult) {
    return commonValidateResult;
  }

  if (!questionGroup.transcript) {
    return ["transcript", "Please add a transcript for each question"];
  }

  const { medias } = questionGroup;

  const hasImage = medias.some((media) => media.fileType === "image");
  const hasPassage = questionGroup.passage;

  if (!hasImage && !hasPassage) {
    return ["passage", "Please add one image or passage for this question"];
  }

  for (const question of questionGroup.questions) {
    if (!question.A || !question.B || !question.C || !question.D) {
      return ["A, B, C, D", "Please add answer A, B, C, D for each question"];
    }
  }

  return false;
}

function validatePart7(questionGroup: QuestionGroup) {
  const validatePart6Result = validatePart6(questionGroup);
  if (validatePart6Result) {
    return validatePart6Result;
  }

  for (const question of questionGroup.questions) {
    if (!question.question) {
      return ["question", "Please add a question for each question"];
    }
  }

  return false;
}

export function validateQuestionGroup(questionGroup: QuestionGroup) {
  switch (questionGroup.part) {
    case "part1":
      return validatePart1(questionGroup);
    case "part2":
      return validatePart2(questionGroup);
    case "part3":
    case "part4":
      return validatePart3(questionGroup);
    case "part5":
      return validatePart5(questionGroup);
    case "part6":
      return validatePart6(questionGroup);
    case "part7":
      return validatePart7(questionGroup);
    default:
      return false;
  }
}

export function getQuestionGroupChipStyle(
  questionGroup: QuestionGroup,
  currentGroup: number,
) {
  if (currentGroup === questionGroup.groupIndex) {
    // active
    return {
      color: "primary.main",
      backgroundColor: "primary.extraLight",
    };
  }

  if (isBlankQuestionGroup(questionGroup)) {
    // blank
    return {
      color: "inherit",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    };
  }

  const validationResult = validateQuestionGroup(questionGroup);

  if (validationResult) {
    // missing data
    return {
      color: "warning.main",
      backgroundColor: "warning.extraLight",
    };
  }

  // valid
  return {
    color: "success.main",
    backgroundColor: "success.extraLight",
  };
}
