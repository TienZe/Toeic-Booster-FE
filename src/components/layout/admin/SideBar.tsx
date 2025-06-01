import { Box, useTheme } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const theme = useTheme();
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);

  // Helper for submenu active state
  const isVocaActive =
    location.pathname.startsWith("/admin/voca-set") ||
    location.pathname.startsWith("/admin/lesson") ||
    location.pathname.startsWith("/admin/word");

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
            <img src="/logo/logo.png" style={{ maxWidth: "140px" }} />
          )}
        </Link>
      </Box>
      <Menu
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            "&.ps-active:not(.ps-submenu-content .ps-active)": {
              background: theme.palette.gradient.main, // or your desired background
              color: "white", // or your desired color for parent
            },
            ".ps-submenu-content  &.ps-active": {
              color: theme.palette.primary.main,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => navigate("/admin")}
          icon={<Home />}
          active={location.pathname === "/admin"}
        >
          Dashboard
        </MenuItem>
        {user && isAdmin(user) && (
          <Link to="/admin/account">
            <MenuItem
              icon={<SupervisorAccount />}
              active={location.pathname === "/admin/account"}
            >
              Accounts
            </MenuItem>
          </Link>
        )}
        <MenuItem
          onClick={() => navigate("/admin/exam-set")}
          icon={<Book />}
          active={location.pathname === "/admin/exam-set"}
        >
          Exams
        </MenuItem>

        <SubMenu
          label="Vocabularies"
          icon={<Translate />}
          active={isVocaActive}
          open={isVocaActive}
          onClick={() => navigate("/admin/voca-set")}
        >
          <MenuItem
            onClick={() => navigate("/admin/voca-set")}
            active={
              location.pathname === "/admin/voca-set" ||
              location.pathname === "/admin/lesson"
            }
          >
            Collections
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/admin/word")}
            active={location.pathname === "/admin/word"}
          >
            Words
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
