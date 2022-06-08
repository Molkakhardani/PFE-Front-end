import { useState, useEffect } from "react";
import { getById } from "../../services";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteModal from "./delete-modal";

import moment from "moment";
import localization from "moment/locale/fr";

moment.locale("fr", localization);

export const AccountProfileDetailsAdmin = (props) => {
  const { userid, onDeleteUser, updateAccountStatus } = props;

  const [currentUser, setCurrentUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const { _id, lastName, firstName, email, phoneNumber, post, date, active } = currentUser || {};

  useEffect(async () => {
    if (userid) {
      const { user } = await getById("user", userid);
      setCurrentUser(user);
    }
  }, [userid]);

  const blockedAccount = !active;
  return (
    <form autoComplete="off" noValidate {...props}>
      <DeleteModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleAction={() => onDeleteUser(_id)}
        title="Supression de compte"
        description="voulez-vous vraiment supprimer ce compte ?"
      />
      <Card>
        <CardHeader
          subheader={`crée le ${moment(date).format("LLLL")}`}
          title={`Le profile de ${firstName} ${lastName}`}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                value={firstName || ""}
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                value={lastName || ""}
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={email || ""}
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={phoneNumber || ""}
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
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
              startIcon={blockedAccount ? <CheckCircleOutlineIcon /> : <BlockIcon />}
              style={{ backgroundColor: blockedAccount ? "green" : "red", color: "white" }}
              onClick={() => updateAccountStatus(_id, blockedAccount)}
            >
              {blockedAccount ? "Débloquer" : "Bloquer le compte"}
            </Button>
          </Box>
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
              startIcon={<DeleteIcon />}
              onClick={() => setOpenModal(true)}
            >
              Supprimer
            </Button>
          </Box>
        </Grid>
      </Card>
    </form>
  );
};
