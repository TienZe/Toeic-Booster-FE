import { Pagination } from "@mui/material";

const Paginate = () => {
  return (
    <Pagination
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      count={5}
      color="primary"
    />
  );
};

export default Paginate;
