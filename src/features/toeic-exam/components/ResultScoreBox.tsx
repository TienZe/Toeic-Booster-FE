import { Stack, SxProps, Typography } from "@mui/material";

interface ResultScoreBoxProps {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
  unit?: string;
  labelSx?: SxProps;
}

const ResultScoreBox: React.FC<ResultScoreBoxProps> = ({
  icon,
  label,
  value,
  unit,
  labelSx,
}) => {
  return (
    <Stack
      sx={{
        textAlign: "center",
        px: 1,
        py: 1.5,
        borderRadius: "10px",
        backgroundColor: "white",
        border: "1px solid #efefef",
        display: "flex",
        minWidth: "170px",
        flexDirection: "column",
        justifyContent: "center",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        boxShadow: "0 2px 8px 0 rgba(0,0,0,.05)",
      }}
      spacing={0.5}
      alignItems="center"
    >
      {icon}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: "0.875rem",
          ...labelSx,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: "secondary.dark",
          fontSize: "1.5rem",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.875rem",
        }}
      >
        {unit}
      </Typography>
    </Stack>
  );
};

export default ResultScoreBox;
