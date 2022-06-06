import { useState } from "react";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
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

export const MessageList = ({ messages, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableBody>
              {messages.map(({ id, subject, read, createdAt, sender }) => (
                <>
                  <TableRow
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    style={{
                      backgroundColor: read ? "#e9e9e9" : "white",
                    }}
                  >
                    <TableCell style={{ fontWeight: read ? "normal" : "bold", width: "20%" }}>
                      {sender}
                    </TableCell>
                    <TableCell style={{ fontWeight: read ? "normal" : "bold", width: "50%" }}>
                      {subject}
                    </TableCell>
                    <TableCell style={{ fontWeight: read ? "normal" : "bold", width: "20%" }}>
                      {format(new Date(createdAt), "dd/MM/yyyy")}
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
