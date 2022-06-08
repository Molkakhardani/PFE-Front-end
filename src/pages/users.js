import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import { UsersList } from "../components/customer/users-list";
import { UsersListToolbar } from "../components/customer/users-list-toolbar";
import DashboardLayout from "../components/dashboard-layout";

const Customers = ({ loadUsers, users = [], authenticatedUser = {} }) => {
  const { _id, account } = authenticatedUser;
  const isAdmin = +account === 1;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        {users.length > 0 ? (
          <>
            <UsersListToolbar onSearchHandler={(val) => setSearchValue(val)} isAdmin={isAdmin} />
            <Box sx={{ mt: 3 }}>
              <UsersList
                users={users.filter((user) =>
                  [
                    user.firstName.toLowerCase(),
                    user.lastName.toLowerCase(),
                    user.email.toLowerCase(),
                  ].some((value) => value.includes(searchValue.toLowerCase()))
                )}
                isAdmin={+authenticatedUser.account === 1}
              />
            </Box>
          </>
        ) : (
          <Typography sx={{ m: 1 }} variant="h6">
            Vous n&apos;avez pas encore créer des comptes utilisateurs
          </Typography>
        )}
      </Container>
    </Box>
  );
};

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ users, auth = {} }) => ({
  users: users.users,
  authenticatedUser: auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
