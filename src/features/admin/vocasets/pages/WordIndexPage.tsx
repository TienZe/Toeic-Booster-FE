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
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import RoundedInput from "../../../../components/UI/RoundedInput";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import AdminTableContainer from "../components/AdminTableContainer";
import {
  Add,
  Delete,
  Edit,
  FilterAlt,
  FilterAltOff,
} from "@mui/icons-material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Image } from "../../../../components/UI/Image.tsx";
import { getWordThumbnail } from "../../../../utils/helper.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop.tsx";
import VocabularyDetailsPage from "./VocabularyDetailsPage.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { deleteWord, getSystemWords } from "../api/vocabulary-api.ts";
import { GetSystemWordsRequest } from "../types/GetSystemWordsRequest.ts";
import VocabularyModel from "../../../../types/VocabularyModel.ts";
import CustomModal from "../../../../components/UI/CustomModal.tsx";
import { toast } from "react-toastify";

interface WordFilterFormData {
  filterName: string;
}

const drawerVariants = {
  open: {
    x: 0,
    y: 0,
    display: "block",
  },
  closed: {
    x: "100%",
    y: 0,
  },
};

const DEFAULT_FILTER_FORM_DATA: WordFilterFormData = {
  filterName: "",
};

const WORD_PAGE_SIZE = 5;

const WordIndexPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [openNewModal, setOpenNewModal] = useState(false);
  const [deletedWordId, setDeletedWordId] = useState<string | null>(null);

  const [updatedWordId, setUpdatedWordId] = useState<string | number | null>(
    null,
  );

  const openDeleteModal = deletedWordId !== null;
  const openUpdateDrawer = updatedWordId !== null;

  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState<string>();

  const { data: paginatedWords, isLoading: isLoadingWords } = useQuery({
    queryKey: [
      "word",
      {
        page: page,
        limit: WORD_PAGE_SIZE,
        search: filterName,
      },
    ],
    queryFn: ({ queryKey }) =>
      getSystemWords(queryKey[1] as GetSystemWordsRequest),
  });

  const {
    reset: resetFilterForm,
    control,
    handleSubmit: handleFilter,
  } = useForm<WordFilterFormData>({
    defaultValues: DEFAULT_FILTER_FORM_DATA,
  });

  const deleteWordMutation = useMutation({
    mutationFn: deleteWord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "word",
          {
            page: page,
            limit: WORD_PAGE_SIZE,
            search: filterName,
          },
        ],
      });
      toast.success("Delete vocabulary successfully!");
    },
    onSettled: () => {
      // reset state
      setDeletedWordId(null);
      deleteWordMutation.reset();
    },
  });

  const handleFilterTable: SubmitHandler<WordFilterFormData> = (formData) => {
    const { filterName } = formData;

    console.log("filter form data", formData);

    // Set filter state to trigger re-fetch data
    setFilterName(filterName);

    setPage(1);
  };

  const handleResetFilter = () => {
    setPage(1);

    resetFilterForm(DEFAULT_FILTER_FORM_DATA);

    // Reset filter state to trigger re-fetch data
    setFilterName(undefined);
  };

  const handleDeleteWord = () => {
    if (deletedWordId) {
      deleteWordMutation.mutate(deletedWordId);
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Vocabularies
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

        {isLoadingWords && <CustomBackdrop open />}

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
              {paginatedWords?.items.map((voca: VocabularyModel) => (
                <TableRow>
                  <TableCell
                    sx={{
                      maxWidth: "100px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {voca.id}
                  </TableCell>
                  <TableCell align="center">
                    <Image
                      src={getWordThumbnail(voca)}
                      sx={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "6px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{voca.word}</TableCell>
                  <TableCell align="center">{voca.partOfSpeech}</TableCell>
                  <TableCell>{voca.meaning}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="center">
                      <IconButton
                        color="primary"
                        onClick={() => setUpdatedWordId(voca.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeletedWordId(voca.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[WORD_PAGE_SIZE]}
                  count={paginatedWords?.total || 0}
                  rowsPerPage={WORD_PAGE_SIZE}
                  page={page}
                  onPageChange={(_event, newPage) => setPage(newPage)}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </AdminTableContainer>
      </Box>

      {/* Drawer creating new word */}
      <AnimatePresence>
        {openNewModal && (
          <motion.div
            initial={{ x: "100%", y: 0, display: "none" }} // start state to animate when component is mounted
            animate={"open"} // mount animation
            exit={"closed"} // unmount animation
            variants={drawerVariants}
            transition={{ duration: 0.3, type: "tween" }}
            style={{ position: "absolute", left: 0, top: 0, zIndex: 1000 }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                minHeight: "100%",
              }}
            >
              <VocabularyDetailsPage
                mode="create"
                onClose={() => setOpenNewModal(false)}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer updating word */}
      <AnimatePresence>
        {openUpdateDrawer && (
          <motion.div
            key={updatedWordId}
            initial={{ x: "100%", y: 0, display: "none" }} // start state to animate when component is mounted
            animate={"open"} // mount animation
            exit={"closed"} // unmount animation
            variants={drawerVariants}
            transition={{ duration: 0.3, type: "tween" }}
            style={{ position: "absolute", left: 0, top: 0, zIndex: 1000 }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                minHeight: "100%",
              }}
            >
              <VocabularyDetailsPage
                mode="update"
                wordId={updatedWordId!}
                onClose={() => setUpdatedWordId(null)}
                onWordUpdatedSuccess={() => {
                  queryClient.invalidateQueries({
                    queryKey: [
                      "word",
                      {
                        page: page,
                        limit: WORD_PAGE_SIZE,
                        search: filterName,
                      },
                    ],
                  });
                }}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete word modal */}
      <CustomModal
        open={openDeleteModal}
        onClose={() => setDeletedWordId(null)}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "400" }}>
            Do you want to delete this word?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={() => setDeletedWordId(null)}
              sx={{ boxShadow: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleDeleteWord}
              sx={{ width: "80px" }}
            >
              {deleteWordMutation.isPending ? (
                <CircularProgress size={20} />
              ) : (
                "Delete"
              )}
            </Button>
          </Stack>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default WordIndexPage;
