import { Box, Grid2, Pagination, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import Content from "../../../components/layout/Content";
import VocaSet from "../../../components/VocaSet";
import SearchInput from "../../../components/UI/SearchInput";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import Link from "../../../components/UI/Link";
import usePaginatedVocaSets from "../../../hooks/usePaginatedVocaSets";
import useDebounce from "../../../hooks/useDebounce";
import { getTotalPages } from "../../../types/PaginatedData";

const VOCA_TAB_INDEX_2_LEVEL = ["all", "beginner", "intermediate", "advanced"];

const VocaLibraryPage: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState<string>();
  const [page, setPage] = useState(1);

  const resetPage = useCallback(() => setPage(1), [setPage]);
  const debouncedSearchValue = useDebounce(searchValue, {
    callbackFn: resetPage,
  });

  const filterLevel = VOCA_TAB_INDEX_2_LEVEL[tabIndex];

  const { data: paginatedVocaSets, isLoading } = usePaginatedVocaSets({
    page: page,
    limit: 12,
    search: debouncedSearchValue,
    level: filterLevel,
  });
  const handleChangeTab = (
    _event: React.SyntheticEvent,
    newTabIndex: number,
  ) => {
    setTabIndex(newTabIndex);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
  };

  return (
    <Content>
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
        <Box></Box>
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Vocabulary Library
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            sx={{
              "& .MuiTab-root": { px: 0.75 },
              borderColor: "divider",
            }}
          >
            <Tab label="All" />
            <Tab label="Beginner" />
            <Tab label="Intermediate" />
            <Tab label="Advanced" />
          </Tabs>
          <Box sx={{ position: "absolute", right: 0, top: 0 }}>
            <SearchInput onChange={handleSearchInputChange} />
          </Box>
        </Box>
        {isLoading && (
          <Box sx={{ marginTop: 2 }}>
            <DotLoadingProgress />
          </Box>
        )}

        <Grid2 container rowGap={1.5} sx={{ marginTop: 1.5 }}>
          {paginatedVocaSets?.data.map((vocaSet) => (
            <Grid2
              key={vocaSet.id}
              sx={{ width: "250px", marginRight: 1, display: "flex" }}
            >
              <Link to={`${vocaSet.id}/lessons`} style={{ display: "flex" }}>
                <VocaSet
                  id={vocaSet.id}
                  title={vocaSet.name}
                  qualification={vocaSet.level}
                  takenNumber={vocaSet.userCount}
                  image={vocaSet.thumbnail}
                />
              </Link>
            </Grid2>
          ))}
        </Grid2>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Pagination
            count={getTotalPages(paginatedVocaSets)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </Content>
  );
};

export default VocaLibraryPage;
