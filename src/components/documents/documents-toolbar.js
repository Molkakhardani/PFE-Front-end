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
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";

export const DocumentsToolbar = (props) => (
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
        {props.title}
      </Typography>
      {props.withButton && (
        <Box sx={{ m: 1 }}>
          <NextLink href="/documents/new-document" passHref>
            <Button color="primary" variant="contained">
              Partager un nouveau document
            </Button>
          </NextLink>
        </Box>
      )}
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="chercher un document"
              variant="outlined"
              onChange={(e) => props?.onSearchHandler(e.target.value)}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
