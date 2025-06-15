import {
  Box,
  Chip,
  Grid2,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import DotLoadingProgress from "../../../../components/UI/DotLoadingProgress";
import ExamCard from "../../../home/components/ExamCard";
import SearchIcon from "@mui/icons-material/Search";
import usePaginatedToeicExams from "../../../../hooks/usePaginatedToeicExams";
import UserToeicInfoLayout from "../../../../components/layout/toeic/UserToeicInfoLayout";
import useDebounce from "../../../../hooks/useDebounce";
import useToeicCategories from "../../../../hooks/useToeicCategories";
import { Clear } from "@mui/icons-material";

const EXAM_PAGE_SIZE = 9;

interface IFilterExamForm {
  search: string;
  filterCategory?: number;
}

const DEFAULT_EXAM_FILTER_FORM: IFilterExamForm = {
  search: "",
  filterCategory: undefined,
};

const ExamsLibraryPage = () => {
  const [page, setPage] = useState(0);

  const [filterFormData, setFilterFormData] = useState<IFilterExamForm>(
    DEFAULT_EXAM_FILTER_FORM,
  );

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  const debouncedSearch = useDebounce(filterFormData.search, {
    callbackFn: resetPage,
  });

  const { data: paginatedExams, isLoading: isLoadingPaginatedExams } =
    usePaginatedToeicExams(
      {},
      {
        page,
        limit: EXAM_PAGE_SIZE,
        search: debouncedSearch,
        filteredCategory: filterFormData.filterCategory,
        filteredStatus: "active",
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

  const handleTagClick = (categoryId: number | undefined) => {
    setFilterFormData({
      ...filterFormData,
      filterCategory: categoryId,
    });

    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFormData({
      ...filterFormData,
      search: event.target.value,
    });
  };

  return (
    <UserToeicInfoLayout>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Exam Library
      </Typography>

      <>
        <Box mb={1}>
          {categoryItems?.map((category) => {
            return (
              <Chip
                key={category.value}
                label={category.label}
                clickable
                color={
                  filterFormData.filterCategory === category.value
                    ? "primary"
                    : "default"
                }
                onClick={() => handleTagClick(category.value)}
                sx={{ padding: 0.9, marginRight: 0.75 }}
              />
            );
          })}
        </Box>

        <TextField
          sx={{
            width: "100%",
            paddingRight: 4.5,
          }}
          variant="outlined"
          value={filterFormData.search}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ display: filterFormData.search ? "block" : "none" }}
                onClick={() =>
                  setFilterFormData((prev) => ({
                    ...prev,
                    search: "",
                  }))
                }
              >
                <Clear />
              </InputAdornment>
            ),
          }}
        />

        {isLoadingPaginatedExams ? (
          <Box sx={{ marginTop: 2 }}>
            <DotLoadingProgress />
          </Box>
        ) : (
          <Grid2 container rowGap={1.5} my={3}>
            {paginatedExams && paginatedExams.items.length > 0
              ? paginatedExams.items.map((exam) => {
                  return (
                    <Grid2 key={exam.id} sx={{ width: "275px" }}>
                      <ExamCard
                        id={exam.id}
                        title={exam.name}
                        duration={"120p"}
                        totalParticipants={100}
                        totalComments={123}
                        numOfParts={7}
                        numOfQuestions={200}
                        tags={["Listening", "Reading"]}
                      />
                    </Grid2>
                  );
                })
              : "No data"}
          </Grid2>
        )}
      </>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Pagination
          count={paginatedExams?.totalPages || 1}
          page={page + 1}
          onChange={(_, value) => setPage(value - 1)}
          color="primary"
        />
      </Box>
    </UserToeicInfoLayout>
  );
};

export default ExamsLibraryPage;
