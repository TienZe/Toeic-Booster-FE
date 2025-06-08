import {
  Box,
  Button,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { FilterAltOff } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user-api";
import CustomBackdrop from "../../../../components/UI/CustomBackdrop";
import { User, UserStatus } from "../../../../types/auth";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import format from "date-fns/format";
import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import useDebounce from "../../../../hooks/useDebounce";
import UserInfoModal from "./UserInfoModal";
import UserStatusLegend from "./UserStatusLegend";

const USER_PAGE_SIZE = 10;

const AccountIndexPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filteredStatus, setFilteredStatus] = useState<UserStatus | "">("");

  const { data: paginatedUsers, isLoading } = useQuery({
    queryKey: [
      "users",
      {
        page,
        limit: USER_PAGE_SIZE,
        search: debouncedSearch,
        status: filteredStatus,
      },
    ],
    queryFn: () =>
      getUsers({
        page,
        limit: USER_PAGE_SIZE,
        search: debouncedSearch,
        filteredStatus: filteredStatus || undefined,
      }),
  });

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  const handleResetFilter = () => {
    setSearch("");
    setFilteredStatus("");
    setPage(0);
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <Typography variant="h4" sx={{ marginBottom: 1 }}>
            User Accounts
          </Typography>
          {/* <Button variant="outlined" startIcon={<AddCircleOutline />}>
            Add an user
          </Button> */}
        </Stack>

        <form
          id="filter-voca-sets-form"
          style={{
            marginBottom: "2rem",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
          }}
        >
          <Grid2 spacing={1} container sx={{ flex: "0 1 900px" }}>
            <Grid2 size={6}>
              <RoundedInput
                label="Search"
                placeholder="Search by email, name"
                padding="16.5px 14px"
                borderRadius={4}
                gap={0.5}
                labelColor="secondary.main"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid2>
            <Grid2 size={2}>
              <BootstrapSelect
                label="Status"
                defaultValue={""}
                itemLabels={["All", "Active", "Inactive"]}
                itemValues={["", "active", "inactive"]}
                value={filteredStatus}
                onChange={(e) =>
                  setFilteredStatus(e.target.value as UserStatus)
                }
              />
            </Grid2>
            <Grid2 size={2} sx={{ display: "flex" }}>
              <Button
                startIcon={<FilterAltOff />}
                disableRipple
                sx={{ py: "5px", px: "16px", alignSelf: "flex-end" }}
                onClick={handleResetFilter}
              >
                Clear
              </Button>
            </Grid2>
          </Grid2>
          <Box sx={{ textAlign: "right" }}>
            <UserStatusLegend label="Active" color="success.main" />
            <UserStatusLegend label="Disabled" color="divider" />
          </Box>
        </form>

        {isLoading && <CustomBackdrop />}
        <AdminTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={100}>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center" width={80}>
                  Status
                </TableCell>
                <TableCell align="center" width={150}>
                  Registered at
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableRow-root:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  cursor: "pointer",
                },
              }}
            >
              {paginatedUsers?.items?.map((user: User) => (
                <TableRow key={user.id} onClick={() => setSelectedUser(user)}>
                  <TableCell
                    sx={{
                      maxWidth: "50px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {user.id}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        backgroundColor:
                          user.status == UserStatus.Active
                            ? "success.main"
                            : "divider",
                        borderRadius: "50%",
                      }}
                    ></Box>
                  </TableCell>
                  <TableCell align="center">
                    {format(new Date(user.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[USER_PAGE_SIZE]}
                  count={paginatedUsers?.total || 0}
                  rowsPerPage={USER_PAGE_SIZE}
                  page={page}
                  onPageChange={(_e, newPage) => setPage(newPage)}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </AdminTableContainer>

        {/* User information modal */}
        {selectedUser && (
          <UserInfoModal
            key={selectedUser?.id}
            modal={{
              open: selectedUser !== null,
              onClose: () => setSelectedUser(null),
            }}
            defaultUser={selectedUser}
          />
        )}
      </Box>
    </>
  );
};

export default AccountIndexPage;
