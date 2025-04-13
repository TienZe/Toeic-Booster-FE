import { Add, FilterAlt, FilterAltOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  TextField,
  Typography,
} from "@mui/material";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { fetchAllListenGroup } from "../../../listen/api/ListListenGroupApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import ListenGroupRow from "../components/ListenGroupRow";
import CustomModal from "../../../../components/UI/CustomModal";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import { ListenGroupModel } from "../types/ListListenGroup.type";
import {
  createListenGroup,
  deleteListenGroup,
} from "../api/listenGroupAdminApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const level = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];
const levelForm = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];
interface NewListenGroupFormData {
  name: string;
  level: string;
}

const newListenGroupRules = {
  name: {
    required: "Name is required",
  },
  level: {
    required: "Level is required",
  },
};
type filterType = "all" | "beginner" | "intermediate" | "advanced";

const ListenGroupAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [type, setType] = useState<filterType>("all");
  const [typeParams, setTypeParams] = useState<filterType>("all");
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useState("");
  const [openNewModal, setOpenNewModal] = useState(false);
  const [deletedListenGroup, setDeletedListenGroup] = useState<string | null>(
    null,
  );
  const { data, isLoading } = useQuery({
    queryKey: ["listenGroupSet", page, limit, typeParams, searchParams],
    queryFn: () => fetchAllListenGroup(typeParams, searchParams, page, limit),
  });

  const {
    register,
    // control,
    formState: { errors: validationErrors },
    handleSubmit,
  } = useForm<NewListenGroupFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewListenGroupFormData) => {
      const responseData = await createListenGroup({
        name: data.name,
        level: data.level,
      });

      return responseData;
    },
    onSuccess: (responseData: ListenGroupModel) => {
      console.log("Post successfull, reponseData", responseData);
      navigate(`/admin/listen-group/${responseData.id}`);
      toast.success("Create new listen group set successfully!");
    },
  });

  const deleteListenGroupMutation = useMutation({
    mutationFn: deleteListenGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listenGroupSet"] });
      toast.success("Delete listen group successfully!");
    },
    onSettled: () => {
      // reset state
      setDeletedListenGroup(null);
      deleteListenGroupMutation.reset();
    },
  });

  const handleCreateListenGroup = async (data: NewListenGroupFormData) => {
    mutate(data);
  };
  // const debouncedSearch = useCallback(
  //   debounce((value: string) => {
  //     setSearchParams(value);
  //   }, 1000),
  //   [],
  // );

  // const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setSearch(value);
  //   setPage(1);
  //   debouncedSearch(value);
  // }, []);

  const handleSearch = () => {
    setPage(1);
    setSearchParams(search);
    setTypeParams(type);
  };
  const handleClear = () => {
    setPage(1);
    setSearch("");
    setType("all");
  };
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as filterType);
  };

  const handleDeleteListenGroup = () => {
    if (deletedListenGroup) {
      deleteListenGroupMutation.mutate(deletedListenGroup);
    }
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
            Listen Practice Set Detail
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
          sx={{ maxWidth: "900px", marginBottom: 2 }}
        >
          <Grid2 size={5}>
            <TextField
              value={search}
              onChange={handleChangeSearch}
              sx={{ width: "100%" }}
              label="Search"
            />
          </Grid2>
          <Grid2 size={3}>
            <TextField
              id="outlined-select-currenclisteny"
              select
              label="Select"
              defaultValue="all"
              sx={{ width: "100%" }}
              onChange={handleChangeType}
            >
              {level.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 size={2} display="flex" alignItems="end">
            <Button
              onClick={handleSearch}
              variant="contained"
              startIcon={<FilterAlt />}
              sx={{ py: "12px", px: 3, marginBottom: "3px" }}
            >
              Filter
            </Button>
          </Grid2>
          <Grid2 size={2} display="flex" alignItems="end">
            <Button
              onClick={handleClear}
              variant="outlined"
              startIcon={<FilterAltOff />}
              sx={{ py: "12px", px: 3, marginBottom: "3px" }}
            >
              Clear
            </Button>
          </Grid2>
        </Grid2>

        {isLoading ? (
          <CustomBackdrop open />
        ) : (
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ height: "20px" }} width={100}>
                    ID
                  </TableCell>
                  <TableCell sx={{ height: "20px" }}>Name</TableCell>
                  <TableCell sx={{ height: "20px" }}>Level</TableCell>
                  <TableCell sx={{ height: "20px" }}>Lessons</TableCell>
                  <TableCell sx={{ height: "20px" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data.map((listenGroup) => (
                  <ListenGroupRow
                    key={listenGroup.id}
                    listenGroup={listenGroup}
                    onDelete={() => setDeletedListenGroup(listenGroup.id)}
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
                    count={data?.total || 0}
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

      <CustomModal
        open={openNewModal}
        onClose={() => setOpenNewModal(false)}
        sx={{ minWidth: "500px", padding: 4 }}
      >
        <Box sx={{}}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 2.5, textAlign: "center" }}
          >
            New Listen Practice Set
          </Typography>

          <form
            id="new-voca-set-form"
            onSubmit={handleSubmit(handleCreateListenGroup)}
          >
            <Stack spacing={1}>
              <TextField
                label="Name"
                helperText={validationErrors.name?.message}
                error={!!validationErrors.name}
                {...register("name", newListenGroupRules.name)}
                sx={{ width: "100%" }}
              />
              <TextField
                label="Level"
                select
                helperText={validationErrors.level?.message}
                error={!!validationErrors.level}
                {...register("level", newListenGroupRules.level)}
                sx={{ width: "100%" }}
              >
                {levelForm.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {capitalizeFirstLetter(level.label)}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={0.5} justifyContent="end">
                <Button
                  variant="outlined"
                  sx={{ px: "24px" }}
                  onClick={() => setOpenNewModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ px: "24px", minWidth: "110px" }}
                  disabled={isPending}
                >
                  {isPending ? <CircularProgress size={20} /> : "Create"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </CustomModal>

      {/* Delete modal */}
      <CustomModal
        open={!!deletedListenGroup}
        onClose={() => setDeletedListenGroup(null)}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to delete this listen group?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteListenGroup}
              sx={{ width: "80px" }}
              disabled={deleteListenGroupMutation.isPending}
            >
              {deleteListenGroupMutation.isPending ? (
                <CircularProgress size={20} color="error" />
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              variant="contained"
              onClick={() => setDeletedListenGroup(null)}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default ListenGroupAdmin;
