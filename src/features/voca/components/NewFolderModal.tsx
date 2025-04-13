import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../components/UI/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import BoldStrokeButton from "./BoldStrokeButton";
import { useMutation } from "@tanstack/react-query";
import { createNewFolder, pinWordToNewFolder } from "../api/user-folder";
import { NewUserFolderRequest } from "../types/UserFolderRequest";
import { toast } from "react-toastify";

interface NewWordFolderModalProps extends CustomModalProps {
  vocaId?: string;
  onCreated?: () => void; // create new folder successfully
}

interface NewWordFolderFormData {
  name: string;
  description: string;
}

const NewWordFolderModal: React.FC<NewWordFolderModalProps> = ({
  open,
  onClose,
  vocaId,
  onCreated,
}) => {
  const {
    register,
    formState: { errors: validationErrors },
    handleSubmit,
  } = useForm<NewWordFolderFormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const newFolderMutation = useMutation({
    mutationFn: createNewFolder,
    onSuccess: () => {
      toast.success("New folder has been created");
      onClose();
      onCreated?.();
    },
  });

  const pinWordToNewFolderMutation = useMutation({
    mutationFn: (newFolderRequest: NewUserFolderRequest) =>
      pinWordToNewFolder(newFolderRequest, vocaId!),
    onSuccess: () => {
      onClose();
      toast.success("Word has been pinned");
    },
  });

  const handleSaveNewFolder: SubmitHandler<NewWordFolderFormData> = (data) => {
    const request: NewUserFolderRequest = {
      name: data.name,
      description: data.description,
    };

    if (vocaId) {
      pinWordToNewFolderMutation.mutate(request);
    } else {
      newFolderMutation.mutate(request);
    }
  };
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      containerSx={{
        // top: 20,
        // left: "50%",
        // transform: "translateX(-50%)",
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit(handleSaveNewFolder)}>
        <Box sx={{ padding: 3, minWidth: "578px", py: 2 }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 1.5, textAlign: "center" }}
          >
            Create new folder
          </Typography>

          {/* Folder */}
          <Stack sx={{ marginBottom: 1 }}>
            {/* {expandNewFolderForm && ( */}
            <Stack spacing={1}>
              <TextField
                label="Folder name"
                sx={{ backgroundColor: "white", width: "100%" }}
                error={!!validationErrors.name}
                helperText={validationErrors.name?.message}
                {...register("name", { required: "Folder name is required" })}
              />
              <TextField
                label="Description"
                multiline
                rows={2}
                sx={{ backgroundColor: "white", width: "100%" }}
                {...register("description")}
              />
            </Stack>
            {/* )} */}
          </Stack>

          {/* Flashcard */}
          <Box sx={{ marginTop: "10px" }}>
            <BoldStrokeButton
              type="submit"
              variant="contained"
              sx={{
                px: 3,
                display: "block",
                marginLeft: "auto",
                borderBottomWidth: "4px",
              }}
              disabled={newFolderMutation.isPending}
            >
              {newFolderMutation.isPending ? (
                <CircularProgress size={20} />
              ) : (
                "Save"
              )}
            </BoldStrokeButton>
          </Box>
        </Box>
      </form>
    </CustomModal>
  );
};

export default NewWordFolderModal;
