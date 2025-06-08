import { Add, FilterAltOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid2,
  MenuItem,
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
import { SubmitHandler, useForm } from "react-hook-form";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { useMutation } from "@tanstack/react-query";
import { createExam, deleteExam } from "../api/examApi";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import ExamSetRow from "./ExamSetRow";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import CustomModal from "../../../../components/UI/CustomModal";
import queryClient from "../../../../queryClient";
import { toast } from "react-toastify";
import usePaginatedToeicExams from "../../../../hooks/usePaginatedToeicExams";
import { ToeicExam } from "../../../../types/ToeicExam";
import { DEFAULT_QUESTION_GROUP } from "../../../../utils/defaultToeicTestQuestionGroups";
import useToeicCategories from "../../../../hooks/useToeicCategories";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import useDebounce from "../../../../hooks/useDebounce";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";

interface IFilterExamForm {
  filterName: string;
  filterCategory?: number;
}

interface NewExamForm {
  name: string;
  category: number;
}

const DEFAULT_EXAM_FILTER_FORM: IFilterExamForm = {
  filterName: "",
  filterCategory: undefined,
};

const EXAM_PAGE_SIZE = 10;

const ExamIndexPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [deletedExamId, setDeletedExamId] = useState<number | null>(null);
  const [openNewModal, setOpenNewModal] = useState(false);

  const newExamForm = useForm<NewExamForm>({
    defaultValues: {
      name: "",
      category: undefined,
    },
  });

  const [filterFormData, setFilterFormData] = useState<IFilterExamForm>(
    DEFAULT_EXAM_FILTER_FORM,
  );

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  const debouncedFilterName = useDebounce(filterFormData.filterName, {
    callbackFn: resetPage,
  });

  const { data: paginatedExams, isLoading: isLoadingExams } =
    usePaginatedToeicExams(
      {},
      {
        page,
        limit: EXAM_PAGE_SIZE,
        search: debouncedFilterName,
        filteredCategory: filterFormData.filterCategory,
      },
    );

  const { data: categories } = useToeicCategories();

  const categoryItems = useMemo(() => {
    const items = categories?.map((category) => ({
      label: category.category,
      value: category.id,
    }));

    return [
      {
        label: "All",
        value: undefined,
      },
      ...(items || []),
    ];
  }, [categories]);

  const newExamMutation = useMutation({
    mutationFn: createExam,
    onSuccess: (responseData) => {
      navigate(`/admin/exam-set/${responseData.id}`);
    },
    onError: () => {
      toast.error("Create exam failed!");
      newExamMutation.reset();
    },
  });

  const deleteExamMutation = useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["toeicExams"] });
      toast.success("Delete exam successfully!");
    },
    onSettled: () => {
      // reset state
      setDeletedExamId(null);
      deleteExamMutation.reset();
    },
  });

  const handleDeleteExam = () => {
    if (deletedExamId) {
      deleteExamMutation.mutate(deletedExamId);
    }
  };

  const handleResetFilter = () => {
    setFilterFormData(DEFAULT_EXAM_FILTER_FORM);
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

        <Grid2
          spacing={1}
          container
          sx={{ maxWidth: "900px", marginBottom: "2rem" }}
        >
          <Grid2 size={5}>
            <RoundedInput
              label="Name"
              placeholder="Enter the filter name"
              padding="16.5px 14px"
              borderRadius={4}
              gap={0.5}
              labelColor="secondary.main"
              value={filterFormData.filterName}
              onChange={(e) =>
                setFilterFormData({
                  ...filterFormData,
                  filterName: e.target.value,
                })
              }
            />
          </Grid2>
          <Grid2 size={3}>
            <BootstrapSelect
              label="Category"
              itemLabels={categoryItems.map((item) => item.label)}
              itemValues={categoryItems.map((item) => item.value)}
              value={filterFormData.filterCategory}
              onChange={(e) =>
                setFilterFormData({
                  ...filterFormData,
                  filterCategory: e.target.value as number,
                })
              }
              sx={{ minWidth: "180px" }}
            />
          </Grid2>
          <Grid2 size={4} display="flex" alignItems="end">
            <Button
              onClick={handleResetFilter}
              variant="text"
              startIcon={<FilterAltOff />}
            >
              Clear
            </Button>
          </Grid2>
        </Grid2>

        {isLoadingExams && <CustomBackdrop open />}

        <AdminTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="30%">ID</TableCell>
                <TableCell width="25%">Name</TableCell>
                <TableCell width="10%">Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedExams?.items.map((exam: ToeicExam) => (
                <ExamSetRow
                  key={exam.id}
                  examSet={exam}
                  onDelete={() => setDeletedExamId(exam.id)}
                />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={paginatedExams?.total || 0}
                  rowsPerPage={EXAM_PAGE_SIZE}
                  rowsPerPageOptions={[EXAM_PAGE_SIZE]}
                  page={page}
                  onPageChange={(_e, newPage) => {
                    setPage(newPage);
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </AdminTableContainer>
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
                label="Category"
                select
                helperText={newExamForm.formState.errors.category?.message}
                error={!!newExamForm.formState.errors.category}
                {...newExamForm.register("category")}
                sx={{ width: "100%" }}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category}
                  </MenuItem>
                ))}
              </TextField>

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
      <CustomModal
        open={!!deletedExamId}
        onClose={() => setDeletedExamId(null)}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to delete this exam?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => setDeletedExamId(null)}
              sx={{ boxShadow: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleDeleteExam}
              sx={{ width: "80px" }}
            >
              {deleteExamMutation.isPending ? (
                <CircularProgress size={20} />
              ) : (
                "Delete"
              )}
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default ExamIndexPage;
