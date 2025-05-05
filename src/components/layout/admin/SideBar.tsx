import { Box, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logos/logo.svg";
import LogoMini from "../../../assets/logos/logomini.png";
import Link from "../../UI/Link";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { AuthState } from "../../../stores/authSlice";
import { isAdmin } from "../../../types/auth";
import { Book, Home, SupervisorAccount, Translate } from "@mui/icons-material";

const SideBar = (props: { collapsed: boolean }) => {
  const { collapsed } = props;
  const navigate = useNavigate();
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);

  return (
    <Sidebar collapsed={collapsed} width="240px">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
          px: 1,
        }}
      >
        <Link
          to="/"
          style={{
            width: 150,
            height: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {collapsed ? (
            <img src={LogoMini} style={{ height: "30px", width: "auto" }} />
          ) : (
            <img src={Logo} />
          )}
        </Link>
      </Box>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "#b6c8d9",
            },
          },
        }}
      >
        <MenuItem onClick={() => navigate("/admin")} icon={<Home />}>
          Dashboard
        </MenuItem>
        {user && isAdmin(user) && (
          <Link to="/admin/account">
            <MenuItem icon={<SupervisorAccount />}>Accounts</MenuItem>
          </Link>
        )}
        <MenuItem onClick={() => navigate("/admin/exam-set")} icon={<Book />}>
          Exams
        </MenuItem>

        <SubMenu label="Vocabularies" icon={<Translate />}>
          <MenuItem onClick={() => navigate("/admin/voca-set")}>
            Collections
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/word")}>Words</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
