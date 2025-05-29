"use client";

import type React from "react";
import { useState } from "react";
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
  Chip,
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

// Types
interface TestResult {
  date: string;
  testName: string;
  score: string;
  time: string;
  tags: string[];
  parts: string[];
}

interface ChartData {
  date: string;
  correct: number;
}

interface QuestionTypeData {
  type: string;
  correct: number;
  wrong: number;
  accuracy: string;
}

const ToeicStatisticsPage: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string>("30");
  const [skillTab, setSkillTab] = useState<number>(0);

  // Sample data
  const chartData: ChartData[] = [
    { date: "2025-05-14", correct: 33.33 },
    { date: "2025-05-15", correct: 15 },
    { date: "2025-05-26", correct: 11.11 },
    { date: "2025-05-27", correct: 50 },
  ];

  const questionTypeData: QuestionTypeData[] = [
    {
      type: "[Part 1] Tranh tả cả người và vật",
      correct: 2,
      wrong: 3,
      accuracy: "40.00%",
    },
    {
      type: "[Part 1] Tranh tả người",
      correct: 1,
      wrong: 2,
      accuracy: "33.33%",
    },
  ];

  const testResults: TestResult[] = [
    {
      date: "29/05/2025",
      testName: "New Economy TOEIC Test 2",
      score: "0/200",
      time: "0:00:12",
      tags: ["Full test"],
      parts: [],
    },
    {
      date: "27/05/2025",
      testName: "New Economy TOEIC Test 3",
      score: "2/200 (Điểm: 20)",
      time: "0:00:14",
      tags: ["Full test"],
      parts: [],
    },
    {
      date: "26/05/2025",
      testName: "New Economy TOEIC Test 3",
      score: "1/39",
      time: "0:00:38",
      tags: ["Luyện tập"],
      parts: ["Part 3"],
    },
    {
      date: "15/05/2025",
      testName: "New Economy TOEIC Test 3",
      score: "0/6",
      time: "0:00:05",
      tags: ["Luyện tập"],
      parts: ["Part 1"],
    },
    {
      date: "14/05/2025",
      testName: "Practice Set TOEIC 2021 Test 2",
      score: "1/54",
      time: "0:00:11",
      tags: ["Luyện tập"],
      parts: ["Part 7"],
    },
    {
      date: "14/05/2025",
      testName: "Practice Set TOEIC 2021 Test 2",
      score: "1/16",
      time: "0:00:05",
      tags: ["Luyện tập"],
      parts: ["Part 6"],
    },
    {
      date: "14/05/2025",
      testName: "Practice Set TOEIC 2021 Test 2",
      score: "0/30",
      time: "0:00:05",
      tags: ["Luyện tập"],
      parts: ["Part 5"],
    },
    {
      date: "14/05/2025",
      testName: "Practice Set TOEIC 2021 Test 2",
      score: "0/30",
      time: "0:00:04",
      tags: ["Luyện tập"],
      parts: ["Part 4"],
    },
    {
      date: "14/05/2025",
      testName: "Practice Set TOEIC 2021 Test 2",
      score: "0/39",
      time: "0:00:31",
      tags: ["Luyện tập"],
      parts: ["Part 3"],
    },
    {
      date: "14/05/2025",
      testName: "Practice Set TOEIC 2021 Test 2",
      score: "1/25",
      time: "0:00:04",
      tags: ["Luyện tập"],
      parts: ["Part 2"],
    },
  ];

  const handleDaysChange = (event: SelectChangeEvent<string>) => {
    setSelectedDays(event.target.value);
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
                  Thống kê kết quả luyện thi
                </Typography>
                <Typography variant="body1" sx={{}}>
                  Theo dõi tiến độ học tập và phân tích kết quả chi tiết
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
              <strong>Chú ý:</strong> Mặc định trang thống kê sẽ hiển thị các
              bài làm trong khoảng thời gian 30 ngày gần nhất, để xem kết quả
              trong khoảng thời gian xa hơn bạn chọn ô phần dropdown dưới đây.
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
                  Lọc kết quả theo ngày (tính từ bài thi cuối):
                </Typography>
                <FormControl size="small">
                  <Select
                    value={selectedDays}
                    onChange={handleDaysChange}
                    sx={{
                      minWidth: 140,
                    }}
                  >
                    <MenuItem value="30">30 ngày</MenuItem>
                    <MenuItem value="60">60 ngày</MenuItem>
                    <MenuItem value="90">90 ngày</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  disableElevation
                  startIcon={<Search size={16} />}
                >
                  Tìm kiếm
                </Button>
                <Button variant="outlined" startIcon={<RotateCcw size={16} />}>
                  Đặt lại
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <Grid2 container spacing={3} sx={{ mb: 2 }}>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<Assignment fontSize="large" />}
                title="Số đề đã làm"
                value="4"
                subtitle="đề thi"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<AccessTime fontSize="large" />}
                title="Thời gian luyện thi"
                value="5"
                subtitle="phút"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<CalendarToday fontSize="large" />}
                title="Ngày dự thi"
                value="29/05/2025"
                subtitle={<Edit fontSize="small" sx={{ color: "#64748b" }} />}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<TrendingUp fontSize="large" />}
                title="Tới kỳ thi"
                value="0"
                subtitle="ngày"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard
                icon={<GpsFixed fontSize="large" />}
                title="Điểm mục tiêu"
                value="600.0"
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
              <StatCard title="Số đề đã làm" value="3" subtitle="đề thi" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard title="Độ chính xác (#đúng/#tổng)" value="25.00%" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard title="Thời gian trung bình" value="0:00:12" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard title="Điểm trung bình" value="20/495" />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 2.4 }}>
              <StatCard title="Điểm cao nhất" value="20/495" />
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
                    data={chartData}
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
                      dataKey="correct"
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

          {/* Question Types Table */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: "secondary.dark", mb: 1 }}
            >
              Độ chính xác theo từng part
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Part</TableCell>
                    <TableCell align="center">Số câu đúng</TableCell>
                    <TableCell align="center">Số câu sai</TableCell>
                    <TableCell align="center">Độ chính xác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionTypeData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.type}</TableCell>
                      <TableCell align="center">{row.correct}</TableCell>
                      <TableCell align="center">{row.wrong}</TableCell>
                      <TableCell align="center">{row.accuracy}</TableCell>
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
              Danh sách đề thi đã làm:
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày làm</TableCell>
                    <TableCell>Đề thi</TableCell>
                    <TableCell align="center">Kết quả</TableCell>
                    <TableCell align="center">Thời gian làm bài</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.date}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, mb: 1 }}
                          >
                            {result.testName}
                          </Typography>
                          <Box
                            sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                          >
                            {result.tags.map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    tag === "Full test"
                                      ? "success.extraLight"
                                      : "warning.extraLight",
                                  color:
                                    tag === "Full test"
                                      ? "success.main"
                                      : "warning.main",
                                  fontWeight: 500,
                                  fontSize: "0.7rem",
                                  borderRadius: "0.375rem",
                                  border: "1px solid",
                                  borderColor:
                                    tag === "Full test"
                                      ? "rgba(34, 197, 94, 0.2)"
                                      : "rgba(249, 115, 22, 0.2)",
                                }}
                              />
                            ))}
                            {result.parts.map((part, partIndex) => (
                              <Chip
                                key={partIndex}
                                label={part}
                                size="small"
                                sx={{
                                  backgroundColor: "info.extraLight",
                                  color: "info.main",
                                  fontWeight: 500,
                                  fontSize: "0.7rem",
                                  borderRadius: "0.375rem",
                                  border: "1px solid rgba(14, 165, 233, 0.2)",
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{result.score}</TableCell>
                      <TableCell align="center">{result.time}</TableCell>
                      <TableCell align="center">
                        <Link
                          href="#"
                          sx={{
                            color: "primary.main",
                            textDecoration: "none",
                            fontWeight: 500,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          Xem chi tiết
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
