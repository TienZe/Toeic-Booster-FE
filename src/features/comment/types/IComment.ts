export interface IComment {
  id: string;
  createdAt: string;
  deletedAt: string;
  content: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  subComment: IComment[];
  test: {
    id: string;
    name: string;
  };
}

export interface ISingleComment {
  idTest?: string;
  questionId?: string;
  idComment: string | null;
  content: string;
}
