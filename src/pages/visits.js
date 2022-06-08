import { useEffect } from "react";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { VisitCard } from "../components/visit/visit-card";
import DashboardLayout from "../components/dashboard-layout";
import { ProductListToolbar } from "../components/visit/product-list-toolbar";
import NextLink from "next/link";

const Visits = ({ visits, loadVisits, isAdmin }) => {
  useEffect(() => {
    loadVisits();
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
        <ProductListToolbar isadmin={isAdmin} />
        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {visits.map((visit) => (
              <NextLink key={visit._id} href={`/visit/${visit._id}`} passHref>
                <Grid item lg={4} md={6} xs={12}>
                  <VisitCard visit={visit} />
                </Grid>
              </NextLink>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

Visits.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = ({ visits, auth = {} }) => ({
  isAdmin: auth.isAdmin,
  visits: visits.visits,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadVisits: () => dispatch(actions.loadVisits()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Visits);
