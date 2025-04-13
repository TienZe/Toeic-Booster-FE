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
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import RoundedInput from "../../../../components/UI/RoundedInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEntireExam, fetchAllExam } from "../api/examApi";
import { useNavigate } from "react-router-dom";
import { IExamModel } from "../types/Exam";
import { useState } from "react";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import ExamSetRow from "./ExamSetRow";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import CustomModal from "../../../../components/UI/CustomModal";
import queryClient from "../../../../queryClient";
import { toast } from "react-toastify";

const ExamSet = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [deletedExam, setDeletedExam] = useState<string | null>(null);

  interface IFilterExamForm {
    filterName: string;
    filterStatus: string;
  }

  const DEFAULT_EXAM_FILTER_FORM: IFilterExamForm = {
    filterName: "",
    filterStatus: "all",
  };

  const { isPending, data: examSetData } = useQuery({
    queryKey: ["fetchExam", page, limit, search],
    queryFn: () => fetchAllExam(undefined, page, limit, search),
  });

  console.log("examsetdata", examSetData);

  // useEffect(() => {
  //   setExamSets(examSetData?.data);
  // }, [examSetData]);

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
    setSearch(filterName);
    setPage(1);
  };

  const handleResetFilter = () => {
    resetFilterForm(DEFAULT_EXAM_FILTER_FORM);
    setSearch("");
    setPage(1);
  };

  // const { page, setPage, emptyRows, pageData, handleChangePage } =
  //   useAdminTablePagination<IExamModel>(examSets || [], EXAMSET_PAGE_SIZE);

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
            onClick={() => navigate("/admin/createExam")}
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
            {/* <Grid2 size={3}>
              <Controller
                name="filterStatus"
                control={control}
                render={({ field }) => (
                  <BootstrapSelect
                    {...field}
                    label="Status"
                    defaultValue="all"
                    itemLabels={["All", "Active", "Inactive"]}
                    itemValues={["all", "active", "inactive"]}
                  />
                )}
              />
            </Grid2> */}
            <Grid2 size={2} display="flex" alignItems="end">
              <Button
                type="submit"
                variant="contained"
                startIcon={<FilterAlt />}
                sx={{ py: "12px", px: 3, marginBottom: "3px" }}
              >
                Search
              </Button>
            </Grid2>
            <Grid2 size={2} display="flex" alignItems="end">
              <Button
                onClick={handleResetFilter}
                type="reset"
                variant="outlined"
                startIcon={<FilterAltOff />}
                sx={{ py: "12px", px: 3, marginBottom: "3px" }}
              >
                Clear
              </Button>
            </Grid2>
          </Grid2>
        </form>

        {isPending ? (
          <CustomBackdrop open />
        ) : (
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width="30%">ID</TableCell>
                  <TableCell width="25%">Name</TableCell>
                  <TableCell width="10%">Time</TableCell>
                  {/* <TableCell width="10%">Taken</TableCell> */}
                  <TableCell width="10%">Tag</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSetData?.data?.map((examSet: IExamModel) => (
                  <ExamSetRow
                    key={examSet.id}
                    examSet={examSet}
                    onDelete={() => setDeletedExam(examSet.id)}
                  />
                ))}
                {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                      backgroundColor: "white",
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )} */}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    count={examSetData?.total || 0}
                    rowsPerPage={limit}
                    page={page - 1}
                    onPageChange={(_e, newPage) => {
                      setPage(newPage + 1);
                    }}
                    onRowsPerPageChange={(e) => {
                      setLimit(+e.target.value);
                      setPage(1);
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>
        )}
      </Box>
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

export default ExamSet;
