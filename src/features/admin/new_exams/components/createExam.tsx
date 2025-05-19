import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCallback, useEffect } from "react";
import { Box, Stack } from "@mui/material";
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
import { FormProvider, useForm } from "react-hook-form";
import { DEFAULT_QUESTION_GROUP } from "../../../../utils/defaultToeicTestQuestionGroups";

const DEFAULT_FORM_VALUE: SaveToeicTestRequest = {
  name: "",
  tag: undefined,
  questionGroups: DEFAULT_QUESTION_GROUP,
};

export default function CreateExam() {
  // const navigate = useNavigate();
  console.log("PARENT RENDER");
  const { examId } = useParams();

  const {
    isLoading: isLoadingToeicTest,
    data: toeicTest,
    isFetching: isFetchingToeicTest,
  } = useToeicExam(examId!, {
    enabled: !!examId,
  });

  const form = useForm<SaveToeicTestRequest>({
    defaultValues: DEFAULT_FORM_VALUE,
  });

  const {
    mutate: updateExam,
    isPending: isUpdatingExam,
    reset: resetUpdateExam,
  } = useMutation({
    mutationFn: saveExam,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "toeicExam",
          {
            examId: examId,
          },
        ],
      });
      toast.success("Update exam successfully!");
    },
    onSettled: () => {
      resetUpdateExam();
    },
  });

  const handleUpdateExam = useCallback(
    (groupIndex: number) => {
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

  useEffect(() => {
    if (toeicTest && !isUpdatingExam && !isFetchingToeicTest) {
      form.reset(toeicTest);
    }
  }, [toeicTest, form, updateExam, isUpdatingExam, isFetchingToeicTest]);

  useEffect(() => {
    console.log("FORM CHANGED", form.getValues());
  }, [form]);

  useEffect(() => {
    console.log("updateExam CHANGED");
  }, [updateExam]);

  useEffect(() => {
    console.log("TOEIC TEST CHANGED", toeicTest);
  }, [toeicTest]);

  return (
    <FormProvider {...form}>
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

        <Stack spacing={1} sx={{ maxWidth: "500px" }}>
          <RoundedInput label="Name" {...form.register("name")} />
          <BootstrapSelect
            label="Tag"
            itemLabels={["2021", "2022"]}
            itemValues={[1, 2]}
          />
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
