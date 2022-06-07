import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography, Grid } from "@mui/material";
import { MessagesList } from "../../components/messages/messages-list";
import { UsersListToolbar } from "../../components/customer/users-list-toolbar";
import { messages } from "../../__mocks__/messages";
import DashboardLayout from "../../components/dashboard-layout";
import { MessagesToolbar } from "../../components/messages/messages-toolbar";
import { TotalMessages } from "../../components/messages/total-messages";

const Messages = ({ loadUsers, users = [] }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6} sm={6} xs={12} margin="normal">
            <TotalMessages count={5} title="BOITE DE RECEPTION" received />
          </Grid>
          <Grid item xl={6} lg={6} sm={6} xs={12} margin="normal">
            <TotalMessages count={10} title="MESSAGE ENVOYES" />
          </Grid>
        </Grid>
        {messages.length > 0 ? (
          <>
            <MessagesToolbar onSearchHandler={(val) => setSearchValue(val)} />
            <Box sx={{ mt: 3 }}>
              <MessagesList
                messages={messages.filter(({ subject, sender }) =>
                  [subject.toLowerCase(), sender.toLowerCase()].some((value) =>
                    value.includes(searchValue.toLowerCase())
                  )
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

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
  };
};

Messages.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
