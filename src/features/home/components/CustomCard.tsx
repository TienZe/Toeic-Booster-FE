import { Card, CardProps } from "@mui/material";

const CustomCard: React.FC<CardProps> = (props) => {
  const { sx, children, ...rest } = props;
  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: "0px 4px 0px rgba(143, 156, 173, 0.2)",
        borderRadius: "10px",
        "&:hover": {
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.2),0 2px 6px 2px rgba(60,64,67,.15)",
          transform: "translateY(-2px)",
          transition: "all .4s",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
