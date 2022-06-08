import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getById from "../../services/getById";
import moment from "moment";
import validate from "validate.js";
import DatePicker from "react-datepicker";
import Head from "next/head";
import NextLink from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

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
  CardHeader,
  Grid,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteModal from "../account/delete-modal";
import "react-datepicker/dist/react-datepicker.css";
import SaveIcon from "@mui/icons-material/Save";
import { CleaningServices } from "@mui/icons-material";

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

export const VisitPage = ({ visitid, onDeleteVisit, updateAccountVisit }) => {
  const [currentVisit, setCurrentVisit] = useState(null);

  useEffect(async () => {
    if (visitid) {
      const { visit } = await getById("visit", visitid);
      setCurrentVisit(visit);
    }
  }, [visitid]);

  const {
    _id,
    firstName,
    lastName,
    email,
    phoneNumber,
    status,
    title,
    description,
    creationDate,
    date,
  } = currentVisit || {};
  console.log({ currentVisit });
  const [startDate, setStartDate] = useState(moment(date).toDate());

  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState({
    firstName,
    lastName,
    email,
    phoneNumber,
    status,
    title,
    description,
    date,
    status,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const updateVisitHandler = () => {
    const updatedVisitData = {
      ...values,
      date: startDate,
      _id,
    };
    updateAccountVisit(updatedVisitData);
  };

  return (
    <>
      <DeleteModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleAction={() => onDeleteVisit(_id)}
        title="Supression de visite"
        description="voulez-vous vraiment supprimer cette visite ?"
      />

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
              <CardHeader
                /*   subheader={!adminview ? "The information can be edited" : null} */
                title={`La visite de ${firstName} ${lastName} `}
              />
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="nom"
            name="lastName"
            required
            margin="normal"
            value={lastName || ""}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            fullWidth
            label="Prénom"
            name="firstName"
            required
            margin="normal"
            value={firstName || ""}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            fullWidth
            label="email"
            name="email"
            onChange={handleChange}
            required
            margin="normal"
            value={email || ""}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            margin="normal"
            value={phoneNumber || ""}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="titre de visite"
            name="title"
            value={title || ""}
            margin="normal"
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="description"
            name="description"
            value={description || ""}
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
            margin="normal"
            multiline
            rows={4}
          />
          <div>
            <Typography color="textPrimary" variant="h6">
              Date:
            </Typography>

            <DatePicker
              selected={startDate || ""}
              onChange={(date) => setStartDate(date)}
              variant="outlined"
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="dd-MM-yyyy"
              disabled
            />
            <FormControl fullWidth style={{ margin: "20px 0" }}>
              <InputLabel id="demo-simple-select-label">status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                value={status || 0}
                name="status"
                variant="outlined"
                disabled
              >
                <MenuItem value={0}>Cloturé</MenuItem>
                <MenuItem value={1}>en cours</MenuItem>
                <MenuItem value={2}>plannifié</MenuItem>
              </Select>
            </FormControl>
          </div>
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
                startIcon={<SaveIcon />}
                onClick={updateVisitHandler}
              >
                Sauvegarder les modifications
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
                style={{ backgroundColor: "red", color: "white" }}
              >
                Supprimer
              </Button>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
