import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { getMessageById, deleteMessageById } from "../../services";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../components/account/delete-modal";

import moment from "moment";
import localization from "moment/locale/fr";

moment.locale("fr", localization);

const Message = ({ authenticatedUser = {} }) => {
  const router = useRouter();
  const { mId } = router.query;
  const { _id: authUserId } = authenticatedUser;

  const [currentMessage, setCurrentMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(async () => {
    if (mId) {
      const { message } = (await getMessageById(mId)) || {};
      setCurrentMessage(message);
    }
  }, [mId]);
  console.log({ currentMessage });

  const {
    _id: messageId,
    subject,
    timestamp,
    sender,
    messageBody,
    destinations,
  } = currentMessage || {};

  const { lastName, firstName, _id: senderId } = sender || {};

  const isSendedMessage = authUserId === senderId;

  if (!currentMessage) return null;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 10,
      }}
    >
      <DeleteModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleAction={() => deleteMessageById(messageId, router)}
        title="Supression de message"
        description="voulez-vous vraiment supprimer ce message ?"
      />
      <Container>
        <Grid container>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader
                title={subject}
                subheader={
                  isSendedMessage
                    ? `envoyé à ${destinations
                        ?.map(({ receiver }) => receiver)
                        .join(", ")}, le ${moment(timestamp).format("LLLL")}`
                    : `De ${lastName} ${firstName} le ${moment(timestamp).format("LLLL")}`
                }
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
                  {isSendedMessage ? (
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => setOpenModal(true)}
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Supprimer
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => router.push("/messages/new-message")}
                    >
                      Répondre
                    </Button>
                  )}
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

const mapStateToProps = ({ auth }) => ({
  authenticatedUser: auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(actions.updateProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
