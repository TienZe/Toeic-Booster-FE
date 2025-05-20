import { Box, Container } from "@mui/material";
import DetailContent from "./DetailContent";
import InforUserBox from "../InforUserBox";
import Content from "../../../../components/layout/Content";
import Comments from "../../../comment/components/Comments";
import { useParams } from "react-router-dom";

const Detail = () => {
  const routeParams = useParams<{ examId: string }>();
  const examId = Number(routeParams.examId);
  return (
    <Content sx={{ backgroundColor: "secondary.extraLight" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            marginTop: 3,
            marginBottom: 6,
          }}
        >
          <Box sx={{ width: "75%" }}>
            <Box
              sx={{
                padding: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                marginBottom: 2,
                backgroundColor: "white",
              }}
            >
              <DetailContent examId={examId} />
            </Box>
            <Box
              sx={{
                padding: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: 2,
                backgroundColor: "white",
              }}
            >
              <Comments examId={examId} />
            </Box>
          </Box>
          <Box
            sx={{
              width: "calc(25% - 30px)",
              padding: "30px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              height: "fit-content",
              backgroundColor: "white",
            }}
          >
            <InforUserBox />
          </Box>
        </Box>
      </Container>
    </Content>
  );
};

export default Detail;
