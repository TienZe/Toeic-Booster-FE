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
import { updateFolderDetails } from "../api/user-folder";
import { toast } from "react-toastify";

interface UpdateFolderModalProps extends CustomModalProps {
  id: number;
  initialName: string;
  initialDescription: string;

  onUpdated?: () => void;
}

interface UpdateFolderFormData {
  name: string;
  description: string;
}

const UpdateFolderModal: React.FC<UpdateFolderModalProps> = ({
  open,
  onClose,
  id,
  initialName,
  initialDescription,
  onUpdated,
}) => {
  const {
    register,
    formState: { errors: validationErrors },
    handleSubmit,
  } = useForm<UpdateFolderFormData>({
    defaultValues: {
      name: initialName,
      description: initialDescription,
    },
  });

  const updateFolderMutation = useMutation({
    mutationFn: (request: { name: string; description: string }) =>
      updateFolderDetails({
        name: request.name,
        description: request.description,
        id,
      }),
    onSuccess: () => {
      toast.success("Save successfully");
      onUpdated?.();
      onClose();
    },
  });

  const handleSaveNewFolder: SubmitHandler<UpdateFolderFormData> = (data) => {
    updateFolderMutation.mutate(data);
  };
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      containerSx={{
        borderRadius: "8px",
      }}
    >
      <form onSubmit={handleSubmit(handleSaveNewFolder)}>
        <Box sx={{ padding: 3, minWidth: "578px", py: 2 }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 1.5, textAlign: "center" }}
          >
            Update folder
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
              disabled={updateFolderMutation.isPending}
            >
              {updateFolderMutation.isPending ? (
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

export default UpdateFolderModal;
