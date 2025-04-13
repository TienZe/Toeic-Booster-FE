import { useQuery } from "@tanstack/react-query";
import {
  fetchAllPracticeHistory,
  fetchPracticeSpecificDay,
} from "../api/practice-history";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BarChartIcon from "@mui/icons-material/BarChart";
import { toHHMMSS } from "../../toeic-exam/utils/helper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";

const StatisticalTab = () => {
  const [day, setDay] = useState<string>("0");
  const [isListen, setIsListen] = useState<boolean>(true);
  const BoxStyle = {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
    padding: "30px",
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  console.log("day", day);

  const { isPending, data: PracticeSpecificDay } = useQuery({
    queryKey: ["FetchPracticeSpecificDay", day],
    queryFn: () => fetchPracticeSpecificDay(day || ""),
  });

  const { isPending: isPendingHistory, data: PracticeHistory } = useQuery({
    queryKey: ["PracticeHistory"],
    queryFn: () => fetchAllPracticeHistory(),
  });

  console.log("practice", PracticeSpecificDay);

  const data = PracticeHistory?.map((practice) => {
    return {
      date: dayjs(practice.createdAt).format("DD/MM/YYYY"),
      RCScore: practice.RCScore,
      LCScore: practice.LCScore,
    };
  });

  return (
    <>
      <Typography variant="h6" my={1}>
        Filter results by date
      </Typography>
      <Box sx={{ minWidth: 120 }} mb={2}>
        <FormControl fullWidth>
          <Select
            value={day}
            onChange={handleChange}
            size="small"
            sx={{ width: "50%" }}
            defaultValue="0"
          >
            <MenuItem value={"0"}>All</MenuItem>
            <MenuItem value={"3"}>3 days</MenuItem>
            <MenuItem value={"7"}>7 days</MenuItem>
            <MenuItem value={"20"}>30 days</MenuItem>
            <MenuItem value={"30"}>60 days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isPending ? (
        <CustomBackdrop open />
      ) : (
        <>
          <Button
            variant={"contained"}
            sx={{ borderRadius: 5, marginBottom: 1 }}
          >
            Full Test
          </Button>
          <Grid2 container spacing={1}>
            <Grid2 size={3}>
              <Box sx={{ ...BoxStyle }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.75}
                >
                  <Stack direction="row" spacing={0.5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Practices
                    </Typography>
                    <CreateIcon />
                  </Stack>

                  <Typography sx={{ fontSize: 20 }}>
                    {PracticeSpecificDay?.testPracticeCount}
                  </Typography>
                </Stack>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box sx={{ ...BoxStyle }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.75}
                >
                  <Stack direction="row" spacing={0.5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Tests
                    </Typography>
                    <LibraryBooksIcon />
                  </Stack>

                  <Typography sx={{ fontSize: 20 }}>
                    {PracticeSpecificDay?.totalTest}
                  </Typography>
                </Stack>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box sx={{ ...BoxStyle }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.75}
                >
                  <Stack direction="row" spacing={0.5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Total Time
                    </Typography>
                    <AccessTimeIcon />
                  </Stack>

                  <Typography sx={{ fontSize: 20 }}>
                    {toHHMMSS(PracticeSpecificDay?.totalTime ?? 0)}
                  </Typography>
                </Stack>
              </Box>
            </Grid2>
            <Grid2 size={3}>
              <Box sx={{ ...BoxStyle }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.75}
                >
                  <Stack direction="row" spacing={0.5}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Max score
                    </Typography>
                    <EmojiEventsIcon />
                  </Stack>

                  <Typography sx={{ fontSize: 20 }}>
                    {PracticeSpecificDay?.maxScore}
                  </Typography>
                </Stack>
              </Box>
            </Grid2>
          </Grid2>

          <Stack direction="row" gap={1} my={2}>
            <Button
              variant={isListen ? "contained" : "outlined"}
              sx={{ borderRadius: 5 }}
              onClick={() => setIsListen(true)}
            >
              Listening
            </Button>
            <Button
              variant={!isListen ? "contained" : "outlined"}
              sx={{ borderRadius: 5 }}
              onClick={() => setIsListen(false)}
            >
              Reading
            </Button>
          </Stack>

          {isListen ? (
            <Grid2 container spacing={1}>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Tests
                      </Typography>
                      <CreateIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.listen.totalTest}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Questions
                      </Typography>
                      <QuestionMarkIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.listen.totalQuestion}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Avg Score
                      </Typography>
                      <BarChartIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.listen.avgScore?.toFixed(1)}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Max score
                      </Typography>
                      <EmojiEventsIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.listen.maxScore}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
            </Grid2>
          ) : (
            <Grid2 container spacing={1}>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Tests
                      </Typography>
                      <CreateIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.read.totalTest}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Questions
                      </Typography>
                      <QuestionMarkIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.read.totalQuestion}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Avg Score
                      </Typography>
                      <BarChartIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.read.avgScore?.toFixed(1)}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 size={3}>
                <Box sx={{ ...BoxStyle }}>
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0.75}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Max score
                      </Typography>
                      <EmojiEventsIcon />
                    </Stack>

                    <Typography sx={{ fontSize: 20 }}>
                      {PracticeSpecificDay?.read.maxScore}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
            </Grid2>
          )}
          {isPendingHistory
            ? "Loading ..."
            : data &&
              data.length > 0 && (
                <div style={{ width: "80%", margin: "50px auto" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={data}
                      margin={{ top: 5, right: 50, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        angle={-75}
                        dy={35}
                        height={85}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                      />
                      <Line
                        type="monotone"
                        dataKey="LCScore"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="RCScore"
                        stroke="#82ca9d"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
        </>
      )}
    </>
  );
};

export default StatisticalTab;
