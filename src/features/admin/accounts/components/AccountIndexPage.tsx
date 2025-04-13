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
import useAdminTablePagination from "../../hooks/useAdminTablePagination";
import { Role, User } from "../../../../types/auth";
import AdminTableContainer from "../../vocasets/components/AdminTableContainer";
import TablePaginationActions from "../../../../components/UI/TablePaginationActions";
import format from "date-fns/format";
import { Controller, useForm } from "react-hook-form";
import RoundedInput from "../../../../components/UI/RoundedInput";
import BootstrapSelect from "../../../../components/UI/BootstrapSelect";
import { capitalizeFirstLetter } from "../../../../utils/stringFormatter";
import useDebounce from "../../../../hooks/useDebounce";
import UserInfoModal from "./UserInfoModal";
import UserStatusLegend from "./UserStatusLegend";

const USER_PAGE_SIZE = 10;

const DEFAULT_FILTER_FORM = {
  search: "",
  role: "all",
  status: "all",
};

type FilterForm = {
  search: string;
  role: string;
  status: string;
};

const AccountIndexPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { control, watch, reset } = useForm<FilterForm>({
    defaultValues: DEFAULT_FILTER_FORM,
  });

  const search = watch("search");
  const debouncedSearch = useDebounce(search);

  const [role, status] = watch(["role", "status"]);

  const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>(users);

  const {
    page,
    setPage,
    emptyRows,
    pageData,
    handleChangePage,
    // invalidatePage,
  } = useAdminTablePagination<User>(filteredUsers || [], USER_PAGE_SIZE);

  useEffect(() => {
    // Update the filtered users when filter form changes
    const newFilteredUsers = users?.filter((user) => {
      if (role !== "all" && !user.roles.includes(role as Role)) {
        return false;
      }

      if (status !== "all" && user.isActive !== (status === "active")) {
        return false;
      }

      const searchLower = debouncedSearch.toLowerCase();
      if (
        !user.email.toLowerCase().includes(searchLower) &&
        !user.name.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      return true;
    });

    setFilteredUsers(newFilteredUsers);
    setPage(0);
  }, [debouncedSearch, role, setPage, status, users]);

  const handleResetFilter = () => {
    reset(DEFAULT_FILTER_FORM);
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
          // onSubmit={handleFilter(handleFilterTable)}
        >
          <Grid2 spacing={1} container sx={{ flex: "0 1 900px" }}>
            <Grid2 size={6}>
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <RoundedInput
                    {...field}
                    label="Search"
                    placeholder="Search by email, name"
                    padding="16.5px 14px"
                    borderRadius={4}
                    gap={0.5}
                    labelColor="secondary.main"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={2}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <BootstrapSelect
                    {...field}
                    label="Status"
                    defaultValue={"all"}
                    itemLabels={["All", "Active", "Inactive"]}
                    itemValues={["all", "active", "inactive"]}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={2}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <BootstrapSelect
                    {...field}
                    label="Role"
                    defaultValue="all"
                    itemLabels={["All", "User", "Moderator", "Admin"]}
                    itemValues={["all", "user", "moderator", "admin"]}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={2} sx={{ display: "flex" }}>
              <Button
                startIcon={<FilterAltOff />}
                disableRipple
                sx={{ py: "14px", px: "10px", alignSelf: "flex-end" }}
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
        {isLoading ? (
          <CustomBackdrop open />
        ) : (
          <AdminTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={100}>ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center" width={50}>
                    Status
                  </TableCell>
                  <TableCell align="center" width={125}>
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
                {pageData.map((user: User) => (
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
                      {user.roles
                        .map((role) => capitalizeFirstLetter(role))
                        .join(",")}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          backgroundColor: user.isActive
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
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 41 * emptyRows,
                      backgroundColor: "white",
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[USER_PAGE_SIZE]}
                    count={filteredUsers?.length || 0}
                    rowsPerPage={USER_PAGE_SIZE}
                    page={page}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </AdminTableContainer>
        )}

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
