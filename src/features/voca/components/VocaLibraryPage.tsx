import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Stack,
  Grid2,
  Button,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";

import Content from "../../../components/layout/Content";
import MultipleSelectCheckmarks from "../../../components/UI/MultipleSelectCheckmarks";
import RatingFilterDropdown from "../../../components/UI/RatingFilterDropdown";
import CollectionCard from "../../../components/CollectionCard";
import DotLoadingProgress from "../../../components/UI/DotLoadingProgress";
import Link from "../../../components/UI/Link";
import useCollectionTags from "../../../hooks/useCollectionTags";
import DefaultVocaSetImg from "../../../assets/images/voca/default.png";
import useRecommendedVocaSets from "../../../hooks/useRecommendedVocaSets";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import useDebounce from "../../../hooks/useDebounce";
import VocaSetModel from "../../../types/VocaSetModel";

const ratingOptions = [
  { value: 4.5, label: "4.5 & up", count: 10000 },
  { value: 4.0, label: "4.0 & up", count: 10000 },
  { value: 3.5, label: "3.5 & up", count: 10000 },
  { value: 3.0, label: "3.0 & up", count: 10000 },
];

interface FilterCollectionFormData {
  filterTitle?: string;
  filterCategories?: string[];
}

const VOCA_SET_PAGE_SIZE = 10;

const VocaLibraryPage: React.FC = () => {
  const [page, setPage] = useState(0);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [displayedVocaSets, setDisplayedVocaSets] = useState<VocaSetModel[]>(
    [],
  );

  const [filterInput, setFilterInput] = useState<FilterCollectionFormData>({
    filterTitle: "",
    filterCategories: [],
  }); // use for triggering re-fetching the voca sets

  const resetPage = useCallback(() => {
    setPage(0);
  }, []);

  const debouncedFilterTitle = useDebounce(filterInput.filterTitle, {
    callbackFn: resetPage, // reset page when filter title changes
  });

  const { data: vocaSets, isLoading: isLoadingVocaSets } =
    useRecommendedVocaSets(
      {},
      {
        filterTitle: debouncedFilterTitle,
        filterCategories: filterInput.filterCategories,
        page,
        limit: VOCA_SET_PAGE_SIZE,
      },
    );

  const hasMoreVocaSets = vocaSets?.length == VOCA_SET_PAGE_SIZE;

  useEffect(() => {
    if (vocaSets) {
      if (page == 0) {
        setDisplayedVocaSets(vocaSets);
      } else {
        setDisplayedVocaSets((prev) => [...prev, ...vocaSets]);
      }
    }
  }, [vocaSets, page]);

  const { data: collectionTags } = useCollectionTags();

  return (
    <Content>
      {isLoadingVocaSets && <CustomBackdrop open={true} />}
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" fontWeight={500} gutterBottom>
            Vocabulary Library
          </Typography>
          <Typography variant="subtitle1" mb={4}>
            Explore our library of over 15,000 curated lists.
          </Typography>
          <Paper
            sx={{
              p: "2px 16px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: 8,
              boxShadow: "none",
              backgroundColor: "#f6f8fa",
            }}
            elevation={0}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search vocabulary lists"
              value={filterInput.filterTitle}
              onChange={(e) =>
                setFilterInput({
                  ...filterInput,
                  filterTitle: e.target.value,
                })
              }
            />
            <IconButton type="submit" sx={{ p: "10px", color: "primary.main" }}>
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, mx: 1 }} orientation="vertical" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.main",
                fontWeight: 500,
                fontSize: 16,
                ml: 1,
              }}
              aria-label="Word Finder"
            >
              <TranslateIcon sx={{ mr: 0.5 }} />
              Collection Finder
            </Box>
          </Paper>
          {/* Filter */}

          <Stack direction="row" gap={1} mt={1}>
            <MultipleSelectCheckmarks
              label="Categories"
              itemLabels={collectionTags?.map((tag) => tag.tagName) || []}
              itemValues={collectionTags?.map((tag) => tag.tagName) || []}
              menuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              menuWidth="240px"
              sx={{
                borderRadius: "20px",
                "& .MuiSelect-select": { lineHeight: "24px" },
              }}
              labelType="inside"
              value={filterInput.filterCategories}
              onChange={(value) => {
                setFilterInput({
                  ...filterInput,
                  filterCategories: value as string[],
                });

                resetPage();
              }}
            />

            <RatingFilterDropdown
              options={ratingOptions}
              value={selectedRating}
              onChange={setSelectedRating}
              label="Rating"
            />
          </Stack>
        </Box>

        <Grid2 container rowGap={1.5} sx={{ marginTop: 3 }}>
          {displayedVocaSets?.map((vocaSet) => (
            <Grid2 key={vocaSet.id} size={6}>
              <Link to={`${vocaSet.id}/lessons`} style={{ display: "flex" }}>
                <CollectionCard
                  image={vocaSet.thumbnail || DefaultVocaSetImg}
                  title={vocaSet.name}
                  author={"TienZe"}
                  description={vocaSet.description || ""}
                />
              </Link>
            </Grid2>
          ))}
        </Grid2>

        {isLoadingVocaSets && (
          <Box sx={{ marginTop: 2 }}>
            <DotLoadingProgress />
          </Box>
        )}

        {hasMoreVocaSets && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                borderRadius: "20px",
              }}
              onClick={() => setPage(page + 1)}
            >
              Load more
            </Button>
          </Box>
        )}
      </Box>
    </Content>
  );
};

export default VocaLibraryPage;
