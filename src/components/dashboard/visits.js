import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TourIcon from "@mui/icons-material/Tour";

export const Visits = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            VISITS
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {props.numberofvisits}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <TourIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
