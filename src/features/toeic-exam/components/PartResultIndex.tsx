import { Box, Button, Container, Grid2, Stack } from "@mui/material";
import Content from "../../../components/layout/Content";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PracticeDetailConverted } from "../types/PracticeDetailConverted";
import { useQuery } from "@tanstack/react-query";
import { fetchPracticeDetailUser } from "../api/api";
import { convertPracticeResponse } from "../utils/helper";
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

const PartResultIndex = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const routeParams = useParams<{ reviewId: string }>();
  const reviewId = routeParams.reviewId;
  const [examDataReview, setExamDataReview] =
    useState<PracticeDetailConverted>();

  const { isPending, data: ExamSetReviewData } = useQuery({
    queryKey: ["FetchTestPractice", reviewId],
    queryFn: () => fetchPracticeDetailUser(reviewId!),
    enabled: !!reviewId,
  });

  useEffect(() => {
    if (reviewId && ExamSetReviewData) {
      console.log("exam ", ExamSetReviewData);
      console.log("converve data", convertPracticeResponse(ExamSetReviewData));
      const convertedData = convertPracticeResponse(ExamSetReviewData);
      setExamDataReview(convertedData);
    }
  }, [ExamSetReviewData]);

  const selectedParts = [
    "part1",
    "part2",
    "part3",
    "part4",
    "part5",
    "part6",
    "part7",
  ];

  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentIndex((prev) => prev - 1);

  const renderPart = () => {
    const currentPart = selectedParts[currentIndex];

    switch (currentPart) {
      case "part1":
        return <Part1 partData={examDataReview?.partData[0]} mode={"review"} />;
      case "part2":
        return <Part2 partData={examDataReview?.partData[1]} mode={"review"} />;
      case "part3":
        return <Part3 partData={examDataReview?.partData[2]} mode={"review"} />;
      case "part4":
        return <Part4 partData={examDataReview?.partData[3]} mode={"review"} />;
      case "part5":
        return <Part5 partData={examDataReview?.partData[4]} mode={"review"} />;
      case "part6":
        return <Part6 partData={examDataReview?.partData[5]} mode={"review"} />;
      case "part7":
        return <Part7 partData={examDataReview?.partData[6]} mode={"review"} />;
      default:
        return <div>Cannot find this part</div>;
    }
  };

  return (
    <Content>
      <Container maxWidth="sm">
        <QuestionProvider>
          <Box my={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={9.5}>
                {isPending ? (
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
                      }}
                    >
                      <Stack direction={"row"} gap={0.5}>
                        <Button
                          variant="text"
                          disabled={currentIndex === 0}
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
                                currentIndex === partIndex
                                  ? "contained"
                                  : "outlined"
                              }
                              size="small"
                              sx={{
                                borderRadius: 3,
                                padding: "0 18px",
                              }}
                              onClick={() => setCurrentIndex(partIndex)}
                            >
                              {`Part ${part[4]}`}
                            </Button>
                          );
                        })}
                      </Stack>

                      <Button
                        variant="text"
                        disabled={currentIndex === selectedParts.length - 1}
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
                  }}
                >
                  <SubMitBox
                    partData={examDataReview?.partData || []}
                    setCurrentIndex={setCurrentIndex}
                    mode={"review"}
                  />
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </QuestionProvider>
      </Container>
      {isVisible && (
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
