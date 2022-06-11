import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography, Grid } from "@mui/material";
import MessagesSendedList from "../../components/messages/messages-sended-list";
import { UsersListToolbar } from "../../components/customer/users-list-toolbar";
import DashboardLayout from "../../components/dashboard-layout";
import { MessagesToolbar } from "../../components/messages/messages-toolbar";

const MessagesSended = ({ loadUsers, messages = [] }) => {
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
              title={`Messages envoyés (${messages.length})`}
            />
            <Box sx={{ mt: 3 }}>
              <MessagesSendedList
                messages={messages.filter(({ subject, sender }) =>
                  [subject.toLowerCase()].some((value) => value.includes(searchValue.toLowerCase()))
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

const mapStateToProps = ({ messages = {}, auth = {} }) => ({
  messages: messages.messages,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
  };
};

MessagesSended.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(MessagesSended);
