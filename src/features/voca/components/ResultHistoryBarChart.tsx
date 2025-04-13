import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const COLORS = {
  gradientStart: "#FFA500",
  gradientEnd: "#FFA500",
};
type ResultHistoryBarChartProps = {
  data: {
    best: number;
    mostRecent: number;
    current: number;
  };
  totalWord: number;
};
const ResultHistoryBarChart: React.FC<ResultHistoryBarChartProps> = ({
  data,
  totalWord,
}) => {
  const chartData = [
    { name: "Best", value: data.best },
    { name: "Most Recent", value: data.mostRecent },
    { name: "Current", value: data.current },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 50, right: 30, left: 0, bottom: 20 }}
        barSize={50} // Adjust the width of bars
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={COLORS.gradientStart}
              stopOpacity={0.8}
            />
            <stop
              offset="100%"
              stopColor={COLORS.gradientEnd}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
        {/* Axes */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#B4B4B4", dy: 20, fontWeight: 500 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fill: "#B4B4B4", fontSize: "20px" }}
          tickLine={false}
          axisLine={false}
          domain={[0, totalWord]}
        >
          <Label
            value="(Words)" // Your label text
            position="top" // Position the label on top of the Y-axis
            offset={30}
            style={{
              textAnchor: "middle",
              fontSize: "14px",
              fontWeight: "bold",
              fill: "#B4B4B4",
              transform: "translateX(10px)",
            }}
          />
        </YAxis>
        {/* Tooltip */}
        <Tooltip />
        {/* Bars */}
        <Bar
          dataKey="value"
          fill="url(#colorValue)" // Apply gradient fill
          radius={[10, 10, 0, 0]} // Rounded corners for the top of the bars
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ResultHistoryBarChart;
