import { useState } from "react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, authenticateduser, ...other } = props;
  const { firstName, lastName, email, imageUrl } = authenticateduser || {};

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            sx={{
              height: 50,
              width: 50,
              ml: 1,
            }}
            src={imageUrl}
            onClick={handleClick}
          />

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              Bienvenue &nbsp;
              <b>
                {lastName} {firstName}
              </b>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <EmailIcon fontSize="small" /> <p style={{ marginLeft: "10px" }}>{email}</p>
            </MenuItem>
            <NextLink href="/logout">
              <MenuItem onClick={handleClose}>
                <>
                  <LogoutIcon fontSize="small" />{" "}
                  <p style={{ marginLeft: "10px" }}>Se déconnecter</p>
                </>
              </MenuItem>
            </NextLink>
          </Menu>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};
