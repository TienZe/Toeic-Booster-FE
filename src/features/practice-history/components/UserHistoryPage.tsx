import { Avatar, Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import Content from "../../../components/layout/Content";
import UserProfileBackground from "../assets/user-profile-background.png";
import TabPanel from "../../../components/UI/TabPanel";
import { useState } from "react";
import DefaultAvatar from "../../../assets/avatars/default.svg";
import { useQuery } from "@tanstack/react-query";
import { me } from "../../auth/api/account-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";
import PracticeHistoryTab from "./PracticeHistoryTab";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import StatisticalTab from "./StatisticalTab";
import { useSearchParams } from "react-router-dom";

const UserHistoryPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const defaultTabIndex = tab === "analysis" ? 1 : 0;

  const { isAuthenticated, token } = useSelector<RootState, AuthState>(
    (state) => state.auth,
  );

  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => me(token!),
    enabled: isAuthenticated,
  });

  return (
    <Content>
      <Box sx={{ px: 2, maxWidth: "840px", mx: "auto" }}>
        <Box sx={{ position: "relative" }}>
          <img src={UserProfileBackground} />
          <Box
            sx={{
              position: "absolute",
              bottom: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Avatar
              src={user?.avatar || DefaultAvatar}
              sx={{
                width: "120px",
                height: "120px",
                border: "3px solid white",
              }}
            />

            {isLoading ? (
              <CustomBackdrop open />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.username || user?.name}
              </Typography>
            )}
          </Box>
        </Box>
        <Paper
          elevation={1}
          sx={{
            marginTop: 7,
            minHeight: "200px",
            padding: 1,
            paddingBottom: 2,
            marginBottom: 2,
            boxShadow: "0 0 29px rgba(100,100,111,.2)",
          }}
        >
          <>
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              sx={{ "& .MuiTab-root": { borderBottomWidth: 1 } }}
            >
              <Tab label="Practice History" />
              <Tab label="Practice Analytics" />
            </Tabs>
            <TabPanel value={tabIndex} index={0} sx={{ padding: "24px" }}>
              <PracticeHistoryTab />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <StatisticalTab />
            </TabPanel>
          </>
        </Paper>
      </Box>
    </Content>
  );
};

export default UserHistoryPage;
