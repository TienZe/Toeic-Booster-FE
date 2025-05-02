import {
  Box,
  Button,
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
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import RoundedInput from "../../../../components/UI/RoundedInput";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import VocaSetRow from "./VocaSetRow";
import AdminTableContainer from "./AdminTableContainer";
import {
  Add,
  AddPhotoAlternate,
  FilterAlt,
  FilterAltOff,
} from "@mui/icons-material";
import CustomModal from "../../../../components/UI/CustomModal.tsx";
import TextFieldFileInput from "./TextFieldFileInput.tsx";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image } from "../../../../components/UI/Image.tsx";
import {
  fileList2Base64,
  getPlaceholderImage,
} from "../../../../utils/helper.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVocaSet, deleteVocaSet } from "../api/voca-set-api.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import VocaSetModel from "../../../../types/VocaSetModel.ts";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop.tsx";
import usePaginatedVocaSets from "../../../../hooks/usePaginatedVocaSets.ts";
import MultipleSelect from "../../../../components/UI/MultipleSelect.tsx";
import useCollectionTags from "../../../../hooks/useCollectionTags.ts";
import MultipleSelectCheckmarks from "../../../../components/UI/MultipleSelectCheckmarks.tsx";

interface NewVocaSetFormData {
  name: string;
  categories: string[];
  thumbnail?: string | FileList;
}

interface VocaSetFilterFormData {
  filterName: string;
  filterCategories: number[];
}

const newVocaSetRules = {
  name: {
    required: "Name is required",
  },
  categories: {
    required: "Categories is required",
    validate: (value: string[]) => {
      if (value.length === 0) {
        return "Please select at least one category";
      }
    },
  },
  thumbnail: {
    // required: "Thumbnail is required",
  },
};

const DEFAULT_FILTER_FORM_DATA: VocaSetFilterFormData = {
  filterName: "",
  filterCategories: [],
};

const VOCASET_PAGE_SIZE = 5;

const VocaIndexPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [deletedVocaSet, setDeletedVocaSet] = useState<string | null>(null);

  const openDeleteModal = deletedVocaSet !== null;

  const {
    register,
    // control,
    setValue,
    formState: { errors: validationErrors },
    handleSubmit,
  } = useForm<NewVocaSetFormData>({
    defaultValues: {
      name: "",
      categories: [],
      thumbnail: "",
    },
  });

  const [newThumbnail, setNewThumbnail] = useState<string>(
    getPlaceholderImage(250, 140),
  );

  const navigate = useNavigate();

  const { data: collectionTags } = useCollectionTags();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewVocaSetFormData) => {
      const responseData = await createVocaSet({
        name: data.name,
        tags: data.categories,
        thumbnail: data.thumbnail as string,
      });

      return responseData;
    },
    onSuccess: (responseData: VocaSetModel) => {
      console.log("Post successfull, reponseData", responseData);
      navigate(`/admin/voca-set/details?id=${responseData.id}`);
      queryClient.setQueryData(
        ["vocaSet", { id: responseData.id }],
        responseData,
      );
      toast.success("Create new collection successfully!");
    },
  });

  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState<string>();
  const [filterCategories, setFilterCategories] = useState<number[]>();

  const {
    reset: resetFilterForm,
    control,
    handleSubmit: handleFilter,
  } = useForm<VocaSetFilterFormData>({
    defaultValues: DEFAULT_FILTER_FORM_DATA,
  });

  const { data: paginatedVocaSets, isLoading } = usePaginatedVocaSets({
    page: page,
    limit: VOCASET_PAGE_SIZE,
    search: filterName,
    categories: filterCategories,
  });

  const deleteVocaSetMutation = useMutation({
    mutationFn: deleteVocaSet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "vocaSet",
          {
            page: page,
            limit: VOCASET_PAGE_SIZE,
            search: filterName,
            categories: filterCategories,
          },
        ],
      });
      toast.success("Delete vocabulary set successfully!");
    },
    onSettled: () => {
      // reset state
      setDeletedVocaSet(null);
      deleteVocaSetMutation.reset();
    },
  });

  const handleCreateVocaSet = async (data: NewVocaSetFormData) => {
    console.log("data post create new collection", data);
    if (data.thumbnail) {
      data.thumbnail = await fileList2Base64(data.thumbnail as FileList);
    }

    mutate(data);
  };

  const handleFilterTable: SubmitHandler<VocaSetFilterFormData> = (
    formData,
  ) => {
    const { filterName, filterCategories } = formData;

    console.log("filter form data", formData);

    // Set filter state to trigger re-fetch data
    setFilterName(filterName);
    setFilterCategories(filterCategories);

    setPage(1);
  };

  const handleResetFilter = () => {
    setPage(1);

    resetFilterForm(DEFAULT_FILTER_FORM_DATA);

    // Reset filter state to trigger re-fetch data
    setFilterName(undefined);
    setFilterCategories(undefined);
  };

  const handleDeleteVocaSet = () => {
    if (deletedVocaSet) {
      deleteVocaSetMutation.mutate(deletedVocaSet);
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
            Vocabulary Collections
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
          id="filter-voca-sets-form"
          style={{ marginBottom: "2rem" }}
          onSubmit={handleFilter(handleFilterTable)}
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
                    borderRadius={4}
                    gap={0.5}
                    labelColor="secondary.main"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={3}>
              {/* Controlled input, only need 2 way binding: the value and onChange props*/}
              {/* It's different from the uncontrolled input (via form.register) - the value of the input is not controlled by the 
                  parent component, and it is managed and obtained by using the ref.*/}
              <Controller
                name="filterCategories"
                control={control}
                render={({ field }) => (
                  <MultipleSelectCheckmarks
                    label="Categories"
                    itemLabels={collectionTags?.map((tag) => tag.tagName) || []}
                    itemValues={collectionTags?.map((tag) => tag.id) || []}
                    bootstrapSelect={true}
                    formControlSx={{ width: "100%" }}
                    onChange={(newValue) =>
                      field.onChange({ target: { value: newValue } })
                    }
                    value={field.value}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </Grid2>
            <Grid2
              size={3}
              display="flex"
              sx={{
                columnGap: 1,
                "& > button": {
                  flexShrink: 0,
                },
              }}
              alignItems="end"
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<FilterAlt />}
              >
                Filter
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
            <Grid2 size={2} display="flex" alignItems="end"></Grid2>
          </Grid2>
        </form>

        {isLoading && <CustomBackdrop open />}

        <AdminTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>ID</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell>Level</TableCell> */}
                <TableCell width={200}>Taken Students</TableCell>
                <TableCell width={100}>Lessons</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedVocaSets?.items.map((vocaSet: VocaSetModel) => (
                <VocaSetRow
                  key={vocaSet.id}
                  vocaSet={vocaSet}
                  onDelete={() => setDeletedVocaSet(vocaSet.id)}
                />
              ))}
              {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 106 * emptyRows,
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
                  rowsPerPageOptions={[VOCASET_PAGE_SIZE]}
                  count={paginatedVocaSets?.total || 0}
                  rowsPerPage={VOCASET_PAGE_SIZE}
                  page={page - 1} // Mui uses 0-based index
                  onPageChange={(_event, newPage) => setPage(newPage + 1)}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </AdminTableContainer>
      </Box>

      {/*  New voca set modal */}
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
            New Collection
          </Typography>

          <form
            id="new-voca-set-form"
            onSubmit={handleSubmit(handleCreateVocaSet)}
          >
            <Stack spacing={1}>
              <TextField
                label="Name"
                helperText={validationErrors.name?.message}
                error={!!validationErrors.name}
                {...register("name", newVocaSetRules.name)}
                sx={{ width: "100%" }}
              />

              <MultipleSelect
                label="Categories"
                itemLabels={collectionTags?.map((tag) => tag.tagName) || []}
                itemValues={collectionTags?.map((tag) => tag.id) || []}
                register={register("categories", newVocaSetRules.categories)}
                validationError={validationErrors.categories?.message}
                onChange={(newValue) => {
                  setValue("categories", newValue as string[]);
                }}
              />

              <TextFieldFileInput
                label="Thumbnail"
                helperText={validationErrors.thumbnail?.message}
                error={!!validationErrors.thumbnail}
                sx={{ width: "100%" }}
                iconButton={<AddPhotoAlternate />}
                onChangeFile={(newFileSrc) => setNewThumbnail(newFileSrc)}
                register={register("thumbnail", newVocaSetRules.thumbnail)}
              />

              <Image
                src={newThumbnail}
                sx={{
                  width: "250px",
                  height: "140px",
                  mx: "auto !important",
                }}
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
                  sx={{ minWidth: "110px" }}
                  disabled={isPending}
                >
                  {isPending ? <CircularProgress size={20} /> : "Create"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </CustomModal>

      {/* Delete voca set modal */}
      <CustomModal
        open={openDeleteModal}
        onClose={() => setDeletedVocaSet(null)}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to delete this voca set?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteVocaSet}
              sx={{ width: "80px" }}
            >
              {deleteVocaSetMutation.isPending ? (
                <CircularProgress size={20} color="error" />
              ) : (
                "Delete"
              )}
            </Button>
            <Button variant="contained" onClick={() => setDeletedVocaSet(null)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </>
  );
};

export default VocaIndexPage;
