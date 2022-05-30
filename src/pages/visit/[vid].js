import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { VisitAccount } from "src/components/account/visit-account";

const visitProfile = ({ visits, deleteAccountVisit, updatedAccountVisit }) => {
  const router = useRouter();
  const { vid } = router.query;
  const currentVisit = visits.find((visit) => visit._id === vid) || {};

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

            <VisitAccount
            
            visitProfile ={currentVisit}
            onDeleteVisit={(id) => deleteAccountVisit(id, router)}
            updateAccountVisit={(id,updatedStatus) =>
            updatedAccountVisit(id, updatedStatus ,router)
            }/>
          
            
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

visitProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ visits }) => ({
  visits: visits.visits,
});


  const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccountVisit: (id, router) => dispatch(actions.deleteAccountVisit(id, router)),
    updatedAccountVisit: (id, status, router) =>
      dispatch(actions.updatedAccountVisit(id, status, router)),
  };
  };



export default connect(mapStateToProps,mapDispatchToProps)(visitProfile);
