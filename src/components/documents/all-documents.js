import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Container, Typography, Grid } from "@mui/material";
import { DocumentsList } from "../../components/documents/documents-list";
import { CustomerListToolbar } from "../../components/customer/customer-list-toolbar";
import { documents } from "../../__mocks__/documents";
import DashboardLayout from "../../components/dashboard-layout";
import { DocumentsToolbar } from "../../components/documents/documents-toolbar";
import { TotalMessages } from "../../components/messages/total-messages";

const AllDocuments = ({ loadUsers, users = [] }) => {
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
        {documents.length > 0 ? (
          <>
            <DocumentsToolbar
              onSearchHandler={(val) => setSearchValue(val)}
              title="Les documents partagés"
            />

            <Box sx={{ mt: 3 }}>
              <DocumentsList
                documents={documents.filter(({ title, owner }) =>
                  [title.toLowerCase(), owner.toLowerCase()].some((value) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
