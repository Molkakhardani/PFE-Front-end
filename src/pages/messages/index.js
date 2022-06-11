import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import MessagesReceived from "../../components/messages/messages-received";
import MessagesSended from "../../components/messages/messages-sended";

import DashboardLayout from "../../components/dashboard-layout";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Messages = ({ getUserMessage, users = [], authenticatedUser }) => {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    getUserMessage();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
        styles={{ marginTop: "50px" }}
      >
        <Tab value={0} label="Messages reçus" />
        <Tab value={1} label="Messages envoyés" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MessagesReceived authenticateduser={authenticatedUser} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MessagesSended />
      </TabPanel>
    </Box>
  );
};

const mapStateToProps = ({ users, auth }) => ({
  users: users.users,
  authenticatedUser: auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserMessage: () => dispatch(actions.getUserMessage()),
  };
};

Messages.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
