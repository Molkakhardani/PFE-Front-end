import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const DashboardLayout = ({ children, authenticatedUser }) => {
  console.log({ authenticatedUser });
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        onSidebarOpen={() => setSidebarOpen(true)}
        authenticateduser={authenticatedUser}
      />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        account={+authenticatedUser.account}
      />
    </>
  );
};

const mapStateToProps = ({ auth = {} }) => {
  return {
    authenticatedUser: auth.user,
  };
};

export default connect(mapStateToProps)(DashboardLayout);
