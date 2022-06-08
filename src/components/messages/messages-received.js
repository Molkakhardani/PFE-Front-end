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

const MessagesReceived = ({ loadUsers, users = [] }) => {
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
        {messages.length > 0 ? (
          <>
            <MessagesToolbar
              onSearchHandler={(val) => setSearchValue(val)}
              title={`Messages reçus (${messages.length})`}
            />
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

MessagesReceived.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(MessagesReceived);
