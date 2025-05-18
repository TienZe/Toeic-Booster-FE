import {
  Box,
  Pagination,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Divider,
  Stack,
  Grid2,
} from "@mui/material";
import { useState } from "react";
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

const ratingOptions = [
  { value: 4.5, label: "4.5 & up", count: 10000 },
  { value: 4.0, label: "4.0 & up", count: 10000 },
  { value: 3.5, label: "3.5 & up", count: 10000 },
  { value: 3.0, label: "3.0 & up", count: 10000 },
];

const VocaLibraryPage: React.FC = () => {
  const [page, setPage] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const [selectedRating, setSelectedRating] = useState<number | null>(4.5);

  const { data: vocaSets, isLoading: isLoadingVocaSets } =
    useRecommendedVocaSets();

  const { data: collectionTags } = useCollectionTags();

  return (
    <Content>
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 3, px: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" fontWeight={500} gutterBottom>
            Vocabulary Library
          </Typography>
          <Typography variant="subtitle1" mb={4}>
            Explore our library of over 15,000 curated lists.
          </Typography>
          <Paper
            component="form"
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
              itemValues={collectionTags?.map((tag) => tag.id) || []}
              value={selectedCategories}
              onChange={(newSelectedCategories) =>
                setSelectedCategories(newSelectedCategories as number[])
              }
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
              sx={{ borderRadius: "20px" }}
              labelType="inside"
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
          {vocaSets?.map((vocaSet) => (
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Pagination
            count={0}
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
