import Button from "@mui/material/Button";

interface TabItemProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({ children, isActive }) => {
  return (
    <Button
      variant={isActive ? "contained" : "text"}
      sx={{
        borderRadius: "33px",
        height: "40px",
        width: "146px",
      }}
      disableRipple
    >
      {children}
    </Button>
  );
};

export default TabItem;
