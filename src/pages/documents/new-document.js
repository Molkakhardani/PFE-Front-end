import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import validate from "validate.js";
import * as actions from "../../store/actions";
import { sendDocument } from "../../services/document";
import { DropzoneArea } from "material-ui-dropzone";

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

const NewDocument = ({ loadUsers, users = {} }) => {
  const router = useRouter();
  const { users: allUsers } = users;

  const [privateMessage, setPrivateMessage] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [file, setFile] = useState([]);
  const [formState, setFormState] = useState({
    subject: "",
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

  const sendDocumenthandler = (event) => {
    const newUpload = {
      ...formState,
      destinations,
      file,
    };
    sendDocument(newUpload, router);
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
            Partager un nouveau document
          </Typography>
        </Box>
        Document Privé:{" "}
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
        <DropzoneArea
          onChange={(value) => setFile(value)}
          showAlerts={false}
          filesLimit={1}
          showFileNamesInPreview
          showFileNames
          dropzoneText="Impoter le document"
        />
        <Box sx={{ py: 2 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
            disabled={!formState.subject || file.length === 0}
            onClick={sendDocumenthandler}
          >
            Partager le document
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
  };
};

NewDocument.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(NewDocument);
