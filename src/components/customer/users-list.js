import { useState } from "react";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import { getInitials } from "../../utils/get-initials";

export const UsersList = ({ users, isAdmin, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Télephone</TableCell>
                {isAdmin && (
                  <>
                    <TableCell>Date de création</TableCell>
                    <TableCell>Status</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(
                ({ _id, lastName, firstName, email, imageUrl, phoneNumber, date, active }) => (
                  <Link key={_id} href={isAdmin ? `/user/${_id}` : ""}>
                    <TableRow
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Avatar src={imageUrl} sx={{ mr: 2 }}>
                            {getInitials(lastName)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {lastName} {firstName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phoneNumber}</TableCell>
                      {isAdmin && (
                        <>
                          <TableCell>{format(new Date(date), "dd/MM/yyyy")}</TableCell>
                          <TableCell>
                            <SeverityPill color={active ? "success" : "error"}>
                              {active ? "Activé" : "Bloqué"}
                            </SeverityPill>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  </Link>
                )
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};
