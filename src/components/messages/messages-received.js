import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography, Grid } from "@mui/material";
import MessagesRecievedList from "../../components/messages/messages-recieved-list";
import { UsersListToolbar } from "../../components/customer/users-list-toolbar";

import DashboardLayout from "../../components/dashboard-layout";
import { MessagesToolbar } from "../../components/messages/messages-toolbar";

const MessagesReceived = ({ getUserMessage, openMessage, received = [], authenticateduser }) => {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getUserMessage();
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
        {received.length > 0 ? (
          <>
            <MessagesToolbar
              onSearchHandler={(val) => setSearchValue(val)}
              title={`Messages reçus (${received.length})`}
            />
            <Box sx={{ mt: 3 }}>
              <MessagesRecievedList
                user={authenticateduser}
                openMessage={openMessage}
                messages={received.filter(({ subject, sender }) =>
                  [
                    subject?.toLowerCase(),
                    sender?.lastName.toLowerCase(),
                    sender?.firstName.toLowerCase(),
                  ].some((value) => value?.includes(searchValue.toLowerCase()))
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
  received: messages.receivedMessages,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openMessage: (id) => dispatch(actions.openMessage(id)),
    getUserMessage: () => dispatch(actions.getUserMessage()),
  };
};

MessagesReceived.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(MessagesReceived);
