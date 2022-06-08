import { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import moment from "moment";
import localization from "moment/locale/fr";

moment.locale("fr", localization);

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
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";

const AccountProfileDetails = ({ authenticatedUser, updateProfile }) => {
  const { _id, lastName, firstName, email, phoneNumber, post, date, active } =
    authenticatedUser || {};

  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const updateProfileHandler = () => {
    console.log("update");
    updateProfile(values);
  };

  return (
    <Card>
      <CardHeader
        subheader={`crée le ${moment(date).format("LLLL")}`}
        title={`${firstName} ${lastName}`}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Nom"
              name="lastName"
              onChange={handleChange}
              required
              value={values.lastName || ""}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstName"
              onChange={handleChange}
              required
              value={values.firstName || ""}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Adresse mail"
              helperText="Vous pouvez pas changer votre adresse mail !"
              name="email"
              required
              value={email || ""}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="téléphone"
              name="phoneNumber"
              onChange={handleChange}
              type="tel"
              value={values.phoneNumber || ""}
              variant="outlined"
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
            startIcon={<EditIcon />}
            disabled={!values.firstName || !values.lastName || !values.phoneNumber}
            onClick={updateProfileHandler}
          >
            Modifier les informations
          </Button>
        </Box>
      </Grid>
    </Card>
  );
};

const mapStateToProps = ({ auth }) => ({
  authenticatedUser: auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(actions.updateProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfileDetails);
