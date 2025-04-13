import { useQuery } from "@tanstack/react-query";
import { fetchAllPracticeHistory } from "../api/practice-history";
import { useEffect, useState } from "react";
import { PracticeHistory } from "../types/PracticeHistory";
import { groupPracticeByTest } from "../utils/helper";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import PracticeHistoryTable from "./PracticeHistoryTable";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "../../../components/UI/Link";

const PracticeHistoryTab = () => {
  const [PracticeHistoryData, setPracticeHistoryData] = useState<
    {
      id: string;
      name: string;
      value: PracticeHistory[];
    }[]
  >();
  const { isPending, data: PracticeHistory } = useQuery({
    queryKey: ["PracticeHistory"],
    queryFn: () => fetchAllPracticeHistory(),
  });

  useEffect(() => {
    if (PracticeHistory) {
      const PracticeHistoryConverted = groupPracticeByTest(PracticeHistory);
      setPracticeHistoryData(PracticeHistoryConverted);
    }
  }, [PracticeHistory]);
  console.log(PracticeHistoryData);
  return (
    <>
      {isPending ? (
        <CustomBackdrop open />
      ) : (
        <>
          {PracticeHistoryData?.map(
            (PracticeHistoryItem, PracticeHistoryTableIndex) => {
              return (
                <Box key={PracticeHistoryTableIndex}>
                  <PracticeHistoryTable practiceHistory={PracticeHistoryItem} />
                </Box>
              );
            },
          )}

          {/* Placeholder */}
          {(!PracticeHistoryData || PracticeHistoryData.length == 0) && (
            <Stack spacing={0.5} alignItems="center" sx={{ mt: 1 }}>
              <Typography>You haven't taken any exam test yet</Typography>
              <Link to="/exams">
                <Button
                  variant="contained"
                  sx={{ boxShadow: "none", width: "250px" }}
                >
                  Take your first exam now!
                </Button>
              </Link>
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default PracticeHistoryTab;
