import {
  Box,
  Button,
  CircularProgress,
  Grid2,
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
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import useAdminTablePagination from "../../hooks/useAdminTablePagination";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import SearchInput from "../../../../components/UI/SearchInput";
import { Add, Delete, Tune } from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ListenGroupLevel from "../../../../types/ListenGroupLevel";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import { toast } from "react-toastify";
import {
  getListenGroupById,
  updateListenGroup,
} from "../api/listenGroupAdminApi";
import UpdateListenGroupRequest, {
  ListenLesionModel,
} from "../types/ListListenGroup.type";
import { deleteListenLesson } from "../api/listenLessonAdminApi";

interface ListenGroupFormData {
  id: string;
  name: string;
  level: string;
}

const LESSON_PAGE_SIZE = 4;
const ListenGroupDetailAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: listenGroupId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["listenGroupDetail", { id: listenGroupId }],
    queryFn: () => getListenGroupById(listenGroupId!),
    enabled: !!listenGroupId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (request: UpdateListenGroupRequest) => {
      const responseData = await updateListenGroup(request);
      return responseData;
    },
    onSuccess: (responseData) => {
      toast.success("Update successfully!");
      queryClient.setQueryData(["listenGroupDetail", { id: listenGroupId }], {
        ...responseData,
        listenLessons: data?.listenLessons,
      });
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: deleteListenLesson,
    onSuccess: () => {
      toast.success("Delete lesson successfully!");
      queryClient.invalidateQueries({
        queryKey: ["listenGroupDetail", { id: listenGroupId }],
        exact: true,
      });
      setPage(0);
    },
    onSettled: () => {
      // reset state
      setDeletedLessonId(null);
      deleteLessonMutation.reset();
    },
  });

  const {
    control,
    register,
    reset,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ListenGroupFormData>({
    defaultValues: {
      id: "",
      name: "",
      level: ListenGroupLevel.BEGINNER,
    },
  });

  const [searchLesson, setSearchLesson] = useState<string>("");
  const [deletedLessonId, setDeletedLessonId] = useState<string | null>(null);

  const openDeleteModal = Boolean(deletedLessonId);

  const lessons = data?.listenLessons || [];

  const filteredlessons = lessons.filter((lesson) =>
    lesson.name.toLowerCase().includes(searchLesson.toLowerCase()),
  );
  const { page, setPage, emptyRows, pageData, handleChangePage } =
    useAdminTablePagination<ListenLesionModel>(
      filteredlessons,
      LESSON_PAGE_SIZE,
    );

  // console.log("pageData", pageData);
  // console.log("data.topic", data?.topics);
  // console.log("data", data);

  // const {
  //   fileInputRef,
  //   fileSrc,
  //   setFileSrc,
  //   chooseFile,
  //   handleChangeFileInput,
  // } = useFileInput();

  const formData = getValues();
  console.log("form data", formData);

  useEffect(() => {
    if (data) {
      const listenGroupFormData: ListenGroupFormData = {
        id: data.id,
        name: data.name,
        level: data.level,
      };
      reset(listenGroupFormData);
    }
  }, [data, reset]);

  const handleSearchLessonInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchLesson(event.target.value);
    setPage(0);
  };

  const handleSaveListenGroup: SubmitHandler<ListenGroupFormData> = async (
    data,
  ) => {
    console.log("Save voca set", data);

    const request: UpdateListenGroupRequest = {
      id: data.id,
      name: data.name,
      level: data.level as ListenGroupLevel,
    };
    mutate(request);
  };

  const handleClickDeleteLesson = (lessonId: string) => {
    setDeletedLessonId(lessonId);
  };

  const handleDeleteLesson = () => {
    if (deletedLessonId) {
      deleteLessonMutation.mutate(deletedLessonId);
    }
  };

  if (!listenGroupId) {
    return <Navigate to="/admin/listen-group/" />;
  }

  console.log("register level", register("level"));

  return (
    <>
      {isLoading ? (
        <CustomBackdrop open />
      ) : (
        <Box sx={{ padding: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" sx={{ marginBottom: 1 }}>
              Listen Group Set Details
            </Typography>
            <GoBackButton />
          </Stack>
          <form
            id="details-listen-group-form"
            onSubmit={handleSubmit(handleSaveListenGroup)}
            style={{ marginBottom: "2rem" }}
          >
            <Stack direction="row" spacing={2} alignItems="start">
              <Grid2 spacing={1} container>
                <Grid2 size={6}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <RoundedInput
                        {...field}
                        label="Name"
                        placeholder="Enter the listen group name"
                        padding="16.5px 14px"
                        borderRadius={4}
                        gap={0.5}
                        labelColor="secondary.main"
                        validationError={errors.name?.message}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name="level"
                    control={control}
                    rules={{ required: "Level is required" }}
                    render={({ field }) => (
                      <BootstrapSelect
                        {...field}
                        label="Level"
                        itemLabels={Object.values(ListenGroupLevel).map(
                          capitalizeFirstLetter,
                        )}
                        itemValues={Object.values(ListenGroupLevel)}
                        defaultValue={data?.level}
                        validationError={errors.level?.message}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Stack direction="row" spacing={0.5} justifyContent="end">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ float: "right", px: "24px", minWidth: "110px" }}
                      disabled={isPending}
                    >
                      {isPending ? <CircularProgress size={20} /> : "Save"}
                    </Button>
                  </Stack>
                </Grid2>
              </Grid2>
            </Stack>
          </form>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="start"
            sx={{ marginBottom: 1 }}
          >
            <Stack direction="row" spacing={1}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Lessons
              </Typography>
              <SearchInput
                placeholder="Filter lessons by name"
                onChange={handleSearchLessonInputChange}
                sx={{ "& > input": { py: "4px" } }}
              />
            </Stack>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={() =>
                  navigate(
                    `/admin/listen-lesson/create?groupId=${listenGroupId}`,
                  )
                }
              >
                New
              </Button>
              {/* <Button
                variant="outlined"
                startIcon={<Add />}
                size="small"
                onClick={() =>
                  navigate(
                    `/admin/listen-lesson/auto-create?groupId=${listenGroupId}`,
                  )
                }
              >
                Auto generate audio
              </Button> */}
            </Box>
          </Stack>
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Number of sentence</TableCell>
                  <TableCell width={150} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData.map((lesson: ListenLesionModel) => (
                  <TableRow key={lesson.id}>
                    <TableCell
                      sx={{
                        maxWidth: "50px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {lesson.id}
                    </TableCell>

                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {lesson.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      {lesson?.listenSentences.length || 0}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Stack direction="row" spacing={0.5}>
                        <Link to={`/admin/listen-lesson?id=${lesson.id}`}>
                          <Button startIcon={<Tune />}>Manage</Button>
                        </Link>
                        <Button
                          startIcon={<Delete />}
                          color="error"
                          onClick={() => handleClickDeleteLesson(lesson.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 53 * emptyRows, backgroundColor: "white" }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[LESSON_PAGE_SIZE]}
                    count={data?.listenLessons?.length || 0}
                    rowsPerPage={LESSON_PAGE_SIZE}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>

          <CustomModal
            open={openDeleteModal}
            onClose={() => setDeletedLessonId(null)}
          >
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Do you want to delete this lesson?
              </Typography>
              <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteLesson}
                  sx={{ width: "80px" }}
                >
                  {deleteLessonMutation.isPending ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    "Delete"
                  )}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setDeletedLessonId(null)}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </CustomModal>
        </Box>
      )}
    </>
  );
};

export default ListenGroupDetailAdmin;
