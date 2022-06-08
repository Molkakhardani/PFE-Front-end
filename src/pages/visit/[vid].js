import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import DashboardLayout from "../../components/dashboard-layout";
import { VisitPage } from "src/components/visit/visit-page";

const VisitProfile = ({ deleteAccountVisit, updateVisitHandler }) => {
  const router = useRouter();
  const { vid } = router.query;

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
              <VisitPage
                visitid={vid}
                onDeleteVisit={(id) => deleteAccountVisit(id, router)}
                updateAccountVisit={(updatedData) => updateVisitHandler(updatedData, router)}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

VisitProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ visits }) => ({
  visits: visits.visits,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccountVisit: (id, router) => dispatch(actions.deleteAccountVisit(id, router)),
    updateVisitHandler: (updatedData, router) => dispatch(actions.updateVisit(updatedData, router)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitProfile);
