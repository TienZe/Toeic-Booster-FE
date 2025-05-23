import { Box, Button } from "@mui/material";
import TimerCountdown, { TimerCountdownRef } from "./TimerCountdown";
import ListQuestion from "./ListQuestions";
import { partData } from "../../../admin/new_exams/types/examType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PracticeRequest } from "../../types/PracticeRequest";
import { useMutation } from "@tanstack/react-query";
import { postPractice } from "../../api/api";
import { toast } from "react-toastify";
import { countTotalQuestions } from "../../utils/helper";
import { resetAnswers } from "../../../../stores/userAnswer";
import { clearSelectedParts } from "../../../../stores/selectedPartsSlice";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import ConfirmDrawer from "./ConfirmDrawer";
import { Part, PartData } from "../../../../types/ToeicExam";
import { PARTS as ALL_PARTS } from "../../../../utils/toeicExamHelper";

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
  const [openComfirm, setOpenConfirm] = useState<boolean>(false);
  const dispatch = useDispatch();
  const limitTime = useSelector(
    (state: RootState) => state.selectedParts.limitTime,
  );
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswers.userAnswers,
  );

  // const selectedPartsQuery = isFullTest ? ALL_PARTS : parts;
  // const TOTAL_QUESTIONS = countTotalQuestions(selectedPartsQuery);
  const TOTAL_QUESTIONS = 123;
  const selectedParts = Object.keys(partDataChosen);
  const isFullTest = selectedParts.length === ALL_PARTS.length;

  const timerCountDownRef = useRef<TimerCountdownRef>(null);

  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const selectedPartsClone =
  //     mode === "review" ? [...ALL_PARTS] : [...selectedPartsQuery];
  // }, [partData]);

  const mutation = useMutation({
    mutationFn: async (data: PracticeRequest) => {
      const responseData = await postPractice(data);
      return responseData;
    },
    onSuccess: (responseData) => {
      console.log("Post successfull, reponseData", responseData);
      navigate(`/exams/result/${responseData.id}`, {
        state: { responseData, TOTAL_QUESTIONS },
      });
      dispatch(resetAnswers());
      dispatch(clearSelectedParts());
      // queryClient.setQueryData(
      //   responseData,
      // );
      setOpenConfirm(false);
      toast.success("Submit succesfully");
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

  const handleSubmit = useCallback(() => {
    const remainingTime = timerCountDownRef.current?.submit() || 0;
    const implementTime = Math.abs(+limitTime - remainingTime);
    const practiceRequest: PracticeRequest = {
      userId: "4d6fffbc-72e7-4895-a0bb-eba4b17f0615",
      testId: examId || "",
      isFullTest: isFullTest,
      time: implementTime,
      userAnswer: userAnswers,
    };

    mutation.mutate(practiceRequest);
  }, [limitTime, examId, userAnswers]);
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
                  handleSubmit={handleSubmit}
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
                    color: "var(--color-primary-main)",
                    border: "1px solid var(--color-primary-main)",
                    background: "white",
                    ":hover": {
                      color: "white",
                      background: "var(--color-primary-main)",
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
        openConfirm={openComfirm}
        setOpenConfirm={setOpenConfirm}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SubMitBox;
