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
  Tooltip,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import PublicIcon from "@mui/icons-material/Public";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import moment from "moment";
import localization from "moment/locale/fr";
moment.locale("fr", localization);

export const DocumentsList = ({ documents, mydocument = false, deleteDocument, ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>titre</TableCell>
                {!mydocument && <TableCell>propriétaire</TableCell>}
                <TableCell>Destination</TableCell>
                <TableCell>Date de partage</TableCell>

                {mydocument && <TableCell></TableCell>}

                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map(
                ({
                  _id,
                  subject,
                  sender: { firstName, lastName },
                  timestamp,
                  isPublic,
                  destinations,
                  link,
                }) => (
                  <TableRow
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                    key={_id}
                  >
                    <TableCell>{subject}</TableCell>
                    {!mydocument && (
                      <TableCell>
                        {firstName} {lastName}
                      </TableCell>
                    )}

                    <TableCell>
                      {isPublic ? (
                        <Tooltip title="Public">
                          <PublicIcon />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Privé">
                          <PeopleAltIcon />
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>{moment(timestamp).format("LLLL")}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<CloudDownloadIcon />}
                        style={{ backgroundColor: "#38C962", color: "white" }}
                        href={link}
                      >
                        Télécharger
                      </Button>
                    </TableCell>
                    {mydocument && (
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          style={{ backgroundColor: "#CD5C5C", color: "white" }}
                          onClick={() => deleteDocument(_id)}
                        >
                          Supprimer
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};
