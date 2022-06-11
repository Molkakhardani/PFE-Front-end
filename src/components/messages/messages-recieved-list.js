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

const MessagesRecievedList = ({ messages, user = {}, openMessage, ...rest }) => {
  const onOpenMessage = (id) => {
    console.log("tototo");
    openMessage(id);
  };
  const isReadMessageHandler = (destinations) =>
    destinations.find(({ receiver }) => receiver === user.email)?.read || false;

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableBody>
              {messages.map(({ _id, subject, read = true, timestamp, destinations, sender }) => {
                const isReadMessage = isReadMessageHandler(destinations);
                return (
                  <Link key={_id} href={`/messages/${_id}`}>
                    <TableRow
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                      style={{
                        backgroundColor: isReadMessage ? "#e9e9e9" : "white",
                      }}
                      onClick={() => onOpenMessage(_id)}
                    >
                      <TableCell style={{ width: "5%" }}>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Avatar src={user.imageUrl} sx={{ mr: 1 }} />
                        </Box>
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: isReadMessage ? "normal" : "bold", width: "15%" }}
                      >
                        {sender.lastName} {sender.firstName}
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: isReadMessage ? "normal" : "bold", width: "50%" }}
                      >
                        {subject}
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: isReadMessage ? "normal" : "bold", width: "20%" }}
                      >
                        {moment(timestamp).format("LLLL")}
                      </TableCell>
                    </TableRow>
                  </Link>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default MessagesRecievedList;
