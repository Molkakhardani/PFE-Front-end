import { useState, useEffect } from "react";
import Head from "next/head";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import MyDocuments from "../../components/documents/my-documents";
import AllDocuments from "../../components/documents/all-documents";

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

const Documents = ({ loadUsers, users = [] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log({ MyDocuments, AllDocuments });
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
        <Tab value={0} label="Documents partagés" />
        <Tab value={1} label="Mes documents" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AllDocuments />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyDocuments />
      </TabPanel>
    </Box>
  );
};

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: () => dispatch(actions.loadUsers()),
  };
};

Documents.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
