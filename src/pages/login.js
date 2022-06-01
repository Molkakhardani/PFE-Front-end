import { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { signInSchema } from "../utils/schema";
import validate from "validate.js";

import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = ({ errorsAuth, loginUser }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState({});
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, signInSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    setAuthState(errorsAuth);
  }, [errorsAuth]);

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

  const handleSignIn = () => {
    console.log();
    loginUser(formState.values, router);
  };

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  return (
    <>
      <Head>
        <title>iShare Sign in</title>
      </Head>
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
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>

          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4" style={{ textAlign: "center" }}>
              Sign in
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            type="email"
            error={hasError("email")}
            helperText={hasError("email") ? formState.errors.email[0] : null}
            variant="outlined"
            onChange={handleChange}
          />
          {authState?.email && (
            <Typography
              component="p"
              color="error"
              style={{ padding: "0px 12px", fontSize: "15px" }}
            >
              {authState?.email}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Mot de passe"
            margin="normal"
            name="password"
            type="password"
            error={hasError("password")}
            helperText={hasError("password") ? formState.errors.password[0] : null}
            variant="outlined"
            onChange={handleChange}
          />
          {authState?.password && (
            <Typography
              component="p"
              color="error"
              style={{ padding: "0px 12px", fontSize: "15px" }}
            >
              {authState?.password}
            </Typography>
          )}
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSignIn}
              disabled={!formState.isValid}
            >
              SE CONNECTER
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body2">
            Vous Avez pas un compte? contacter l&apos;administrateur
          </Typography>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    errorsAuth: auth?.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (authData, history) => dispatch(actions.auth(authData, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
