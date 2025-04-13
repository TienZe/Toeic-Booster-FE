// types.ts
export interface AnswerChoice {
    id: number;
    text: string;
  }
  
  export interface Question {
    id: number;
    questionText: string;
    choices: AnswerChoice[];
  }
  

  