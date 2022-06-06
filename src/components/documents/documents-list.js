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

export const DocumentsList = ({ documents, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>titre</TableCell>
                <TableCell>propriétaire</TableCell>
                <TableCell>Téléchargement</TableCell>
                <TableCell>Date de partage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map(({ id, title, owner, createdAt, downloads }) => (
                <>
                  <TableRow
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{title}</TableCell>
                    <TableCell>{owner}</TableCell>
                    <TableCell>{downloads}</TableCell>
                    <TableCell>{format(new Date(createdAt), "dd/MM/yyyy")}</TableCell>
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
