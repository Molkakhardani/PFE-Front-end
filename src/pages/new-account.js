import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import validate from "validate.js";
import * as actions from "../store/actions";
import { newAccountSchema } from "../utils/schema";
import Head from "next/head";
import NextLink from "next/link";
import { connect } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

import DashboardLayout from "../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = ({ createUser, errors }) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, newAccountSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    if (event.persist) {
      event.persist();
    }
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const createAccountHandler = (event) => {
    event.preventDefault();
    createUser(formState.values, router);
  };

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ my: 3 }}>
          <Typography color="textPrimary" variant="h4" style={{ textAlign: "center" }}>
            Créer un nouveau utilisateur
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Nom"
          margin="normal"
          name="lastName"
          error={hasError("lastName")}
          helperText={hasError("lastName") ? formState.errors.lastName[0] : null}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Prénom"
          margin="normal"
          name="firstName"
          error={hasError("firstName")}
          helperText={hasError("firstName") ? formState.errors.firstName[0] : null}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Adresse mail"
          margin="normal"
          name="email"
          type="email"
          error={hasError("email")}
          helperText={hasError("email") ? formState.errors.email[0] : null}
          variant="outlined"
          onChange={handleChange}
        />
        {!!errors?.email && (
          <Typography component="p" color="error" style={{ padding: "0px 13px", fontSize: "11px" }}>
            {errors.email}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Téléphone"
          margin="normal"
          name="phoneNumber"
          type="tel"
          error={hasError("phoneNumber")}
          helperText={hasError("phoneNumber") ? formState.errors.phoneNumber[0] : null}
          variant="outlined"
          onChange={handleChange}
        />
        <FormControl fullWidth style={{ margin: "20px 0" }}>
          <InputLabel id="demo-simple-select-label">Poste</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formState.values?.post || ""}
            onChange={handleChange}
            name="post"
            variant="outlined"
          >
            <MenuItem value={"1"}>Manager</MenuItem>
            <MenuItem value={"2"}>Ingénieur</MenuItem>
            <MenuItem value={"3"}>Technicien</MenuItem>
            <MenuItem value={"4"}>Ouvrier</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ margin: "20px 0" }}>
          <InputLabel id="demo-simple-select-label">Compte</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formState.values?.account || ""}
            onChange={handleChange}
            name="account"
            variant="outlined"
          >
            <MenuItem value={"0"}>Utilisateur</MenuItem>
            <MenuItem value={"1"}>Administrateur</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
            disabled={!formState.isValid}
            onClick={createAccountHandler}
          >
            Créer le compte
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ users }) => {
  return users;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (newUser, history) => dispatch(actions.createAccount(newUser, history)),
  };
};

Register.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
