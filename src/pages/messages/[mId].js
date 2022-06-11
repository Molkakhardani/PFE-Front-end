import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfileDetailsAdmin } from "../../components/account/account-profile-details-admin";
import DashboardLayout from "../../components/dashboard-layout";

const Message = () => {
  const router = useRouter();
  const { mId } = router.query;

  return <h1>{mId}</h1>;
};

export default Message;
