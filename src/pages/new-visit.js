import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import validate from "validate.js";
import * as actions from "../store/actions";
import { newVisitSchema } from "../utils/schema";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DashboardLayout } from "../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NewVisit = ({ createVisit }) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, newVisitSchema);

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

  const createVisitHandler = (event) => {
    event.preventDefault();
    const visitData = { ...formState.values, date: startDate.toString() };
    createVisit(visitData, router);
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
            Créer une nouvelle visite
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Nom de visiteur"
          margin="normal"
          name="lastName"
          error={hasError("lastName")}
          helperText={hasError("lastName") ? formState.errors.lastName[0] : null}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Prénom de visiteur"
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
        <TextField
          fullWidth
          label="Titre de visite"
          margin="normal"
          name="title"
          error={hasError("title")}
          helperText={hasError("title") ? formState.errors.title[0] : null}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Description de visite"
          margin="normal"
          name="description"
          error={hasError("description")}
          helperText={hasError("description") ? formState.errors.description[0] : null}
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={4}
        />
        <div>
          <Typography color="textPrimary" variant="h6">
            Date:
          </Typography>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MM/dd/yyyy"
          />
          <FormControl fullWidth style={{ margin: "20px 0" }}>
          <InputLabel id="demo-simple-select-label">status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            
            name="status"
            variant="outlined"
          >
            <MenuItem value={"0"}>Cloturé</MenuItem>
            <MenuItem value={"1"}>en cours</MenuItem>
            <MenuItem value={"2"}>plannifié</MenuItem>
            
          </Select>
        </FormControl>
        </div>
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
            disabled={!formState.isValid || !startDate}
            onClick={createVisitHandler}
          >
            Créer la visite
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createVisit: (newVisit, history) => dispatch(actions.createVisit(newVisit, history)),
  };
};

NewVisit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(NewVisit);
