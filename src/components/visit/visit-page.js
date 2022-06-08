import moment from "moment";
import localization from "moment/locale/fr";
moment.locale("fr", localization);

import DatePicker from "react-datepicker";
import Head from "next/head";
import NextLink from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";

import { SeverityPill } from "../severity-pill";

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

const visitMapping = [
  {
    code: 2,
    color: "warning",
    wording: "plannifiée",
  },
  {
    code: 1,
    color: "success",
    wording: "en cours",
  },
  {
    code: 0,
    color: "info",
    wording: "cloturée",
  },
];

const VisitStatus = (code) => {
  const { color, wording } = visitMapping.find((visit) => visit.code === code) || {};
  return <SeverityPill color={color}>{wording}</SeverityPill>;
};

export const VisitPage = ({ visit, onDeleteVisit, updateAccountVisit }) => {
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
  } = visit || {};

  return (
    <>
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
              Date: {moment(date).format("LLLL")}
            </Typography>
            <Typography color="textPrimary" variant="h6">
              Status actuel: {VisitStatus(status)}
            </Typography>
          </div>
        </Container>
      </Box>
    </>
  );
};
