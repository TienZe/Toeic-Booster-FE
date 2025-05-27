import { Box, Container, Grid2 } from "@mui/material";
import Content from "../Content";
import React from "react";
import InforUserBox from "../../InforUserBox";

const UserToeicInfoLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Content>
      <Container sx={{ flexGrow: 1, py: 3, px: 2 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={9}>{children}</Grid2>
          <Grid2 size={3}>
            <Box
              sx={{
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "fit-content",
                padding: "30px",
              }}
            >
              <InforUserBox />
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Content>
  );
};

export default UserToeicInfoLayout;
