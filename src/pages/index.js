import { useEffect } from "react";
import * as actions from "../store/actions";
import Head from "next/head";
import { connect } from "react-redux";
import { Box, Container, Grid } from "@mui/material";
import { Visits } from "../components/dashboard/visits";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalUsers } from "../components/dashboard/total-users";
import { TotalProfit } from "../components/dashboard/total-profit";
import { UsersStats } from "../components/dashboard/users-stats";
import { VisitsStats } from "../components/dashboard/visits-stats";
import { DashboardLayout } from "../components/dashboard-layout";

const Dashboard = ({ users = [], visits = [], loadUsers, loadVisits }) => {
  useEffect(() => {
    loadUsers();
    loadVisits();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <TotalUsers numberofusers={users.length.toString()} />
            </Grid>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <Visits numberofvisits={visits.length.toString()} />
            </Grid>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <UsersStats sx={{ height: "100%" }} />
            </Grid>
            <Grid item xl={6} lg={6} sm={6} xs={12}>
              <VisitsStats sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ users, visits }) => ({
  users: users.users,
  visits: visits.visits,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
    loadVisits: () => dispatch(actions.loadVisits()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
