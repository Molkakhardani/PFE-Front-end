import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";

export const ProductListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Les Visites
      </Typography>
      {props.isadmin && (
        <NextLink href="/new-visit" passHref>
          <Box sx={{ m: 1 }}>
            <Button color="primary" variant="contained">
              Ajouter une visite
            </Button>
          </Box>
        </NextLink>
      )}
    </Box>
  </Box>
);
