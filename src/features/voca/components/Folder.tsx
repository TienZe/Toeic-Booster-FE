import { Box, Typography } from "@mui/material";
import { LessonCard } from "../../../components/LessonCard";
import DefaultFolderImage from "../assets/default-folder.svg";
import React, { useRef, useState } from "react";
import FolderPopup from "./FolderPopup";

interface FolderProps {
  id: number; // folderId
  name: string;
  pinnedWords: number;
  thumbnail?: string | null;
}

const Folder: React.FC<FolderProps> = ({
  name,
  pinnedWords,
  id,
  thumbnail,
}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClickCard = () => {
    setOpenPopup(!openPopup);
  };
  return (
    <Box
      sx={{
        display: "inline-block",
        textAlign: "center",
        position: "relative",
      }}
    >
      <LessonCard
        name={name}
        image={thumbnail || DefaultFolderImage}
        nameSx={{ fontSize: "18px" }}
        onClickCard={handleClickCard}
        cardRef={cardRef}
      />
      <Typography
        component="span"
        sx={{ fontSize: "12px", color: "#afafaf", textAlign: "center" }}
      >
        Pinned: {pinnedWords || 0}
      </Typography>

      <FolderPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        pinnedWords={pinnedWords}
        folderName={name}
        folderId={id}
        anchorEle={cardRef.current}
      />
    </Box>
  );
};
export default Folder;
