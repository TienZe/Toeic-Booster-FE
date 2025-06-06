import { Box, Typography } from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createComment, fetchCommentsByTest } from "../api/CommentApi";
import Comment from "./Comment";
import { ISingleComment } from "../types/IComment";
import CommentForm from "./CommentForm";
import { useState } from "react";

interface CommentsProps {
  examId?: number;
}

export interface IActiveComment {
  id: string;
  type: string;
}
const Comments: React.FC<CommentsProps> = ({ examId }) => {
  //const [BackendComments, setBackendComments] = useState<IComment[]>();
  const [activeComment, setActiveComment] = useState<IActiveComment | null>();

  const {
    data: Comments,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["fetchComments", examId],
    queryFn: () => fetchCommentsByTest(examId || 0),
    enabled: !!examId,
  });

  console.log("examId:", examId); // Kiểm tra examId
  console.log("Comments from API:", Comments); // Log dữ liệu từ API

  const mutation = useMutation({
    mutationFn: async (comment: ISingleComment) => {
      const responseData = await createComment(comment);
      return responseData;
    },
    onSuccess: (responseData) => {
      console.log("create comment", responseData);
      refetch();
      setActiveComment(null);
    },
    onError: (error) => {
      console.error("Post failed:", error);
    },
  });

  const handleAddComment = (
    content: string,
    parentId: string | null = null,
  ) => {
    const newComment = {
      idTest: parentId === null ? (examId ?? "") : undefined,
      idComment: parentId,
      content: content,
    };
    mutation.mutate(newComment as ISingleComment);
  };
  // useEffect(() => {
  //   setBackendComments(Comments);
  //   console.log("comment", BackendComments);
  //   console.log("Data from API:", Comments);
  // }, [Comments]);
  return (
    <>
      <Typography variant="h5" mb={1}>
        Comment
      </Typography>
      <Box>
        {isPending ? (
          "Loading..."
        ) : (
          <>
            <CommentForm submitLabel="Write" handleSubmit={handleAddComment} />
            {Comments && Comments.length > 0 ? (
              Comments.map((BackendComment) => (
                <Comment
                  key={BackendComment.id}
                  comment={BackendComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  addComment={handleAddComment}
                />
              ))
            ) : (
              <Typography>No comments </Typography>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Comments;
