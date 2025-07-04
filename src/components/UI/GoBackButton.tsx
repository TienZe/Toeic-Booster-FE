import { Button, SvgIcon, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface GoBackButtonProps {
  onClick?: () => void;
  label?: string;
}
export const GoBackButton: React.FC<GoBackButtonProps> = ({
  onClick,
  label = "Back",
}) => {
  const navigate = useNavigate();

  return (
    <Button sx={{ gap: 0.5 }} onClick={onClick ? onClick : () => navigate(-1)}>
      <Typography>{label}</Typography>

      <SvgIcon sx={{ fontSize: "1.3rem" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="m8 5l-5 5l5 5" />
            <path d="M3 10h8c5.523 0 10 4.477 10 10v1" />
          </g>
        </svg>
      </SvgIcon>
    </Button>
  );
};
