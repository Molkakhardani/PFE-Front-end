import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography } from "@mui/material";
import { UsersList } from "../components/customer/users-list";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Customers = ({ loadUsers, users = [] }) => {
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
            <CustomerListToolbar onSearchHandler={(val) => setSearchValue(val)} />
            <Box sx={{ mt: 3 }}>
              <UsersList
                users={users.filter((user) =>
                  [
                    user.firstName.toLowerCase(),
                    user.lastName.toLowerCase(),
                    user.email.toLowerCase(),
                  ].some((value) => value.includes(searchValue.toLowerCase()))
                )}
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

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
