import Button from "@mui/material/Button";

const NavLink: React.FC<{
  children: React.ReactNode;
  isActive?: boolean;
}> = ({ children, isActive = false }) => {
  return (
    <Button
      disableRipple
      sx={{
        color: isActive ? "primary.main" : "secondary.main",
        "&:hover": {
          color: "primary.main",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default NavLink;
