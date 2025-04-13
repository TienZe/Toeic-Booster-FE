export interface VocabRawResponse {
  groupTopic_id: string;
  groupTopic_name: string;
  groupTopic_level: string;
  groupTopic_target: string;
  groupTopic_description: string;
  groupTopic_thumbnail: string;
  groupTopic_createdAt: Date;
  userCount: number;
}

//   export interface LastPracticeDetail {
//     id: string;
//     createdAt: Date;
//     time: number;
//     LCScore: number;
//     RCScore: number;
//     isFullTest: boolean;
//     totalQuestion: number;
//     numCorrect: number;
//     listPart: string[];
//     test: {
//       name: string;
//     };
//   }
