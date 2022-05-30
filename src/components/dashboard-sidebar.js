import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import MessageIcon from "@mui/icons-material/Message";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
const role = "admin";

const filterItemsHandler = (itemsList, role) => {
  return itemsList.filter((item) => item.allowed.includes(role));
};

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
    allowed: ["admin"],
  },
  {
    href: "/new-account",
    icon: <UserAddIcon fontSize="small" />,
    title: "Création de compte",
    allowed: ["admin"],
  },
  {
    href: "/users",
    icon: <UsersIcon fontSize="small" />,
    title: "Utilisateurs",
    allowed: ["admin", "user"],
  },
  {
    href: "/visits",
    icon: <VisibilityIcon fontSize="small" />,
    title: "Visites",
    allowed: ["admin", "user"],
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: " Mon compte",
    allowed: ["admin", "user"],
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Parametre",
    allowed: ["admin", "user"],
  },
  {
    href: "/login",
    icon: <LockIcon fontSize="small" />,
    title: "Login",
    allowed: ["admin", "user"],
  },
  {
    href: "/message",
    icon: <MessageIcon fontSize="small" />,
    title: "Messages",
    allowed: ["admin", "user"],
  },
  {
    href: "/partage",
    icon: <UploadFileIcon fontSize="small" />,
    title: "Documents",
    allowed: ["admin", "user"],
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {filterItemsHandler(items, role).map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};