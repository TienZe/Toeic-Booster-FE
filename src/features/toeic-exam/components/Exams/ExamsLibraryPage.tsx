import {
  Box,
  Chip,
  Grid2,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import InforUserBox from "../InforUserBox";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  // fetchAllExam,
  fetchListTags,
} from "../../../admin/new_exams/api/examApi";
import DotLoadingProgress from "../../../../components/UI/DotLoadingProgress";
import ExamCard from "../../../home/components/ExamCard";
import Content from "../../../../components/layout/Content";
import { Tag } from "../../types/Tags";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import usePaginatedToeicExams from "../../../../hooks/usePaginatedToeicExams";

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
    <Content>
      <Box sx={{ flexGrow: 1, maxWidth: "1250px", mx: "auto", py: 3, px: 2 }}>
        <Grid container spacing={2}>
          <Grid size={9}>
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
                          selectedTag?.name.includes(tag.name)
                            ? "primary"
                            : "default"
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
                            <Grid2 sx={{ width: "275px" }}>
                              <ExamCard
                                key={exam.id}
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
          </Grid>
          <Grid size={3}>
            {" "}
            <Box
              sx={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "fit-content",
                padding: "30px",
              }}
            >
              <InforUserBox />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Content>
  );
};

export default ExamsLibraryPage;
