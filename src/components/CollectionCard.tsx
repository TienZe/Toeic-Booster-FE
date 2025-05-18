import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";

import { briefString } from "../utils/stringFormatter";

export type CollectionCardProps = {
  image: string;
  title: string;
  author: string;
  description: string;
  onLearn?: () => void;
  learnLabel?: string;
};

const CollectionCard: React.FC<CollectionCardProps> = ({
  image,
  title,
  author,
  description,
  onLearn,
  learnLabel = "Learn",
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "flex-start",
        boxShadow: 0,
        borderRadius: 2,
        p: 1,
        minWidth: 400,
        maxWidth: 520,
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: 100,
          height: "auto",
          objectFit: "cover",
          borderRadius: 1,
          boxShadow: "3px 3px 10px 0 rgba(0,0,0,.38)",
          mr: 1,
        }}
      />
      <CardContent sx={{ flex: 1, p: 0, "&:last-child": { pb: 0 } }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h6"
              component="div"
              color="primary.main"
              fontWeight={400}
              sx={{ fontSize: 18, lineHeight: 1.1, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography sx={{ mb: 0.5 }}>{author}</Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: 64,
              mt: 0.5,
              borderRadius: "4px",
              textTransform: "none",
              borderColor:
                "rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23);",
              color: "text.primary",
            }}
            onClick={onLearn}
          >
            {learnLabel}
          </Button>
        </Stack>
        <Typography
          sx={{
            mt: 0.5,
          }}
        >
          {briefString(description, 160)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
