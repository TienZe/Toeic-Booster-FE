import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal, {
  CustomModalProps,
} from "../../../components/UI/CustomModal";
import { AddPhotoAlternate, ArrowDropDownOutlined } from "@mui/icons-material";
import { VocabularyWordClass } from "../../../types/VocabularyModel";
import TextFieldFileInput from "../../admin/vocasets/components/TextFieldFileInput";
import { Image } from "../../../components/UI/Image";
import { getWordThumbnail } from "../../../utils/helper";
import { SubmitHandler, useForm } from "react-hook-form";
import { LessonVocabulary } from "../../../types/LessonVocabulary";
import { useMutation } from "@tanstack/react-query";
import { updateLessonVocabulary } from "../../shared-apis/lesson-vocabulary-api";
import { toast } from "react-toastify";
import { UpdateLessonVocabularyRequest } from "../../shared-apis/types/UpdateLessonVocabularyRequest";

interface EditFlashCardModalProps extends CustomModalProps {
  lessonVocabulary: LessonVocabulary;
  onFlashCardUpdated?: (lessonVocabulary: LessonVocabulary) => void;
}

interface FlashCardFormData {
  definition: string;
  translate: string;
  wordClass: VocabularyWordClass;
  thumbnail?: string; // base64 or default placeholder image url
}

const EditFlashCardModal: React.FC<EditFlashCardModalProps> = ({
  open,
  onClose,
  lessonVocabulary,
  onFlashCardUpdated,
}) => {
  const form = useForm<FlashCardFormData>({
    defaultValues: {
      definition: lessonVocabulary?.definition || "",
      translate: lessonVocabulary?.meaning || "",
      wordClass: lessonVocabulary?.partOfSpeech || VocabularyWordClass.NOUN,
      thumbnail:
        lessonVocabulary?.thumbnail || getWordThumbnail(lessonVocabulary),
    },
  });

  const flashCardThumbnail = form.watch("thumbnail"); // for thumbnail preview

  const updateLessonVocaMutation = useMutation({
    mutationFn: updateLessonVocabulary,
    onSuccess: (responseData: LessonVocabulary) => {
      toast.success("Saved!");
      onFlashCardUpdated?.(responseData);
    },
    onError: (error: { message: string | string[] }) => {
      let errorMessage = "Update lesson vocabulary failed";
      if (error.message instanceof Array) {
        errorMessage = error.message[0];
      }
      toast.error(errorMessage);
    },
  });

  const handleSaveForm: SubmitHandler<FlashCardFormData> = (data) => {
    const request: UpdateLessonVocabularyRequest = {
      lessonVocabularyId: lessonVocabulary.id,
      meaning: data.translate,
      partOfSpeech: data.wordClass,
      definition: data.definition,
      thumbnail: data.thumbnail?.startsWith("data:")
        ? data.thumbnail
        : undefined,
      // example: data.example || undefined,
      // exampleMeaning: data.exampleMeaning || undefined,
    };

    console.log(request);

    updateLessonVocaMutation.mutate(request);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      containerSx={{ top: 20, left: "50%", transform: "translateX(-50%)" }}
    >
      <form onSubmit={form.handleSubmit(handleSaveForm)}>
        <Box sx={{ padding: 2, maxWidth: "500px" }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 1.5, textAlign: "center" }}
          >
            {lessonVocabulary?.word}
            <Typography>{lessonVocabulary?.pronunciation}</Typography>
          </Typography>

          {/* Flashcard */}
          <Stack spacing={1}>
            <TextField
              label="Definition"
              placeholder="Enter the definition"
              multiline
              rows={2}
              error={!!form.formState.errors.definition}
              helperText={form.formState.errors.definition?.message}
              {...form.register("definition", {
                required: "Please enter the definition",
              })}
            />
            <TextField
              label="Meaning"
              placeholder="Enter the definition"
              multiline
              rows={2}
              error={!!form.formState.errors.translate}
              helperText={form.formState.errors.translate?.message}
              {...form.register("translate", {
                required: "Please enter the meaning",
              })}
            />
            <Accordion
              elevation={0}
              variant="outlined"
              sx={{
                borderRadius: "4px",
                "&::before": {
                  display: "none",
                },
                "& .MuiAccordionSummary-root": {
                  backgroundColor: "rgba(0,0,0,.03)",
                  height: "48px",
                  borderBottom: "1px solid rgba(0,0,0,.125)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownOutlined />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Set photo, part of speech ...</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid2 container spacing={1}>
                  <Grid2 size={12}>
                    <TextField
                      label="Word class"
                      select
                      helperText={form.formState.errors.wordClass?.message}
                      error={!!form.formState.errors.wordClass}
                      defaultValue={lessonVocabulary.partOfSpeech}
                      {...form.register("wordClass", {
                        required: "Please enter the word class",
                      })}
                      onChange={(e) =>
                        form.setValue(
                          "wordClass",
                          e.target.value as VocabularyWordClass,
                          {
                            shouldValidate: true,
                          },
                        )
                      }
                      sx={{ width: "100%" }}
                    >
                      {Object.values(VocabularyWordClass).map((wordClass) => (
                        <MenuItem key={wordClass} value={wordClass}>
                          {wordClass}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid2>

                  <Grid2 size={12}>
                    <TextFieldFileInput
                      label="Thumbnail"
                      sx={{ width: "100%" }}
                      iconButton={<AddPhotoAlternate />}
                      onChangeFile={(newFileSrc) =>
                        form.setValue("thumbnail", newFileSrc)
                      }
                    />
                    <Image
                      src={flashCardThumbnail as string}
                      sx={{
                        marginTop: 1,
                        display: "block",
                        width: "113px",
                        height: "113px",
                        mx: "auto !important",
                      }}
                    />
                  </Grid2>
                </Grid2>
              </AccordionDetails>
            </Accordion>
          </Stack>
          <Box sx={{ marginTop: "16px" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                px: 3,
                display: "block",
                marginLeft: "auto",
                boxShadow: 0,
                width: "100%",
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </CustomModal>
  );
};

export default EditFlashCardModal;
