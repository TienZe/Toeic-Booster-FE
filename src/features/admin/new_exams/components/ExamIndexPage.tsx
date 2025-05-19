import { Add, FilterAlt, FilterAltOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { useMutation } from "@tanstack/react-query";
import { createExam, deleteEntireExam } from "../api/examApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import ExamSetRow from "./ExamSetRow";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import CustomModal from "../../../../components/UI/CustomModal";
import queryClient from "../../../../queryClient";
import { toast } from "react-toastify";
import usePaginatedToeicExams from "../../../../hooks/usePaginatedToeicExams";
import { ToeicExam } from "../../../../types/ToeicExam";
import { DEFAULT_QUESTION_GROUP } from "../../../../utils/defaultToeicTestQuestionGroups";

interface IFilterExamForm {
  filterName: string;
  filterStatus: string;
}

interface NewExamForm {
  name: string;
  tag: number;
}

const DEFAULT_EXAM_FILTER_FORM: IFilterExamForm = {
  filterName: "",
  filterStatus: "all",
};

const EXAM_PAGE_SIZE = 5;

const ExamIndexPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [deletedExam, setDeletedExam] = useState<number | null>(null);
  const [openNewModal, setOpenNewModal] = useState(false);

  const { data: paginatedExams, isLoading: isLoadingExams } =
    usePaginatedToeicExams(
      {},
      {
        page: 0,
        limit: EXAM_PAGE_SIZE,
      },
    );

  const newExamForm = useForm<NewExamForm>({
    defaultValues: {
      name: "",
      tag: 0,
    },
  });

  const newExamMutation = useMutation({
    mutationFn: createExam,
    onSuccess: (responseData) => {
      toast.success("Create exam successfully!");
      navigate(`/admin/exam-set/${responseData.id}`);
    },
    onError: () => {
      toast.error("Create exam failed!");
      newExamMutation.reset();
    },
  });

  const deleteExamMutation = useMutation({
    mutationFn: deleteEntireExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchExam"] });
      toast.success("Delete exam successfully!");
    },
    onSettled: () => {
      // reset state
      setDeletedExam(null);
      deleteExamMutation.reset();
    },
  });

  const handleDeleteExam = () => {
    if (deletedExam) {
      deleteExamMutation.mutate(deletedExam);
    }
  };

  const {
    reset: resetFilterForm,
    control,
    handleSubmit: handleFilter,
  } = useForm<IFilterExamForm>({
    defaultValues: DEFAULT_EXAM_FILTER_FORM,
  });

  const handleFilterExam: SubmitHandler<IFilterExamForm> = (data) => {
    const { filterName } = data;
    // const filteredData = examSetData?.data.filter(
    //   (examSet) =>
    //     (filterName === "" ||
    //       examSet.name.toLowerCase().includes(filterName as string)) &&
    //     (filterStatus === "all" || filterStatus === "inactive"),
    // );
    // setSearch(filterName);
    setPage(0);
  };

  const handleResetFilter = () => {
    resetFilterForm(DEFAULT_EXAM_FILTER_FORM);
    // setSearch("");
    setPage(0);
  };

  const handleCreateExam: SubmitHandler<NewExamForm> = (data) => {
    newExamMutation.mutate({
      ...data,
      questionGroups: DEFAULT_QUESTION_GROUP,
    });
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Exam Sets
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => setOpenNewModal(true)}
          >
            New
          </Button>
        </Stack>

        <form
          id="filter-exam-form"
          style={{ marginBottom: "2rem" }}
          onSubmit={handleFilter(handleFilterExam)}
        >
          <Grid2 spacing={1} container sx={{ maxWidth: "900px" }}>
            <Grid2 size={5}>
              <Controller
                name="filterName"
                control={control}
                render={({ field }) => (
                  <RoundedInput
                    {...field}
                    label="Name"
                    placeholder="Enter the filter name"
                    padding="16.5px 14px"
                    borderRadius={4}
                    gap={0.5}
                    labelColor="secondary.main"
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={4}
              display="flex"
              alignItems="end"
              sx={{ columnGap: 1 }}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<FilterAlt />}
              >
                Search
              </Button>
              <Button
                onClick={handleResetFilter}
                type="reset"
                variant="outlined"
                startIcon={<FilterAltOff />}
              >
                Clear
              </Button>
            </Grid2>
          </Grid2>
        </form>

        {isLoadingExams ? (
          <CustomBackdrop open />
        ) : (
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="30%">ID</TableCell>
                  <TableCell width="25%">Name</TableCell>
                  <TableCell width="10%">Tag</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedExams?.items.map((exam: ToeicExam) => (
                  <ExamSetRow
                    key={exam.id}
                    examSet={exam}
                    onDelete={() => setDeletedExam(exam.id)}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={paginatedExams?.total || 0}
                    rowsPerPage={EXAM_PAGE_SIZE}
                    rowsPerPageOptions={[EXAM_PAGE_SIZE]}
                    page={page - 1}
                    onPageChange={(_e, newPage) => {
                      setPage(newPage + 1);
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>
        )}
      </Box>

      {/*  New exam modal */}
      <CustomModal
        open={openNewModal}
        onClose={() => setOpenNewModal(false)}
        sx={{ width: "500px", padding: 4 }}
      >
        <Box sx={{}}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 2.5, textAlign: "center" }}
          >
            New Exam
          </Typography>

          <form
            id="new-exam-form"
            onSubmit={newExamForm.handleSubmit(handleCreateExam)}
          >
            <Stack spacing={1}>
              <TextField
                label="Name"
                helperText={newExamForm.formState.errors.name?.message}
                error={!!newExamForm.formState.errors.name}
                {...newExamForm.register("name")}
                sx={{ width: "100%" }}
              />

              <TextField
                label="Tag"
                select
                helperText={newExamForm.formState.errors.tag?.message}
                error={!!newExamForm.formState.errors.tag}
                {...newExamForm.register("tag")}
                sx={{ width: "100%" }}
              />

              <Stack direction="row" spacing={0.5} justifyContent="end">
                <Button
                  variant="outlined"
                  onClick={() => setOpenNewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ minWidth: "110px", boxShadow: "none" }}
                  disabled={newExamMutation.isPending}
                >
                  {newExamMutation.isPending ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Create"
                  )}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </CustomModal>

      {/* Delete modal */}
      <CustomModal open={!!deletedExam} onClose={() => setDeletedExam(null)}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to delete this exam?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteExam}
              sx={{ width: "80px" }}
              disabled={deleteExamMutation.isPending}
            >
              {deleteExamMutation.isPending ? (
                <CircularProgress size={20} color="error" />
              ) : (
                "Delete"
              )}
            </Button>
            <Button variant="contained" onClick={() => setDeletedExam(null)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default ExamIndexPage;
