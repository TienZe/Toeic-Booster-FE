import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Popup, { PopupProps } from "../../../components/UI/Popup";
import Link from "../../../components/UI/Link";
import BoldStrokeButton from "./BoldStrokeButton";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import CustomModal from "../../../components/UI/CustomModal";
import { deleteUserFolder } from "../api/user-folder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface LessonPopupProps extends PopupProps {
  folderId: number;
  folderName: string;
  pinnedWords: number;
}

const FolderPopup: React.FC<LessonPopupProps> = ({
  open = true,
  onClose,
  sx,
  anchorEle,
  folderId,
  folderName,
  pinnedWords,
}) => {
  const queryClient = useQueryClient();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserFolder,
    onSuccess: () => {
      toast.success("The folder has been removed");
      queryClient.invalidateQueries({ queryKey: ["userFolders"] });
    },
  });

  const handleDeleteFolder = () => {
    mutate(folderId);
  };
  return (
    <Popup
      anchorEle={anchorEle}
      open={open}
      onClose={onClose}
      sx={{
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%) translateY(100%)",
      }}
    >
      <Box
        sx={{
          width: "320px",
          padding: "25px 15px",
          minHeight: "160px",
          borderRadius: "20px",
          backgroundColor: "primary.main",
          textAlign: "left",
          ...sx,
        }}
      >
        <Stack direction="row" spacing={0.6}>
          <Typography
            sx={{
              fontSize: "20px",
              textTransform: "uppercase",
              fontWeight: "medium",
              color: "white",
              flexGrow: 1,
            }}
          >
            {folderName}
          </Typography>
          {/* <SettingIcons sx={{ color: "white" }} /> */}
          <IconButton
            sx={{ padding: 0 }}
            onClick={() => setOpenDeleteModal(true)}
          >
            <Delete sx={{ color: "white" }} />
          </IconButton>
        </Stack>
        <Typography sx={{ fontSize: "15px", marginTop: 1, color: "white" }}>
          Pinned words: {pinnedWords}
        </Typography>

        <Link to={`/personal-word-folder/${folderId}`}>
          <BoldStrokeButton
            variant="outlined"
            sx={{ marginTop: "10px", backgroundColor: "white" }}
          >
            VIEW FOLDER
          </BoldStrokeButton>
        </Link>

        <CustomModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        >
          <Box sx={{ width: "370px", textAlign: "center" }}>
            <Typography
              sx={{
                padding: "20px",
                borderBottom: "1px solid #ddd",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Confirm to delete folder
            </Typography>
            <Box sx={{ padding: "20px" }}>
              <Typography>
                This word set is permanently removed from your page, so please
                consider carefully before deleting your word!
              </Typography>
              <Button
                variant="outlined"
                color="error"
                sx={{ marginTop: 1 }}
                onClick={handleDeleteFolder}
              >
                {isDeleting ? "Deleting..." : "I understand"}
              </Button>
            </Box>
          </Box>
        </CustomModal>

        {/* top arrow */}
        <Box
          sx={{
            width: "15px",
            height: "15px",
            position: "absolute",
            backgroundColor: "inherit",
            top: -6,
            left: "calc(50% - 15px)",
            transform: "rotate(45deg)",
          }}
        ></Box>
      </Box>
    </Popup>
  );
};

export default FolderPopup;
