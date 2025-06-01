import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCallback, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import CreatePart1 from "./CreatePart1";
import CreatePart3 from "./CreatePart3";
import CreatePart2 from "./CreatePart2";
import CreatePart4 from "./CreatePart4";
import CreatePart5 from "./CreatePart5";
import CreatePart6 from "./CreatePart6";
import { saveExam } from "../api/examApi";
import { GoBackButton } from "../../../../components/UI/GoBackButton";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import CreatePart7 from "./CreatePart7";
import queryClient from "../../../../queryClient";
import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import { SaveToeicTestRequest } from "../types/SaveToeicTestRequest";
import useToeicExam from "../../../../hooks/useToeicExam";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormSetValue,
} from "react-hook-form";
import { DEFAULT_QUESTION_GROUP } from "../../../../utils/defaultToeicTestQuestionGroups";
import useToeicCategories from "../../../../hooks/useToeicCategories";
import { Save } from "@mui/icons-material";
import { ToeicExam } from "../../../../types/ToeicExam";

const DEFAULT_FORM_VALUE: SaveToeicTestRequest = {
  name: "",
  category: 0,
  questionGroups: DEFAULT_QUESTION_GROUP,
};

export default function CreateExam() {
  const { examId } = useParams();

  const {
    isLoading: isLoadingToeicTest,
    data: toeicTest,
    isFetching: isFetchingToeicTest,
  } = useToeicExam(examId!, {
    enabled: !!examId,
  });

  const { data: categories } = useToeicCategories();

  const form = useForm<SaveToeicTestRequest>({
    defaultValues: DEFAULT_FORM_VALUE,
  });

  // Customize the setValue passed into FormProvider with default shouldDirty = true
  const setValue: UseFormSetValue<SaveToeicTestRequest> = useCallback(
    (name, value, options) => {
      form.setValue(name, value, { shouldDirty: true, ...options });
    },
    [form],
  );

  const {
    mutate: updateExam,
    isPending: isUpdatingExam,
    reset: resetUpdateExam,
  } = useMutation({
    mutationFn: saveExam,
    onSuccess: (updatedToeicExam: ToeicExam) => {
      queryClient.setQueryData(
        ["toeicExam", { examId: examId }],
        () => updatedToeicExam,
      );
      toast.success("Update exam successfully!");
    },
    onSettled: () => {
      resetUpdateExam();
    },
  });

  const handleUpdateExam = useCallback(
    (groupIndex: number) => {
      console.log("REQUEST UPDATE GROUP QUESTION", form.formState);
      if (!form.formState.isDirty) {
        return;
      }

      const data = form.getValues(`questionGroups.${groupIndex}`);

      const request: SaveToeicTestRequest = {
        id: toeicTest?.id,
        questionGroups: [data],
      };

      console.log("FORM DATA", request);
      updateExam(request);
    },
    [updateExam, form, toeicTest],
  );

  const handleUpdateExamInfo: SubmitHandler<SaveToeicTestRequest> = (data) => {
    const { name, category } = data;

    if (!toeicTest) {
      toast.error("Exam not found. Something went wrong!");
      return;
    }

    updateExam({
      id: toeicTest.id,
      name: name!,
      category: category!,
    });
  };

  useEffect(() => {
    if (toeicTest && !isUpdatingExam && !isFetchingToeicTest) {
      form.reset({
        name: toeicTest.name,
        category: toeicTest.category?.id,
        questionGroups: toeicTest.questionGroups,
      });
    }
  }, [toeicTest, form, updateExam, isUpdatingExam, isFetchingToeicTest]);

  return (
    <FormProvider {...form} setValue={setValue}>
      <Box
        sx={{
          padding: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            Exam Set
          </Typography>
          <GoBackButton />
        </Stack>

        <Stack
          spacing={1}
          sx={{ maxWidth: "500px" }}
          component="form"
          onSubmit={form.handleSubmit(handleUpdateExamInfo)}
        >
          <RoundedInput
            label="Name"
            {...form.register("name", { required: "Name is required" })}
            validationError={form.formState.errors.name?.message}
          />
          <Controller
            name="category"
            control={form.control}
            rules={{
              required: "Category is required",
              validate: (value) => {
                return value != 0 || "Category is required";
              },
            }}
            render={({ field }) => (
              <BootstrapSelect
                label="Category"
                itemLabels={
                  categories?.map((category) => category.category) || []
                }
                itemValues={categories?.map((category) => category.id) || []}
                validationError={form.formState.errors.category?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: "end" }}
            startIcon={<Save />}
          >
            Update
          </Button>
        </Stack>

        {isLoadingToeicTest ? (
          <CustomBackdrop open />
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 1 }}>Import Data</Typography>
            <Stack spacing={0.25} sx={{ my: 1 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart1 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart2 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart3 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 4</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart4 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 5</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart5 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 6</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart6 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Part 7</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CreatePart7 onUpdate={handleUpdateExam} />
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Box>
        )}

        {/* <Stack>
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={() => setModalUpdate(true)}
          >
            Update
          </Button>
        </Stack> */}
      </Box>
      {/* <CustomModal open={!!groupUpdate} onClose={() => setGroupUpdate(null)}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to update this group?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateGroup}
              sx={{ width: "80px" }}
              disabled={updateGroupMutation.isPending}
            >
              {updateGroupMutation.isPending ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                "Update"
              )}
            </Button>
            <Button variant="outlined" onClick={() => setGroupUpdate(null)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal> */}
      {/* <CustomModal open={modalUpdate} onClose={() => setModalUpdate(false)}>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Do you want to update this test?
          </Typography>
          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateExam}
              sx={{ width: "80px" }}
              disabled={updateExamMutation.isPending}
            >
              {updateExamMutation.isPending ? (
                <CircularProgress size={20} color="primary" />
              ) : (
                "Update"
              )}
            </Button>
            <Button variant="outlined" onClick={() => setModalUpdate(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </CustomModal> */}
    </FormProvider>
  );
}
