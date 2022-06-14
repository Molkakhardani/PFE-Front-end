import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { getUserDocuments, deleteDocumentById } from "../../services/document";
import { Box, Container, Typography, Grid } from "@mui/material";
import { DocumentsList } from "../../components/documents/documents-list";
import { UsersListToolbar } from "../../components/customer/users-list-toolbar";
import { documents } from "../../__mocks__/documents";
import DashboardLayout from "../../components/dashboard-layout";
import { DocumentsToolbar } from "../../components/documents/documents-toolbar";
import { TotalMessages } from "../../components/messages/total-messages";

const MyDocuments = ({ loadUsers, users = [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [myDocuments, setMyDocuments] = useState([]);

  const getMyDocumentsHandler = async () => {
    const { documents = [] } = (await getUserDocuments()) || {};
    setMyDocuments(documents);
  };

  useEffect(async () => {
    getMyDocumentsHandler();
  }, []);

  const deleteDocumentHandler = async (id) => {
    await deleteDocumentById(id);
    getMyDocumentsHandler();
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <DocumentsToolbar
          onSearchHandler={(val) => setSearchValue(val)}
          title={`Mes documents (${myDocuments.length})`}
          withButton
        />
        {myDocuments.length > 0 ? (
          <Box sx={{ mt: 3 }}>
            <DocumentsList
              documents={myDocuments.filter(({ subject, sender }) =>
                [
                  sender.firstName.toLowerCase(),
                  sender.lastName.toLowerCase(),
                  subject.toLowerCase(),
                ].some((value) => value.includes(searchValue.toLowerCase()))
              )}
              mydocument
              deleteDocument={deleteDocumentHandler}
            />
          </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyDocuments);
