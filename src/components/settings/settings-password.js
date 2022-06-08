import React, { useState } from "react";
import { updatePassword } from "../../services/";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

export const SettingsPassword = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePassword = async () => {
    const { err } = await updatePassword(values);
    if (err) {
      setErrors(err.response.data);
      return;
    }
    setValues({
      password: "",
      newPassword: "",
      newPasswordConfirmation: "",
    });
  };

  return (
    <Card>
      <CardHeader subheader="mettre à jour votre mot de passe" title="Mot de passe" />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          label="Mot de passe actuel"
          margin="normal"
          name="password"
          onChange={handleChange}
          type="password"
          value={values.password}
          variant="outlined"
        />
        {!!errors?.pwd && (
          <Typography component="p" color="error" style={{ padding: "0px 13px", fontSize: "11px" }}>
            {errors.pwd}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Nouveau mot de passe"
          margin="normal"
          name="newPassword"
          onChange={handleChange}
          type="password"
          value={values.newPassword}
          variant="outlined"
        />
        {!!errors?.newPwd && (
          <Typography component="p" color="error" style={{ padding: "0px 13px", fontSize: "11px" }}>
            {errors.newPwd}
          </Typography>
        )}
        <TextField
          fullWidth
          label="Confirmation"
          margin="normal"
          name="newPasswordConfirmation"
          onChange={handleChange}
          type="password"
          value={values.newPasswordConfirmation}
          variant="outlined"
        />
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          variant="contained"
          disabled={!values.password || !values.newPassword || !values.newPasswordConfirmation}
          onClick={handleChangePassword}
        >
          Mettre à jour
        </Button>
      </Box>
    </Card>
  );
};
