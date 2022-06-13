import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { getMessageById } from "../../services";
import Head from "next/head";
import {
  Card,
  Divider,
  Box,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { AccountProfileDetailsAdmin } from "../../components/account/account-profile-details-admin";
import DashboardLayout from "../../components/dashboard-layout";

import moment from "moment";
import localization from "moment/locale/fr";

moment.locale("fr", localization);

const Message = () => {
  const router = useRouter();
  const { mId } = router.query;

  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(async () => {
    if (mId) {
      const { message } = (await getMessageById(mId)) || {};
      setCurrentMessage(message);
    }
  }, [mId]);
  console.log({ currentMessage });

  const { subject, timestamp, sender, messageBody } = currentMessage || {};
  if (!currentMessage) return null;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 10,
      }}
    >
      <Container>
        <Grid container>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader
                title={subject}
                subheader={`De ${sender.lastName} ${sender.firstName} le ${moment(timestamp).format(
                  "LLLL"
                )}`}
              />
              <Divider />
              <CardContent>
                <Grid container>
                  <Typography>{messageBody}</Typography>
                </Grid>
              </CardContent>
              <Divider />
              <Grid container justifyContent="flex-end" alignItems="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                  item
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => router.push("/messages/new-message")}
                  >
                    Répondre
                  </Button>
                </Box>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Message.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Message;
