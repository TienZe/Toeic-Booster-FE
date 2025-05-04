import React, { useMemo, useState } from "react";
import Content from "../../../components/layout/Content";
import {
  alpha,
  Box,
  OutlinedInput,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Image } from "../../../components/UI/Image";
import TabPanel from "../../../components/UI/TabPanel";
import VocaSetTextList from "./VocaSetTextList";
import LessonProgressCard from "./LessonProgressCard";
import GoldStarIcon from "../assets/gold-star.svg";
import RedStarIcon from "../assets/course-progress-star-2.svg";
import TwoCardIcon from "../assets/course-progress-learned-1.svg";
import TwoRedCardIcon from "../assets/course-progress-not-learn-1.svg";
import LessonComment from "./LessonComment";
import CommentIcon from "../assets/comment-icon.svg";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LessonCourse from "./LessonCourse";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import {
  getVocaSetRating,
  getVocaSetWithUserProgress,
} from "../api/voca-domain";
import { UserProgress } from "../types/UserProgress";
import VocaSetRatingModal from "./VocaSetRatingModal";
import { format } from "date-fns";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import { getLessonThumbnail } from "../../../types/Lesson";

const LessonsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { vocaSetId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [openRatingModal, setOpenRatingModal] = useState(false);

  const { data: vocaSet, isLoading } = useQuery({
    queryKey: ["vocaSet", { id: vocaSetId }],
    queryFn: () => getVocaSetWithUserProgress(vocaSetId!),
    enabled: !!vocaSetId,
  });

  const { data: ratings } = useQuery({
    queryKey: ["vocaSetRating", { vocaSetId: vocaSetId }],
    queryFn: () => getVocaSetRating(vocaSetId!),
    enabled: !!vocaSetId,
  });

  const userProgress: UserProgress = useMemo(() => {
    const lessons = vocaSet?.topics || [];

    const totalWords = lessons.reduce(
      (acc, lesson) => acc + lesson.listWord.length,
      0,
    );

    const retainedWords = lessons.reduce(
      (acc, lesson) => acc + lesson.retainedWord,
      0,
    );

    const learnedLessons = lessons.reduce((acc, lesson) => {
      if (lesson.isLearned) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return {
      learnedLessons,
      unlearnedLessons: lessons.length - learnedLessons,
      retainedWords,
      newWords: totalWords - retainedWords,
    };
  }, [vocaSet?.topics]);

  const lessons = vocaSet?.topics || [];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Content>
      {isLoading ? (
        <CustomBackdrop open />
      ) : (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: 1, py: 3 }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography variant="h5">
                Lesson{" "}
                <Typography
                  component="span"
                  color="primary"
                  sx={{
                    marginTop: "-4px",
                    fontWeight: "medium",
                    lineHeight: 2,
                    display: "inline-block",
                    textAlign: "center",
                    fontSize: "15px",
                    marginLeft: "15px",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  {lessons.length}
                </Typography>
              </Typography>
              <Box sx={{ marginTop: "40px", maxWidth: "800px" }}>
                <Box display="flex" flexWrap="wrap" sx={{ gap: 3 }}>
                  {lessons.length > 0 ? (
                    lessons.map((lesson) => (
                      <LessonCourse
                        key={lesson.id}
                        id={lesson.id}
                        name={lesson.name}
                        thumbnail={getLessonThumbnail(lesson)}
                        totalWords={lesson.listWord.length}
                        retainedWords={lesson.retainedWord}
                        reviewable={lesson.isLearned}
                        vocaSetId={vocaSetId}
                      />
                    ))
                  ) : (
                    <Typography>
                      Opps, this voca set doesn't have any lessons...
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Stack
              spacing={2}
              sx={{
                width: "377px",
                "& .MuiPaper-root": {
                  border: "1px solid #e5e5e5",
                  py: "20px",
                  borderRadius: "18px",
                },
              }}
            >
              <Paper variant="outlined">
                <Box sx={{ px: "24px" }}>
                  <Image
                    src={vocaSet?.thumbnail || ""}
                    sx={{
                      aspectRatio: "250/140",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    variant="h4"
                    color="secondary.dark"
                    sx={{
                      lineHeight: "36px",
                      fontSize: "24px",
                      fontWeight: "600",
                      marginTop: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {vocaSet?.name}
                  </Typography>
                </Box>
                <Tabs
                  value={tabIndex}
                  onChange={handleChange}
                  sx={{
                    px: "24px",
                    borderBottomWidth: "1px",
                    borderColor: "divider",
                    "& .MuiTab-root": { px: 0.75 },
                    "& .MuiButtonBase-root": {
                      fontSize: "15px",
                      px: 0,
                      py: "8px",
                      alignItems: "flex-start",
                      minWidth: "auto",
                      marginRight: 1.5,
                    },
                    "& .MuiTabs-indicator": {
                      width: "45px",
                    },
                  }}
                >
                  <Tab label="Aim" />
                  <Tab label="Description" />
                </Tabs>

                <TabPanel
                  key={"tab-0"}
                  index={0}
                  value={tabIndex}
                  sx={{ padding: "20px" }}
                >
                  <VocaSetTextList>
                    {(vocaSet?.target &&
                      vocaSet?.target
                        .split(",")
                        .map((item) => <li>{item}</li>)) || (
                      <>
                        <li>
                          Helping you get familiar with smart vocabulary
                          learning with EngFlash.
                        </li>
                        <li>
                          Helping you improve your communication and expression
                          skills in English for common situations.
                        </li>
                      </>
                    )}
                  </VocaSetTextList>
                </TabPanel>

                <TabPanel
                  key={"tab-1"}
                  index={1}
                  value={tabIndex}
                  sx={{ padding: "20px" }}
                >
                  <VocaSetTextList>
                    {(vocaSet?.description &&
                      vocaSet?.description
                        .split(",")
                        .map((item) => <li>{item}</li>)) || (
                      <>
                        <li>
                          Includes a wide range of vocabulary from{" "}
                          {lessons.length || "many"} common and relatable
                          topics.
                        </li>
                        <li>
                          A free course for you to experience smart vocabulary
                          learning with EngFlash.
                        </li>
                      </>
                    )}
                  </VocaSetTextList>
                </TabPanel>
              </Paper>

              <Paper variant="outlined" sx={{ padding: "25px 20px" }}>
                <Typography
                  sx={{ fontSize: 20, fontWeight: "medium", color: "#201F1F" }}
                >
                  Your progress
                </Typography>

                <Box
                  sx={{
                    marginTop: 0.75,
                    display: "flex",
                    flexWrap: "wrap",
                    rowGap: "10px",
                    columnGap: "5px",
                  }}
                >
                  <LessonProgressCard
                    label="Learned lessons"
                    icon={GoldStarIcon}
                    quantity={userProgress.learnedLessons}
                  />
                  <LessonProgressCard
                    label="Unlearned lessons"
                    icon={RedStarIcon}
                    quantity={userProgress.unlearnedLessons}
                  />
                  <LessonProgressCard
                    label="Retained words"
                    icon={TwoCardIcon}
                    quantity={userProgress.retainedWords}
                  />
                  <LessonProgressCard
                    label="New words"
                    icon={TwoRedCardIcon}
                    quantity={userProgress.newWords}
                  />
                </Box>
              </Paper>

              <Paper variant="outlined">
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: "medium",
                    color: "#201F1F",
                    my: "10px",
                    px: 1.25,
                  }}
                >
                  Reviews of learners
                </Typography>

                {/* Comment container */}
                <Box sx={{ maxHeight: "340px", overflowY: "auto" }}>
                  {ratings?.map((rating) => (
                    <LessonComment
                      key={rating.id}
                      reviewer={rating.user.name}
                      reviewerAvatar={rating.user.avatar || DefaultAvatar}
                      rating={rating.rating}
                      ratingContent={rating.ratingContent}
                      rateDate={format(
                        new Date(rating.createdAt),
                        "dd/MM/yyyy",
                      )}
                    />
                  ))}
                </Box>

                {/* Comment button */}
                <Stack
                  direction="row"
                  spacing="10px"
                  sx={{ padding: "20px 15px" }}
                >
                  <Image src={CommentIcon} sx={{ width: "36px" }} />
                  <OutlinedInput
                    placeholder="Write a comment..."
                    readOnly
                    sx={{
                      fontSize: "13px",
                      height: "38px",
                      backgroundColor: "#FAF9FC",
                      border: "1px solid #ddd",
                      flexGrow: 1,
                      "& fieldset": { border: "none" },
                      "& input": {
                        cursor: "pointer !important",
                      },
                      "& input:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    onClick={() => setOpenRatingModal(true)}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Stack>

          <VocaSetRatingModal
            vocaSetId={vocaSetId as string}
            open={openRatingModal}
            onClose={() => setOpenRatingModal(false)}
            onPosted={() =>
              queryClient.invalidateQueries({
                queryKey: ["vocaSetRating", { vocaSetId: vocaSetId }],
              })
            }
          />
        </Box>
      )}
    </Content>
  );
};

export default LessonsPage;
