import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import validate from "validate.js";
import * as actions from "../../store/actions";
import { newAccountSchema } from "../../utils/schema";
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
  Switch,
} from "@mui/material";

import DashboardLayout from "../../components/dashboard-layout";
import { MessageDestination } from "../../components/messages/message-destination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = ({ loadUsers, users = {}, sendMessageHandler }) => {
  const router = useRouter();
  const { users: allUsers } = users;

  const [privateMessage, setPrivateMessage] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [formState, setFormState] = useState({
    subject: "",
    messageBody: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (event) => {
    if (event.persist) {
      event.persist();
    }
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const sendMessage = (event) => {
    console.log({ formState, destinations });
    const newMessage = {
      ...formState,
      destinations,
    };
    sendMessageHandler(newMessage, router);
  };

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
      <Container maxWidth="md">
        <Box sx={{ my: 3 }}>
          <Typography color="textPrimary" variant="h4" style={{ textAlign: "center" }}>
            Nouveau Message
          </Typography>
        </Box>
        Message Privé:{" "}
        <Switch defaultChecked onChange={(e) => setPrivateMessage(e.target.checked)} />
        <div style={{ visibility: privateMessage ? "visible" : "hidden", height: "70px" }}>
          <MessageDestination
            onChange={(destinations) => setDestinations(destinations)}
            data={allUsers}
          />
        </div>
        <TextField
          fullWidth
          label="Sujet"
          margin="normal"
          name="subject"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="messageBody"
          name="messageBody"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          multiline
          rows={19}
        />
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
            disabled={!formState.subject || !formState.messageBody}
            onClick={sendMessage}
          >
            Envoyer le message
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
    sendMessageHandler: (message, router) => dispatch(actions.sendMessage(message, router)),
  };
};

Register.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
