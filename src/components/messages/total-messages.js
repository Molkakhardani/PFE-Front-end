import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

export const TotalMessages = (props) => {
  const { title = "", received = false, count } = props;
  return (
    <Card {...props} style={{ marginBottom: "40px" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: received ? "success.main" : "warning.main",
                height: 56,
                width: 56,
              }}
            >
              {received ? <EmailIcon /> : <ForwardToInboxIcon />}
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
