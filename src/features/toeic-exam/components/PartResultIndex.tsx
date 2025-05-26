import { Box, Button, Container, Grid2, Stack } from "@mui/material";
import Content from "../../../components/layout/Content";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";
import Part6 from "./Part6";
import Part7 from "./Part7";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import { QuestionProvider } from "./QuestionProvider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import NavigationIcon from "@mui/icons-material/Navigation";
import SubMitBox from "./SubmitBox/SubmitBox";
import { splitQuestionGroupsToParts } from "../../../utils/toeicExamHelper";
import { Part } from "../../../types/ToeicExam";
import { getAttemptDetails } from "../api/api";

const PartResultIndex = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const routeParams = useParams<{ attemptId: string }>();
  const attemptId = Number(routeParams.attemptId);

  const { isLoading: isLoadingAttemptDetails, data: attemptDetails } = useQuery(
    {
      queryKey: ["attemptDetails", { attemptId: attemptId }],
      queryFn: () => getAttemptDetails(attemptId),
      enabled: !!attemptId,
    },
  );

  console.log("attemptDetails", attemptDetails);

  const selectedParts = attemptDetails?.selectedParts || [];

  const part2QuestionGroups = useMemo(() => {
    return splitQuestionGroupsToParts(
      attemptDetails?.toeicTest?.questionGroups || [],
    );
  }, [attemptDetails?.toeicTest?.questionGroups]); // object mapping chosen parts to its question groups

  const handleNext = () => setCurrentPartIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentPartIndex((prev) => prev - 1);

  const renderPart = () => {
    const currentPart = selectedParts[currentPartIndex];

    switch (currentPart) {
      case "part1":
        return (
          <Part1 questionGroups={part2QuestionGroups.part1} mode={"review"} />
        );
      case "part2":
        return (
          <Part2 questionGroups={part2QuestionGroups.part2} mode={"review"} />
        );
      case "part3":
        return (
          <Part3 questionGroups={part2QuestionGroups.part3} mode={"review"} />
        );
      case "part4":
        return (
          <Part4 questionGroups={part2QuestionGroups.part4} mode={"review"} />
        );
      case "part5":
        return (
          <Part5 questionGroups={part2QuestionGroups.part5} mode={"review"} />
        );
      case "part6":
        return (
          <Part6 questionGroups={part2QuestionGroups.part6} mode={"review"} />
        );
      case "part7":
        return (
          <Part7 questionGroups={part2QuestionGroups.part7} mode={"review"} />
        );
      default:
        return <div>Cannot find this part</div>;
    }
  };

  return (
    <Content sx={{ backgroundColor: "secondary.extraLight" }}>
      <Container maxWidth="sm">
        <QuestionProvider>
          <Box my={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={9.5}>
                {isLoadingAttemptDetails ? (
                  <Box sx={{ marginTop: 2 }}>
                    <DotLoadingProgress />
                  </Box>
                ) : (
                  <Stack direction={"column"} gap={1}>
                    <Box
                      sx={{
                        width: "100%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: 3,
                        height: 65,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        padding: "0 20px",
                        backgroundColor: "white",
                      }}
                    >
                      <Stack direction={"row"} gap={0.5}>
                        <Button
                          variant="text"
                          disabled={currentPartIndex === 0}
                          onClick={handlePrevious}
                          sx={{
                            borderRadius: 3,
                          }}
                        >
                          <ArrowBackIosIcon />
                        </Button>
                        {selectedParts.map((part, partIndex) => {
                          return (
                            <Button
                              variant={
                                currentPartIndex === partIndex
                                  ? "contained"
                                  : "outlined"
                              }
                              size="small"
                              sx={{
                                borderRadius: 3,
                                padding: "0 18px",
                              }}
                              onClick={() => setCurrentPartIndex(partIndex)}
                            >
                              {`Part ${part[4]}`}
                            </Button>
                          );
                        })}
                      </Stack>

                      <Button
                        variant="text"
                        disabled={currentPartIndex === selectedParts.length - 1}
                        onClick={handleNext}
                        sx={{
                          borderRadius: 3,
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: 3,
                        backgroundColor: "white",
                      }}
                      padding={3}
                    >
                      {renderPart()}
                    </Box>
                  </Stack>
                )}
              </Grid2>
              <Grid2 size={2.5}>
                <Box
                  padding={2}
                  sx={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: 3,
                    position: "sticky",
                    top: "50px",
                    alignSelf: "flex-start",
                    backgroundColor: "white",
                  }}
                >
                  <SubMitBox
                    partDataChosen={part2QuestionGroups}
                    setCurrentPart={(part: Part) => {
                      setCurrentPartIndex(selectedParts.indexOf(part));
                    }}
                    mode={"review"}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </QuestionProvider>
      </Container>
      {showScrollToTop && (
        <div
          style={{
            padding: 0,
            position: "sticky",
            bottom: "5px",
            right: "15px",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <NavigationIcon color="primary" />
        </div>
      )}
    </Content>
  );
};

export default PartResultIndex;
