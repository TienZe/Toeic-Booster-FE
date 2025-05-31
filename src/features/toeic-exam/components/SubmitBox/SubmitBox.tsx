import { Box, Button } from "@mui/material";
import TimerCountdown, { TimerCountdownRef } from "./TimerCountdown";
import ListQuestion from "./ListQuestions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { useCallback, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SaveToeicTestAttemptRequest } from "../../types/PracticeRequest";
import { useMutation } from "@tanstack/react-query";
import { postToeicTestAttempt } from "../../api/api";
import { toast } from "react-toastify";
import { resetAnswers } from "../../../../stores/userAnswer";
import { clearSelectedParts } from "../../../../stores/selectedPartsSlice";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import ConfirmDrawer from "./ConfirmDrawer";
import { Part, PartData } from "../../../../types/ToeicExam";

interface PartDataProps {
  partDataChosen: PartData;
  setCurrentPart: (part: Part) => void;
  mode?: string;
}
const SubMitBox: React.FC<PartDataProps> = ({
  partDataChosen,
  setCurrentPart,
  mode,
}) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const limitTime = useSelector(
    (state: RootState) => state.selectedParts.limitTime,
  );
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswers.userAnswers,
  );

  const selectedParts = Object.keys(partDataChosen);

  const timerCountDownRef = useRef<TimerCountdownRef>(null);

  const routeParams = useParams<{ examId: string }>();
  const examId = Number(routeParams.examId);

  const mutation = useMutation({
    mutationFn: postToeicTestAttempt,
    onSuccess: (createdAttempt) => {
      // Reset redux state
      dispatch(resetAnswers());
      dispatch(clearSelectedParts());

      setOpenConfirm(false);
      toast.success("Submit successfully");

      navigate(`/exams/result/${createdAttempt.id}`);
    },
    onError: (error) => {
      console.error("Post failed:", error);
      toast.error("Failed to submit");
    },
  });

  const handleButtonSubmit = () => {
    if (userAnswers.length === 0) {
      toast.error("You need to answer at least one question");
      return;
    }
    setOpenConfirm(true);
  };

  const handleSubmitExam = useCallback(() => {
    const remainingTime = timerCountDownRef.current?.submit() || 0;
    const implementTime = Math.abs(+limitTime - remainingTime);
    const practiceRequest: SaveToeicTestAttemptRequest = {
      userId: 1,
      toeicTestId: examId,
      selectedParts: selectedParts.join(","),
      takenTime: implementTime,
      userAnswers: userAnswers.map((answer) => ({
        questionId: answer.idQuestion,
        choice: answer.answer,
      })),
    };

    console.log("practiceRequest", practiceRequest);

    mutation.mutate(practiceRequest);
  }, [limitTime, examId, userAnswers]);

  if (!examId && mode !== "review") {
    return <Navigate to="/exams" />;
  }

  return (
    <>
      {mutation.isPending ? (
        <CustomBackdrop open />
      ) : (
        <>
          {!mode && (
            <>
              <Box
                sx={{
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                <TimerCountdown
                  duration={limitTime}
                  timerRef={timerCountDownRef}
                  handleSubmit={handleSubmitExam}
                />
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Button
                  sx={{
                    padding: "8px 50px",
                    borderRadius: "5px",
                    color: "primary.main",
                    border: "1px solid",
                    borderColor: "primary.main",
                    background: "white",
                    ":hover": {
                      color: "white",
                      backgroundColor: "primary.main",
                    },
                  }}
                  onClick={handleButtonSubmit}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}

          <Box>
            <ListQuestion
              partDataChosen={partDataChosen}
              setCurrentPart={setCurrentPart}
            />
          </Box>
        </>
      )}
      <ConfirmDrawer
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        handleSubmit={handleSubmitExam}
      />
    </>
  );
};

export default SubMitBox;
