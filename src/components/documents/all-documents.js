import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography, Grid } from "@mui/material";
import { DocumentsList } from "../../components/documents/documents-list";
import { UsersListToolbar } from "../../components/customer/users-list-toolbar";

import { getUserDocuments } from "../../services/document";
import DashboardLayout from "../../components/dashboard-layout";
import { DocumentsToolbar } from "../../components/documents/documents-toolbar";
import { TotalMessages } from "../../components/messages/total-messages";

const AllDocuments = ({ loadUsers, users = [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allDocuments, setAllDocuments] = useState([]);

  useEffect(async () => {
    const { receivedDocument = [] } = (await getUserDocuments()) || {};
    setAllDocuments(receivedDocument);
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
        {allDocuments.length > 0 ? (
          <>
            <DocumentsToolbar
              onSearchHandler={(val) => setSearchValue(val)}
              title={`Les documents partagés (${allDocuments.length})`}
            />

            <Box sx={{ mt: 3 }}>
              <DocumentsList
                documents={allDocuments.filter(({ subject, sender }) =>
                  [
                    sender.firstName.toLowerCase(),
                    sender.lastName.toLowerCase(),
                    subject.toLowerCase(),
                  ].some((value) => value.includes(searchValue.toLowerCase()))
                )}
              />
            </Box>
          </>
        ) : (
          <Typography sx={{ m: 1 }} variant="h6">
            Vous n&apos;avez pas encore des documents
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
