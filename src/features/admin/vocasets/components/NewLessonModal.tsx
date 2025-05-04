import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../../components/UI/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createNewLesson } from "../api/lesson-api";
import NewLessonRequest from "../types/NewLessonRequest";
import TextFieldFileInput from "./TextFieldFileInput";
import { AddPhotoAlternate } from "@mui/icons-material";
import { fileList2Base64, getPlaceholderImage } from "../../../../utils/helper";
import { useState } from "react";
import { Image } from "../../../../components/UI/Image";
import Lesson from "../../../../types/Lesson";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface NewLessonModalProps extends CustomModalProps {
  vocaSetId: string;
  onCancel?: () => void;
}

interface NewLessonFormData {
  name: string;
  thumbnail: FileList;
}

const NewLessonModal: React.FC<NewLessonModalProps> = ({
  vocaSetId,
  onCancel,
  ...props
}) => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLessonFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (request: NewLessonRequest) => createNewLesson(request),
    onSuccess: (responseData: Lesson) => {
      console.log("New lesson created: ", responseData);

      navigate("/admin/lesson?id=" + responseData.id);
      toast.success("New lesson created successfully");
    },
  });

  const [newThumbnail, setNewThumbnail] = useState<string>(
    getPlaceholderImage(113, 113),
  );

  const handleCreateNewLesson: SubmitHandler<NewLessonFormData> = async (
    data,
  ) => {
    const thumbnailBase64 = await fileList2Base64(data.thumbnail);
    console.log(data);
    mutate({
      ...data,
      thumbnail: thumbnailBase64,
      vocaSetId,
    });
  };

  return (
    <CustomModal {...props} sx={{ minWidth: "500px", padding: 4 }}>
      <Box sx={{}}>
        <Typography
          variant="h5"
          sx={{ marginBottom: 2.5, textAlign: "center" }}
        >
          New Lesson
        </Typography>

        <form
          id="new-voca-set-form"
          onSubmit={handleSubmit(handleCreateNewLesson)}
        >
          <Stack spacing={1}>
            <TextField
              label="Lesson Name"
              helperText={errors.name?.message}
              error={!!errors.name}
              {...register("name", { required: "Lesson name is required" })}
              sx={{ width: "100%" }}
            />
            <TextFieldFileInput
              label="Thumbnail"
              helperText={errors.thumbnail?.message}
              error={!!errors.thumbnail}
              sx={{ width: "100%" }}
              iconButton={<AddPhotoAlternate />}
              onChangeFile={(newFileSrc) => setNewThumbnail(newFileSrc)}
              register={register("thumbnail", {
                required: "Lesson thumbnail is required",
              })}
            />

            <Image
              src={newThumbnail}
              sx={{
                width: "113px",
                height: "113px",
                mx: "auto !important",
              }}
            />
            <Stack direction="row" spacing={0.5} justifyContent="end">
              <Button variant="outlined" sx={{ px: "24px" }} onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{ px: "24px", minWidth: "110px" }}
                disabled={isPending}
              >
                {isPending ? <CircularProgress size={20} /> : "Create"}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </CustomModal>
  );
};

export default NewLessonModal;
