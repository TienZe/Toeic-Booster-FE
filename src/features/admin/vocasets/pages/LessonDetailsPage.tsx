import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { AddPhotoAlternate, Delete, Edit } from "@mui/icons-material";
// import DefaultLessonImage from "../assets/default-lesson-img.webp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LessonCard } from "../../../../components/LessonCard";
import AdminTableContainer from "../components/AdminTableContainer";
import useAdminTablePagination from "../../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import { useMutation } from "@tanstack/react-query";
import { updateLesson } from "../api/lesson-api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import RoundedFileInput from "../components/RoundedFileInput";
import { useEffect, useState } from "react";
import VocabularyModel from "../../../../types/VocabularyModel";
import UpdateLessonRequest from "../types/UpdateLessonRequest";
import { toast } from "react-toastify";
import {
  fileList2Base64,
  getWordThumbnail,
  vocaWordClassFullName2Abbr,
} from "../../../../utils/helper";
import queryClient from "../../../../queryClient";
import UpdateLessonResponse from "../types/UpdateLessonResponse";
import Lesson, { getLessonThumbnail } from "../../../../types/Lesson";
import CustomModal from "../../../../components/UI/CustomModal";
import { Image } from "../../../../components/UI/Image";
import DefaultLessonThumbnail from "../../../../assets/images/voca/default-lesson-image.svg";
import useLesson from "../../../../hooks/useLesson";
import AttachingLessonVocabularyDrawer from "../components/AttachingLessonVocabularyDrawer";
import { attachNewWordsToLesson } from "../api/lesson-vocabulary-api";
import { useLessonVocabularies } from "../../../../hooks/useLessonVocabularies";
import { LessonVocabulary } from "../../../../types/LessonVocabulary";
import { deleteLessonVocabulary } from "../../../shared-apis/lesson-vocabulary-api";

interface LessonFormData {
  name: string;
  thumbnail: string | FileList;
}

const VOCA_PAGE_SIZE = 4;

const LessonDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const lessonId = Number(searchParams.get("id"));

  const navigate = useNavigate();

  const [detachedVocaId, setDetachedVocaId] = useState<number>();
  const openDeleteModal = Boolean(detachedVocaId);

  const [openAttachingVocaModal, setOpenAttachingVocaModal] = useState(false);

  const { data: lesson, isLoading: isLoadingLesson } = useLesson(
    lessonId!,
    {
      enabled: !!lessonId,
    },
    {
      withWords: true,
    },
  );

  const { data: lessonVocabularies } = useLessonVocabularies(lessonId, {
    enabled: !!lessonId,
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset: resetLessonForm,
    // formState: { errors },
  } = useForm<LessonFormData>({
    defaultValues: {
      name: lesson?.name,
      thumbnail: lesson?.thumbnail || "",
    },
  });

  const updateLessonMutation = useMutation({
    mutationFn: updateLesson,
    onSuccess: (responseData: UpdateLessonResponse) => {
      toast.success("Lesson updated successfully");
      queryClient.setQueryData(
        ["lesson", { id: lessonId }],
        (oldData: Lesson) => ({
          ...oldData,
          name: responseData.name,
          thumbnail: responseData.thumbnail,
        }),
      );
    },
  });

  const attachNewWordsMutation = useMutation({
    mutationFn: attachNewWordsToLesson,
    onSuccess: () => {
      toast.success("Words attached successfully");

      queryClient.invalidateQueries({
        queryKey: ["lesson-vocabularies", { lessonId: lessonId }],
        exact: true,
      });
    },
    onSettled: () => {
      attachNewWordsMutation.reset();
    },
  });

  const [lessonImageSrc, setLessonImageSrc] = useState<string>(
    lesson?.thumbnail || DefaultLessonThumbnail,
  );

  const lessonName = watch("name");

  const { page, setPage, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<LessonVocabulary>(
      lessonVocabularies || [],
      VOCA_PAGE_SIZE,
    );

  const detachWordMutation = useMutation({
    mutationFn: deleteLessonVocabulary,
    onSuccess: () => {
      toast.success("Delete word successfully!");
      queryClient.invalidateQueries({
        queryKey: ["lesson-vocabularies", { lessonId: lessonId }],
        exact: true,
      });
      setPage(0);
    },
    onSettled: () => {
      // reset state
      setDetachedVocaId(undefined);
      detachWordMutation.reset();
    },
  });

  const handleSaveForm: SubmitHandler<LessonFormData> = async (data) => {
    console.log("Form data:", data);

    const updateRequest: UpdateLessonRequest = {
      id: lessonId!,
      name: data.name,
    };

    if (data.thumbnail instanceof FileList) {
      updateRequest.thumbnail = await fileList2Base64(data.thumbnail);
    }

    updateLessonMutation.mutate(updateRequest);
  };

  const handleClickNewVocaBtn = () => {
    navigate("/admin/voca/create?lessonId=" + lessonId);
  };

  const handleDetachWord = () => {
    if (detachedVocaId && lessonId) {
      detachWordMutation.mutate({
        lessonId: lessonId,
        vocabularyId: detachedVocaId,
      });
    }
  };

  const handleAttachNewWords = (newAttachedWords: VocabularyModel[]) => {
    console.log("New attached words:", newAttachedWords);

    attachNewWordsMutation.mutate({
      lessonId: lessonId!,
      wordIds: newAttachedWords.map((word) => word.id),
    });
  };

  useEffect(() => {
    if (lesson) {
      console.log("Lesson changes, reset form and lesson image src");
      resetLessonForm({
        name: lesson.name,
        thumbnail: lesson.thumbnail || "",
      });
      setLessonImageSrc(lesson.thumbnail || getLessonThumbnail(lesson));
    }
  }, [lesson, resetLessonForm]);

  if (!lessonId) {
    return <Navigate to="/admin/voca-set" />;
  }

  return (
    <>
      {isLoadingLesson ? (
        <CustomBackdrop open />
      ) : (
        <Box sx={{ padding: 2, position: "relative" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Lesson
            </Typography>
            <GoBackButton />
          </Stack>

          <Stack direction="row" spacing={4}>
            <form
              id="details-lesson-form"
              style={{ marginBottom: "2rem" }}
              onSubmit={handleSubmit(handleSaveForm)}
            >
              <Stack direction="row" spacing={2} alignItems="start">
                <Grid2 spacing={1} container sx={{ maxWidth: "400px" }}>
                  <Grid2 size={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <RoundedInput
                          {...field}
                          label="Name"
                          placeholder="Enter the lesson name"
                          padding="16.5px 14px"
                          borderRadius={4}
                          gap={0.5}
                          labelColor="secondary.main"
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <RoundedFileInput
                      register={register("thumbnail")}
                      label="Lesson image"
                      borderRadius={4}
                      gap={0.5}
                      labelColor="secondary.main"
                      padding="16.5px 14px"
                      defaultFileSrc={
                        lesson
                          ? getLessonThumbnail(lesson)
                          : DefaultLessonThumbnail
                      }
                      iconButton={<AddPhotoAlternate />}
                      onChangeFile={(newFileSrc) =>
                        setLessonImageSrc(newFileSrc)
                      }
                    />
                  </Grid2>

                  <Grid2 size={12}>
                    <Stack direction="row" spacing={0.5} justifyContent="end">
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{ float: "right", px: "24px", minWidth: "110px" }}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid2>
                </Grid2>
              </Stack>
            </form>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            {lesson && (
              <LessonCard
                name={lessonName || ""}
                image={lessonImageSrc || ""}
              />
            )}
          </Stack>

          {/* Vocabularies */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
            sx={{ marginBottom: 1 }}
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Vocabularies
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenAttachingVocaModal(true)}
              >
                Add word
              </Button>
              <Typography>or just</Typography>
              <Button
                // startIcon={<Add />}
                size="small"
                onClick={handleClickNewVocaBtn}
              >
                Create new word
              </Button>
            </Stack>
          </Stack>
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={100}>ID</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Word</TableCell>
                  <TableCell width={100}>Type</TableCell>
                  <TableCell>Meaning</TableCell>
                  <TableCell width={150} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((lessonWord: LessonVocabulary) => (
                  <TableRow>
                    <TableCell
                      sx={{
                        maxWidth: "100px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {lessonWord.id}
                    </TableCell>
                    <TableCell align="center">
                      <Image
                        src={getWordThumbnail(lessonWord)}
                        sx={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "6px",
                        }}
                      />
                    </TableCell>
                    <TableCell>{lessonWord.word}</TableCell>
                    <TableCell align="center">
                      {vocaWordClassFullName2Abbr(
                        lessonWord.partOfSpeech || "",
                      )}
                    </TableCell>
                    <TableCell>{lessonWord.meaning}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="center">
                        <Link to={`/admin/voca?id=${lessonWord.id}`}>
                          <IconButton color="primary">
                            <Edit />
                          </IconButton>
                        </Link>
                        <IconButton
                          color="error"
                          onClick={() =>
                            setDetachedVocaId(lessonWord.vocabularyId)
                          }
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 73 * emptyRows, backgroundColor: "white" }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[VOCA_PAGE_SIZE]}
                    count={lessonVocabularies?.length || 0}
                    rowsPerPage={VOCA_PAGE_SIZE}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>

          {/* Detach word modal */}
          <CustomModal
            open={openDeleteModal}
            onClose={() => setDetachedVocaId(undefined)}
          >
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Do you want to delete this word?
              </Typography>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={() => setDetachedVocaId(undefined)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDetachWord}
                  sx={{ width: "80px" }}
                >
                  {/* {deleteVocaMutation.isPending ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    "Delete"
                  )} */}
                  Delete
                </Button>
              </Stack>
            </Box>
          </CustomModal>

          <AttachingLessonVocabularyDrawer
            open={openAttachingVocaModal}
            onClose={() => setOpenAttachingVocaModal(false)}
            onSubmit={handleAttachNewWords}
            exceptedVocabularyIds={lessonVocabularies?.map(
              (lessonWord) => +lessonWord.vocabularyId,
            )}
          />
        </Box>
      )}
    </>
  );
};

export default LessonDetailsPage;
