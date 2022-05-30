import { useState } from "react";
import { useRouter } from "next/router";
import validate from "validate.js";
import DatePicker from "react-datepicker";
import Head from "next/head";
import NextLink from "next/link";
import { connect } from "react-redux";
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
import DeleteModal from "./delete-modal";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import SaveIcon from '@mui/icons-material/Save';
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

export const VisitAccount = (props) => {
    const [startDate, setStartDate] = useState();

  const { visitProfile, adminview = true,onDeleteVisit , updateAccountVisit} = props;

  const {_id, firstName, lastName, email, phoneNumber, status, title, description, creationDate, date} = visitProfile || {};

  const [openModal, setOpenModal] = useState(false);
  const [values, setValues] = useState({
    
    firstName , 
    lastName, 
    email, 
    phoneNumber, 
    status, 
    title, 
    description, 
    date,
    status
  });
  const s=values.status;
  
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  console.log(setValues)

  /*   const formattedDate = format(new Date(date), "dd/MM/yyyy"); */
  const formattedDate = date;

  return (


    <form autoComplete="off" noValidate {...props}>
    <DeleteModal
      open={openModal}
      handleClose={() => setOpenModal(false)}
      handleAction={() => onDeleteVisit(_id)}
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
          subheader={!adminview ? "The information can be edited" : null}
          title={`La visite de ${firstName} ${lastName} `}
        />
        </Typography>
      </Box>
  
       <TextField
       fullWidth
       label="nom"
       name="lastName"
       onChange={handleChange}
       required
       value={values.lastName}
       variant="outlined"
      // disabled={adminview}
     />
    

    <TextField
       fullWidth
       label="Prénom"
       name="firstName"
       onChange={handleChange}
       required
       value={values.firstName}
       variant="outlined"
      // disabled={adminview}
     />


      <TextField
       fullWidth
       label="email"
       name="email"
       onChange={handleChange}
       required
       value={values.email}
       variant="outlined"
      // disabled={adminview}
     />
     <TextField
         fullWidth
          label="Phone Number"
          name="phoneNumber"
          onChange={handleChange}
        value={values.phoneNumber}
         variant="outlined"
           //disabled={adminview}
              />
      <TextField
         fullWidth
          label="titre de visite"
          name="title"
          onChange={handleChange}
        value={values.title}
         variant="outlined"
           //disabled={adminview}
        />
       <TextField
       
         fullWidth
          label="description"
          name="description"
          onChange={handleChange}
        value={values.description}
         variant="outlined"
           //disabled={adminview}
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
          OnChange={handleChange}
          value={values.date}
          variant="outlined"
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
            value={s}
            name="status"
            variant="outlined"
          >
            <MenuItem value={"0"}>Cloturé</MenuItem>
            <MenuItem value={"1"}>en cours</MenuItem>
            <MenuItem value={"2"}>plannifié</MenuItem>
            
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
                startIcon={<SaveIcon/>}
                onClick ={()=> updateAccountVisit(_id)}
              > Sauvegarder les modifications
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
    
    </Container>
  </Box>
  </form>
  
);
};
