import { useState } from "react";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";

import moment from "moment";
import localization from "moment/locale/fr";
moment.locale("fr", localization);

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

const MessagesSendedList = ({ messages, user = {}, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sujet</TableCell>
                <TableCell>Destinateurs</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(({ _id, subject, timestamp, destinations }) => (
                <TableRow
                  key={_id}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  style={{
                    backgroundColor: "#e9e9e9",
                  }}
                >
                  <TableCell style={{ fontWeight: "normal", width: "40%" }}>{subject}</TableCell>
                  <TableCell style={{ fontWeight: "normal", width: "30%" }}>
                    {destinations.length}
                  </TableCell>
                  <TableCell style={{ fontWeight: "normal", width: "20%" }}>
                    {moment(timestamp).format("LLLL")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default MessagesSendedList;
