import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfileDetailsAdmin } from "../../components/account/account-profile-details-admin";
import DashboardLayout from "../../components/dashboard-layout";

const userProfile = ({ users, deleteAccount, updatedAccountStatus }) => {
  const router = useRouter();
  const { uid } = router.query;
  const currentUser = users.find((user) => user._id === uid) || {};

  return (
    <>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <AccountProfileDetailsAdmin
                userProfile={currentUser}
                onDeleteUser={(id) => deleteAccount(id, router)}
                updateAccountStatus={(id, updatedStatus) =>
                  updatedAccountStatus(id, updatedStatus, router)
                }
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

userProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: (id, router) => dispatch(actions.deleteAccount(id, router)),
    updatedAccountStatus: (id, status, router) =>
      dispatch(actions.updatedAccountStatus(id, status, router)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(userProfile);
