import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import getById from "../../services/getById";
import * as actions from "../../store/actions";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import DashboardLayout from "../../components/dashboard-layout";
import { VisitPage } from "src/components/visit/visit-page";
import { UpdateVisitPage } from "src/components/visit/update-visit-page";

const VisitProfile = ({ authenticatedUser = {}, deleteAccountVisit, updateVisitHandler }) => {
  const router = useRouter();
  const { vid } = router.query;
  const { account } = authenticatedUser;
  const isAdmin = +account === 1;

  const [currentVisit, setCurrentVisit] = useState(null);

  useEffect(async () => {
    if (vid) {
      const { visit } = await getById("visit", vid);
      setCurrentVisit(visit);
    }
  }, [vid]);

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
              {isAdmin ? (
                <UpdateVisitPage
                  visit={currentVisit}
                  onDeleteVisit={(id) => deleteAccountVisit(id, router)}
                  updateAccountVisit={(updatedData) => updateVisitHandler(updatedData, router)}
                />
              ) : (
                <VisitPage visit={currentVisit} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

VisitProfile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ visits, auth = {} }) => ({
  visits: visits.visits,
  authenticatedUser: auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccountVisit: (id, router) => dispatch(actions.deleteAccountVisit(id, router)),
    updateVisitHandler: (updatedData, router) => dispatch(actions.updateVisit(updatedData, router)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitProfile);
