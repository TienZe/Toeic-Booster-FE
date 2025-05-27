import {
  Box,
  Chip,
  Grid2,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  // fetchAllExam,
  fetchListTags,
} from "../../../admin/new_exams/api/examApi";
import DotLoadingProgress from "../../../../components/UI/DotLoadingProgress";
import ExamCard from "../../../home/components/ExamCard";
import { Tag } from "../../types/Tags";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import usePaginatedToeicExams from "../../../../hooks/usePaginatedToeicExams";
import UserToeicInfoLayout from "../../../../components/layout/toeic/UserToeicInfoLayout";

const LIMIT = 9;

const ExamsLibraryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tagId = searchParams.get("tag_id") || "";
  const [page, setPage] = useState(0);
  const [selectedTag, setSelectedTag] = useState<Tag | null>();
  const [search, setSearch] = useState("");
  const [searchValueDebounce, setSearchValueDebounce] = useState("");

  useEffect(() => {
    if (!tagId) {
      setSelectedTag(null);
    }
  });

  const { data: paginatedExams, isLoading: isLoadingPaginatedExams } =
    usePaginatedToeicExams(
      {},
      {
        page,
        limit: LIMIT,
      },
    );

  const { data: tags, isPending: isPendingTags } = useQuery({
    queryKey: ["FetchListTags"],
    queryFn: () => fetchListTags(),
  });

  const handleTagClick = (tag: Tag) => {
    setSelectedTag(tag);
    setSearchParams(tag.id !== "" ? { tag_id: tag.id } : {});
    setPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValueDebounce(value);
    }, 1000),
    [],
  );
  return (
    <UserToeicInfoLayout>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Exam Library
      </Typography>
      {isPendingTags || isLoadingPaginatedExams ? (
        <Box sx={{ marginTop: 2 }}>
          <DotLoadingProgress />
        </Box>
      ) : (
        <>
          <Box mb={1}>
            <Chip
              key={0}
              label={"All"}
              clickable
              color={selectedTag === null ? "primary" : "default"}
              onClick={() => handleTagClick({ id: "", name: "All" })}
              sx={{ padding: 0.9, marginRight: 0.75 }}
            />
            {tags?.map((tag) => {
              return (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  clickable
                  color={
                    selectedTag?.name.includes(tag.name) ? "primary" : "default"
                  }
                  onClick={() => handleTagClick(tag)}
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
            value={search}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
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
      )}
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
