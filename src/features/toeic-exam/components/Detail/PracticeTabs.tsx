import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import {
  clearSelectedParts,
  setLimitTime,
  setSelectedParts,
} from "../../../../stores/selectedPartsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { resetAnswers } from "../../../../stores/userAnswer";
import { resetNotedQuestion } from "../../../../stores/notedQuestionSlice";
import { PARTS } from "../../../../utils/toeicExamHelper";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ px: 0, py: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PracticeTabs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedParts = useSelector(
    (state: RootState) => state.selectedParts.selectedParts,
  );
  const limitTime = useSelector(
    (state: RootState) => state.selectedParts.limitTime,
  );
  const [tabIndex, setTabIndex] = useState(0);

  const routeParams = useParams<{ examId: string }>();
  const examId = routeParams.examId;

  useEffect(() => {
    dispatch(clearSelectedParts());
    dispatch(resetAnswers());
    dispatch(resetNotedQuestion());
  }, []);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleChangeLimit = (event: SelectChangeEvent) => {
    dispatch(setLimitTime(event.target.value));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const part = event.target.name;
    const checked = event.target.checked;
    if (checked) {
      dispatch(setSelectedParts([...selectedParts, part]));
    } else {
      dispatch(setSelectedParts(selectedParts.filter((p) => p !== part)));
    }
  };

  const handlePractice = (isFullTest: boolean) => {
    // const selectedPartsClone = [...selectedParts];
    // const sortedSelectedParts = sortPartArray(selectedPartsClone);
    // if (selectedPartsClone.length === 0 && !isFullTest) {
    //   toast.error("Please choose at least one part!");
    //   return;
    // }
    if (isFullTest) {
      dispatch(setLimitTime("7200"));
      dispatch(setSelectedParts(PARTS));
    }
    // const query = isFullTest
    //   ? "part=full"
    //   : sortedSelectedParts.map((part) => `part=${part}`).join("&");

    // navigate(`/exams/${examId}/partIndex?${query}`);
    navigate(`/exams/${examId}/partIndex`);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Practice" {...a11yProps(0)} />
          <Tab label="Full test" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabIndex} index={0}>
        <Stack>
          <Box
            sx={{
              background: "#D8F0E2",
              py: 1,
              px: 1,
              borderRadius: 2,
              mb: 1,
            }}
          >
            <Stack>
              <Typography sx={{ color: "#1F5E39" }}>
                Practicing by individual sections and choosing appropriate
                timing will help you focus on answering the questions correctly,
                as you are under the pressure to complete the test.
              </Typography>
            </Stack>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox name="part1" onChange={handleCheckboxChange} />
              }
              label="Part 1 (6 questions)"
            />
            <FormControlLabel
              control={
                <Checkbox name="part2" onChange={handleCheckboxChange} />
              }
              label="Part 2 (25 questions)"
            />
            <FormControlLabel
              control={
                <Checkbox name="part3" onChange={handleCheckboxChange} />
              }
              label="Part 3 (39 questions)"
            />
            <FormControlLabel
              control={
                <Checkbox name="part4" onChange={handleCheckboxChange} />
              }
              label="Part 4 (30 questions)"
            />
            <FormControlLabel
              control={
                <Checkbox name="part5" onChange={handleCheckboxChange} />
              }
              label="Part 5 (30 questions)"
            />
            <FormControlLabel
              control={
                <Checkbox name="part6" onChange={handleCheckboxChange} />
              }
              label="Part 6 (16 questions)"
            />
            <FormControlLabel
              control={
                <Checkbox name="part7" onChange={handleCheckboxChange} />
              }
              label="Part 7 (54 questions)"
            />
          </FormGroup>

          <Typography variant="h6" sx={{ my: 1, color: "black" }}>
            Time limit (Blank for unlimit)
          </Typography>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limitTime}
                onChange={handleChangeLimit}
              >
                <MenuItem value={0}>
                  <em>Time limit</em>
                </MenuItem>
                <MenuItem value={600}>10 minutes</MenuItem>
                <MenuItem value={1200}>20 minutes</MenuItem>
                <MenuItem value={1800}>30 minutes</MenuItem>
                <MenuItem value={2400}>40 minutes</MenuItem>
                <MenuItem value={3000}>50 minutes</MenuItem>
                <MenuItem value={3600}>60 minutes</MenuItem>
                <MenuItem value={4200}>70 minutes</MenuItem>
                <MenuItem value={4800}>80 minutes</MenuItem>
                <MenuItem value={5600}>90 minutes</MenuItem>
                <MenuItem value={6000}>100 minutes</MenuItem>
                <MenuItem value={6600}>110 minutes</MenuItem>
                <MenuItem value={7200}>120 minutes</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              mt: 2,
              px: 2,
              py: 0.5,
            }}
            onClick={() => handlePractice(false)}
          >
            Practice
          </Button>
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <Stack>
          <Box
            sx={{
              background: "#FFEFD8",
              py: 1,
              px: 1,
              borderRadius: 2,
              mb: 0.5,
            }}
          >
            <Stack>
              <Typography sx={{ color: "#855A1F" }}>
                Ready to start the full test? To achieve the best results, you
                need to set aside 120 minutes for this test.
              </Typography>
            </Stack>
          </Box>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              mt: 2,
              px: 2,
              py: 0.5,
            }}
            onClick={() => handlePractice(true)}
          >
            Start
          </Button>
        </Stack>
      </CustomTabPanel>
    </>
  );
}
