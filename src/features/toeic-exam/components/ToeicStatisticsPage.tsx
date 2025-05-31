import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  FormControl,
  type SelectChangeEvent,
  Container,
  Grid2,
} from "@mui/material";
import {
  TrendingUp,
  AccessTime,
  CalendarToday,
  Assignment,
  GpsFixed,
  Edit,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Content from "../../../components/layout/Content";
import { RotateCcw, Search } from "lucide-react";
import TableContainer from "../../../components/UI/TableContainer";
import useUser from "../../../hooks/useUser";
import { differenceInDays, format } from "date-fns";
import { getAttemptStats } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { secondToHHMMSS } from "../../../utils/helper";
import { getDisplayedPart } from "../../../utils/toeicExamHelper";
import { Part, ToeicTestAttempt } from "../../../types/ToeicExam";
import { useAttempts } from "../../../hooks/useAttempts";
import Badge from "../../../components/UI/Badge";

const HISTORY_ATTEMPT_PAGE_SIZE = 10;

const RECENT_DAY_OPTIONS = [
  {
    label: "3 most recent days",
    value: "3d",
  },
  {
    label: "7 most recent days",
    value: "7d",
  },
  {
    label: "30 days",
    value: "30d",
  },
  {
    label: "60 days",
    value: "60d",
  },
  {
    label: "90 days",
    value: "90d",
  },
  {
    label: "6 months",
    value: "6m",
  },
  {
    label: "1 year",
    value: "1y",
  },
];

const ToeicStatisticsPage: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string>("30d");
  const [skillTab, setSkillTab] = useState<number>(0);
  const [historyAttemptPage, setHistoryAttemptPage] = useState<number>(0);
  const [attempts, setAttempts] = useState<ToeicTestAttempt[]>([]);

  const { data: user } = useUser();

  const { data: attemptStats } = useQuery({
    queryKey: ["attempt-stats", { recentDays: selectedDays }],
    queryFn: () => getAttemptStats(selectedDays),
  });

  const { data: paginatedAttempts } = useAttempts(
    {},
    {
      recentDays: selectedDays,
      page: historyAttemptPage,
      limit: HISTORY_ATTEMPT_PAGE_SIZE,
    },
  );

  useEffect(() => {
    setAttempts([]);
    setHistoryAttemptPage(0);
  }, [selectedDays]);

  useEffect(() => {
    if (paginatedAttempts) {
      setAttempts((prev) => [...prev, ...paginatedAttempts.items]);
    }
  }, [paginatedAttempts]);

  const skillStats = skillTab === 0 ? attemptStats?.lc : attemptStats?.rc;

  const getDefaultTestDate = useCallback(() => {
    let createdDate = new Date();
    if (user) {
      createdDate = new Date(user.createdAt);
    }
    const defaultTestDate = createdDate;
    defaultTestDate.setMonth(defaultTestDate.getMonth() + 3);

    return defaultTestDate;
  }, [user]);

  const userTestDate = useMemo(() => {
    return user?.testDate ? new Date(user.testDate) : getDefaultTestDate();
  }, [user?.testDate, getDefaultTestDate]);

  const handleRecentDaysChange = (event: SelectChangeEvent<string>) => {
    setSelectedDays(event.target.value);
  };

  const handleResetSearch = () => {
    setSelectedDays("30d");
  };

  const handleSkillTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ) => {
    setSkillTab(newValue);
  };

  const StatCard: React.FC<{
    icon?: React.ReactNode;
    title: string;
    value: string | number;
    subtitle?: string | React.ReactNode;
    isTarget?: boolean;
  }> = ({ icon, title, value, subtitle, isTarget = false }) => (
    <Card
      sx={{
        height: "100%",
        textAlign: "center",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "0.75rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 1, pb: "1rem !important" }}>
        {icon && (
          <Box
            sx={{ color: isTarget ? "primary.main" : "text.primary", mb: 1 }}
          >
            {icon}
          </Box>
        )}
        <Typography gutterBottom>{title}</Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontWeight: 600,
            color: isTarget ? "primary.main" : "secondary.dark",
            fontSize: "1.2rem",
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        {subtitle && <Typography variant="body2">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );

  return (
    <Content sx={{ backgroundColor: "secondary.extraLight" }}>
      <Container>
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
            minHeight: "100vh",
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: "10px",
                  backgroundColor: "hsl(221.2 83.2% 96.4%)",
                  color: "hsl(221.2 83.2% 53.3%)",
                  mr: 2,
                }}
              >
                <TrendingUp fontSize="large" />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "secondary.dark",
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    mb: 1,
                  }}
                >
                  TOEIC Practice Statistics
                </Typography>
                <Typography variant="body1" sx={{}}>
                  Track your progress and analyze detailed results
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Notice */}
          <Box
            sx={{
              mb: 2,
              p: 1,
              backgroundColor: "rgba(254, 240, 138, 0.2)",
              border: "1px solid rgba(254, 240, 138, 0.5)",
              borderRadius: "0.75rem",
            }}
          >
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <strong>Note:</strong> By default, the statistics page will
              display the results of the last 30 days. To view results from a
              longer period, select the dropdown below.
            </Typography>
          </Box>

          {/* Filter */}
          <Card
            sx={{
              border: "1px solid hsl(214.3 31.8% 91.4%)",
              borderRadius: "12px",
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              mb: 2,
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="body1">
                  Filter results by date (from last test):
                </Typography>
                <FormControl size="small">
                  <Select
                    value={selectedDays}
                    onChange={handleRecentDaysChange}
                    sx={{
                      minWidth: 200,
                    }}
                  >
                    {RECENT_DAY_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  disableElevation
                  startIcon={<Search size={16} />}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RotateCcw size={16} />}
                  onClick={handleResetSearch}
                >
                  Reset
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <Grid2 container spacing={3} sx={{ mb: 2 }}>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<Assignment fontSize="large" />}
                title="Number of practice tests"
                value={attemptStats?.numberOfPracticeTests || 0}
                subtitle="tests"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<AccessTime fontSize="large" />}
                title="Practice time"
                value={attemptStats?.practiceTime || 0}
                subtitle="minutes"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<CalendarToday fontSize="large" />}
                title="Exam date"
                value={format(userTestDate, "dd/MM/yyyy")}
                subtitle={<Edit fontSize="small" />}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<TrendingUp fontSize="large" />}
                title="Days to exam"
                value={differenceInDays(userTestDate, new Date())}
                subtitle="days"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<GpsFixed fontSize="large" />}
                title="Target score"
                value={user?.targetScore?.toString() || "450"}
                isTarget
              />
            </Grid2>
          </Grid2>

          {/* Skills Tabs */}
          <Box sx={{ mb: 2 }}>
            <Tabs
              value={skillTab}
              onChange={handleSkillTabChange}
              sx={{
                pb: 1,
                "& .MuiTab-root": {
                  borderRadius: "0.5rem",
                  minHeight: "2.5rem",
                  padding: "0.5rem 1rem",
                  marginRight: "0.5rem",
                  "&.Mui-selected": {
                    color: "primary.main",
                    fontWeight: 600,
                    backgroundColor: "primary.extraLight",
                  },
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              <Tab label="Listening" />
              <Tab label="Reading" />
            </Tabs>
          </Box>

          {/* Performance Cards */}
          <Grid2 container spacing={3} sx={{ mb: 2 }}>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                title="Practice tests completed"
                value={skillStats?.practiceTests || 0}
                subtitle="đề thi"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                title="Accuracy (#correct/#total)"
                value={
                  (
                    ((skillStats?.correctAnswers || 0) /
                      (skillStats?.answers || 1)) *
                    100
                  ).toFixed(2) + "%"
                }
                subtitle={`${skillStats?.correctAnswers}/${skillStats?.answers}`}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                title="Average time"
                value={secondToHHMMSS(skillStats?.averageTime || 0)}
                subtitle="minutes"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                title="Average score"
                value={`${skillStats?.averageScore}/495`}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                title="Highest score"
                value={`${skillStats?.maxScore}/495`}
              />
            </Grid2>
          </Grid2>

          {/* Chart */}
          <Card
            sx={{
              mb: 4,
              border: "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: "0.75rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ height: 300, position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: "#f43f5e",
                      mr: 0.4,
                      borderRadius: "50%",
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    % Correct
                  </Typography>
                </Box>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={skillStats?.accuracyByDate || []}
                    margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(0, 0, 0, 0.06)"
                    />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis domain={[0, 100]} stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      dot={{ fill: "#f43f5e", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#f43f5e" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Accuracy by part table */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "secondary.dark", mb: 1 }}
            >
              Accuracy by part
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Part</TableCell>
                    <TableCell align="center">
                      Number of correct answers
                    </TableCell>
                    <TableCell align="center">
                      Number of wrong answers
                    </TableCell>
                    <TableCell align="center">Accuracy</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(
                    attemptStats?.numOfCorrectAnswersGroupedByPart || {},
                  ).map(([part, row]) => (
                    <TableRow key={part}>
                      <TableCell>{getDisplayedPart(part as Part)}</TableCell>
                      <TableCell align="center">{row.numCorrect}</TableCell>
                      <TableCell align="center">
                        {row.total - row.numCorrect}
                      </TableCell>
                      <TableCell align="center">
                        {((row.numCorrect / row.total) * 100).toFixed(2) + "%"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Test History */}
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "#0f172a", mb: 2 }}
            >
              Test History:
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell align="center">Result</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attempts?.map((attempt, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {format(new Date(attempt.createdAt), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, mb: 0.5 }}
                          >
                            {attempt.toeicTest?.name}
                          </Typography>
                          <Box
                            sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                          >
                            {attempt.isFullTest ? (
                              <Badge label="Full test" color="success" />
                            ) : (
                              <>
                                <Badge label="Practice" color="warning" />
                                {attempt.selectedParts.map((part) => (
                                  <Badge
                                    key={part}
                                    label={getDisplayedPart(part as Part)}
                                    color="info"
                                  />
                                ))}
                              </>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{attempt.score}</TableCell>
                      <TableCell align="center">
                        {secondToHHMMSS(attempt.takenTime)}
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          href={`/exams/result/${attempt.toeicTestId}`}
                          sx={{
                            color: "primary.main",
                            textDecoration: "none",
                            fontWeight: 500,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          View details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {paginatedAttempts && paginatedAttempts.hasNext && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "primary.extraLight",
                      color: "primary.main",
                    }}
                    onClick={() =>
                      setHistoryAttemptPage(historyAttemptPage + 1)
                    }
                  >
                    Show more
                  </Button>
                </Box>
              )}
            </TableContainer>
            <Box sx={{ mt: 3 }}>
              <Link
                href="#"
                sx={{
                  color: "#6366f1",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Xem tất cả {">>"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Content>
  );
};

export default ToeicStatisticsPage;
