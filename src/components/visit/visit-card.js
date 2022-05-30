import { format } from "date-fns";
import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Clock as ClockIcon } from "../../icons/clock";
import { Download as DownloadIcon } from "../../icons/download";
import { SeverityPill } from "../severity-pill";

const visitMapping = [
  {
    code: 2,
    color: "warning",
    wording: "plannifiée",
  },
  {
    code: 1,
    color: "success",
    wording: "en cours",
  },
  {
    code: 0,
    color: "info",
    wording: "cloturée",
  },
];

const VisitStatus = (code) => {
  const { color, wording } = visitMapping.find((visit) => visit.code === code) || {};
  return <SeverityPill color={color}>{wording}</SeverityPill>;
};

const formatDateHandler = (date) => {
  return date ? format(new Date(date), "dd/MM/yyyy") : "";
};

export const VisitCard = ({ visit, ...rest }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      "&:hover": {
        cursor: "pointer",
      },
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Avatar
          alt="Visit"
          src="/static/images/avatars/tour-guide.png"
          variant="square"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h5">
        {visit.title}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {visit.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <ClockIcon color="action" />
          <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
            {formatDateHandler(visit?.date)}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          {VisitStatus(visit.status)}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          ></Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

VisitCard.propTypes = {
  visit: PropTypes.object.isRequired,
};
