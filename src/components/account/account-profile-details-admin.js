import { useState } from "react";
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

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

export const AccountProfileDetailsAdmin = (props) => {
  const { userProfile, onDeleteUser, updateAccountStatus } = props;
  const { _id, lastName, firstName, email, phoneNumber, post, date, active } = userProfile || {};

  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState({
    firstName,
    lastName,
    email,
    phone: phoneNumber,
    post,
    state: "Alabama",
    country: "USA",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Post"
                name="post"
                onChange={handleChange}
                required
                value={values.post}
                variant="outlined"
                disabled
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
