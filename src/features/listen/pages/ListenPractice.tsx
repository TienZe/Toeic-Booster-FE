import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import Content from "../../../components/layout/Content";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import DoneIcon from "@mui/icons-material/Done";
import { getListenLessonById } from "../api/ListenLessonApi";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const ListenPractice: React.FC = () => {
  const { lessonId } = useParams();
  const [currIndex, setCurrIndex] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState([""]);
  const [mode, setMode] = useState<"practice" | "overview">("practice");
  const [answerState, setAnswerState] = useState<
    { state: "success" | "error" | "info"; checked: boolean }[]
  >([
    {
      state: "info",
      checked: false,
    },
  ]);
  type SentenceCheck = { sentence: string; state: "success" | "error" };

  const [sentenceCheck, setSentenceCheck] = useState<SentenceCheck[][]>([[]]);
  const { data: lesson, isLoading } = useQuery({
    queryKey: ["listenLesson", { id: lessonId }],
    queryFn: () => getListenLessonById(lessonId!),
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
  });

  const handleNextSentence = () => {
    setShowAnswer(false);
    setCurrIndex((prev) => {
      if (prev < (lesson?.listenSentences.length ?? 0)) {
        if (answer.length < prev + 1) {
          setAnswer([...answer, ""]);
          setAnswerState((prev) => {
            return [...prev, { state: "info", checked: false }];
          });
          setSentenceCheck((pre) => {
            const newValue = [...pre, []];
            return newValue;
          });
        }
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevSentence = () => {
    setShowAnswer(false);
    setCurrIndex((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAnswer((prev) => {
      const newAnswer = [...prev];
      newAnswer[currIndex - 1] = value;
      return newAnswer;
    });
  };

  const handleCheckAnswer = () => {
    let userAnswer = answer[currIndex - 1].trim().split(" ");
    userAnswer = userAnswer
      .filter((item) => item !== "")
      .map((word) => {
        let temp = "";
        for (const char of word) {
          if (char != "." && char != "," && char != "!" && char != "?") {
            temp += char;
          }
        }
        return temp;
      });
    const correctAnswer = lesson?.listenSentences[currIndex - 1]
      ?.sentence!.toLocaleLowerCase()
      .split(" ");
    console.log(sentenceCheck, correctAnswer);
    if (!correctAnswer) return;
    let index = 0;
    let rs = true;
    const currentSentenceCheck = [...sentenceCheck];
    currentSentenceCheck[currIndex - 1] = [];
    for (let i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i].toLocaleLowerCase() === correctAnswer[index]) {
        currentSentenceCheck[currIndex - 1].push({
          sentence: userAnswer[i],
          state: "success",
        });
        index++;
      } else {
        if (
          correctAnswer[index].length < userAnswer[i].length ||
          correctAnswer[index].length - 1 > userAnswer[i].length
        ) {
          rs = false;
          currentSentenceCheck[currIndex - 1].push({
            sentence: userAnswer[i],
            state: "error",
          });
          continue;
        }
        let currCheck = true;
        for (let j = 0; j < correctAnswer[index].length; j++) {
          if (
            (!userAnswer[i].toLocaleLowerCase()[j] &&
              correctAnswer[index][j] != "." &&
              correctAnswer[index][j] != "," &&
              correctAnswer[index][j] != "!" &&
              correctAnswer[index][j] != "?") ||
            (userAnswer[i].toLocaleLowerCase()[j] &&
              userAnswer[i].toLocaleLowerCase()[j] != correctAnswer[index][j])
          ) {
            rs = false;
            currCheck = false;
          }
        }
        if (currCheck) {
          currentSentenceCheck[currIndex - 1].push({
            sentence: userAnswer[i],
            state: "success",
          });
        } else {
          currentSentenceCheck[currIndex - 1].push({
            sentence: userAnswer[i],
            state: "error",
          });
        }
        index++;
      }
    }
    setSentenceCheck(currentSentenceCheck);
    if (userAnswer.length != correctAnswer.length) {
      rs = false;
    }
    if (rs) {
      setAnswerState((prev) => {
        const newAnswerState = [...prev];
        newAnswerState[currIndex - 1] = { state: "success", checked: true };
        return newAnswerState;
      });
    } else {
      setAnswerState((prev) => {
        const newAnswerState = [...prev];
        newAnswerState[currIndex - 1] = { state: "error", checked: true };
        return newAnswerState;
      });
    }
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNavigateSentence = (index: number) => {
    setShowAnswer(false);
    const tempAnstate = [...answerState];
    const tempAnswer = [...answer];
    const tempSentenceCheck = [...sentenceCheck];
    while (tempAnstate.length < index + 1) {
      tempAnstate.push({ state: "info", checked: false });
      tempAnswer.push("");
      tempSentenceCheck.push([]);
    }
    setAnswerState(tempAnstate);
    setAnswer(tempAnswer);
    setSentenceCheck(tempSentenceCheck);
    setCurrIndex(index + 1);
  };

  if (!lessonId) {
    return <Navigate to="/listen" />;
  }

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open={isLoading} />
      ) : (
        <Content
          sx={{ display: "flex", flexDirection: "column" }}
          withoutFooter={true}
        >
          <Box
            sx={{
              maxWidth: "962px",
              minHeight: "100% ",
              width: "100%",
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: "80px",
            }}
          >
            {mode === "practice" ? (
              <Card
                sx={{
                  width: "80%",
                  marginLeft: "80px",
                  height: "70%",
                  minHeight: "480px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                  padding: "30px 20px",
                }}
              >
                <Breadcrumbs
                  sx={{
                    marginLeft: "20px",
                    fontSize: "12px",
                    marginBottom: "10px",
                    color: "black",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="breadcrumbs"
                >
                  {/* <LinkIcon /> */}
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    color="black"
                    to="/listen"
                  >
                    Listen Practice
                  </Link>

                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    color="black"
                    to="/listen"
                  >
                    {lesson?.listenGroup.name}
                  </Link>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/listen/${lesson?.id}`}
                  >
                    {lesson?.name}
                  </Link>
                </Breadcrumbs>
                <Typography
                  sx={{ marginBottom: "40px", marginLeft: "20px" }}
                  variant="h4"
                >
                  {lesson?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                    marginBottom: "20px",
                    marginLeft: "20px",
                  }}
                >
                  <Typography variant="h5">
                    Sentence: {currIndex} / {lesson?.listenSentences.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                    marginBottom: "20px",
                    marginLeft: "20px",
                  }}
                >
                  <audio key={currIndex} controls>
                    <source
                      src={lesson?.listenSentences[currIndex - 1]?.audio || ""}
                    />
                    Your browser does not support the audio element.
                  </audio>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                    marginLeft: "2px",
                  }}
                >
                  <TextField
                    label="Type your answer"
                    sx={{ m: 1, width: "100%" }}
                    // color="secondary"
                    // color="success"
                    color={answerState[currIndex - 1].state}
                    focused
                    rows={2}
                    multiline
                    value={answer[currIndex - 1]}
                    onChange={handleChangeInput}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                    marginLeft: "20px",
                    marginBottom: "20px",
                    minHeight: "60px",
                    flexWrap: "wrap",
                  }}
                >
                  <TipsAndUpdatesIcon
                    sx={{ width: "18px", height: "18px" }}
                  ></TipsAndUpdatesIcon>
                  {showAnswer ? (
                    <>
                      <Typography variant="h6">Answer:</Typography>
                      <Typography variant="h6">
                        {lesson?.listenSentences[currIndex - 1]?.sentence}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">Check:</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "4px",
                          flexWrap: "wrap",
                        }}
                      >
                        {answerState[currIndex - 1].checked &&
                          sentenceCheck[currIndex - 1].map(
                            (sentence, index) => {
                              return (
                                <Typography
                                  key={index}
                                  color={sentence.state}
                                  variant="h6"
                                >
                                  {sentence.sentence}
                                </Typography>
                              );
                            },
                          )}
                      </Box>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ background: "#478ECC" }}
                    startIcon={<NavigateBeforeIcon />}
                    onClick={handlePrevSentence}
                    disabled={currIndex == 1}
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={handleCheckAnswer}
                    variant="outlined"
                    sx={{ color: "#203a90", borderColor: "#203a90" }}
                  >
                    Check
                  </Button>
                  <Button onClick={handleShowAnswer} variant="contained">
                    Answer
                  </Button>
                  {currIndex >= (lesson?.listenSentences.length ?? 0) ? (
                    <Button
                      variant="contained"
                      sx={{ background: "#478ECC" }}
                      endIcon={<DoneIcon />}
                      onClick={() => setMode("overview")}
                    >
                      Finish
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ background: "#478ECC" }}
                      endIcon={<NavigateNextIcon />}
                      onClick={handleNextSentence}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Card>
            ) : (
              <Card
                sx={{
                  width: "80%",
                  marginLeft: "80px",
                  height: "70%",
                  minHeight: "480px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                  padding: "30px 20px",
                }}
              >
                <Breadcrumbs
                  sx={{
                    marginLeft: "20px",
                    fontSize: "12px",
                    marginBottom: "10px",
                    color: "black",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="breadcrumbs"
                >
                  {/* <LinkIcon /> */}
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    color="black"
                    to="/listen"
                  >
                    Listen Practice
                  </Link>

                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    color="black"
                    to="/listen"
                  >
                    {lesson?.listenGroup.name}
                  </Link>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/listen/${lesson?.id}`}
                  >
                    {lesson?.name}
                  </Link>
                </Breadcrumbs>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <Typography
                    sx={{ marginBottom: "20px" }}
                    variant="h4"
                    align="center"
                  >
                    You have completed this exercise, good job!
                  </Typography>
                  <CheckCircleIcon
                    sx={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      color: "#198754",
                    }}
                  ></CheckCircleIcon>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                      alignItems: "center",
                      marginLeft: "20px",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    {lesson?.prev && (
                      <Button
                        variant="outlined"
                        sx={{
                          background: "white",
                          color: "#6C757D",
                          borderColor: "#6C757D",
                          "&:hover": {
                            opacity: "0.8",
                          },
                        }}
                        onClick={() => {
                          if (lesson.prev) {
                            window.location.href = `/listen/${lesson.prev}`;
                          }
                        }}
                      >
                        Previous exercise
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      sx={{
                        background: "white",
                        color: "#6C757D",
                        borderColor: "#6C757D",
                        "&:hover": {
                          opacity: "0.8",
                        },
                      }}
                      onClick={() => window.location.reload()}
                    >
                      Repeat this exercise
                    </Button>
                    {lesson?.next && (
                      <Button
                        variant="contained"
                        sx={{
                          background: "#0D6EFD",
                          color: "white",
                          "&:hover": {
                            opacity: "0.8",
                          },
                        }}
                        onClick={() => {
                          if (lesson.next) {
                            window.location.href = `/listen/${lesson.next}`;
                          }
                        }}
                      >
                        Next exercise
                      </Button>
                    )}
                  </Box>
                </Box>
              </Card>
            )}
            <Box
              sx={{
                height: "70%",
                minHeight: "480px",
                width: "200px",
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Box
                sx={{
                  width: "200px",
                  minHeight: "200px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                  padding: "30px 20px",
                }}
              >
                <Typography sx={{ marginBottom: "20px" }} variant="h6">
                  Sentences:
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                  }}
                >
                  {lesson?.listenSentences.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",

                        borderRadius: "4px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor:
                          currIndex === index + 1
                            ? "#203A90"
                            : !answerState[index]
                              ? "#ccc"
                              : answerState[index].state === "success"
                                ? "#66bb6a"
                                : answerState[index].state === "error"
                                  ? "#f44336"
                                  : "#ccc",

                        "&:hover": {
                          opacity: "0.8",
                        },
                      }}
                      onClick={() => handleNavigateSentence(index)}
                    >
                      <Typography
                        sx={{
                          color: "white",
                        }}
                        variant="body2"
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Content>
      )}
    </>
  );
};

export default ListenPractice;
