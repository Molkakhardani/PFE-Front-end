import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import PendingIcon from "@mui/icons-material/PauseCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

export const UsersStats = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [7, 2],
        backgroundColor: ["#38C962", "#E53935"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Comptes activés", "Comptes bloqués"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Comptes activés",
      value: 7,
      icon: CheckIcon,
      color: "#38C962",
    },
    
    {
      title: "Comptes bloqués",
      value: 2,
      icon: BlockIcon,
      color: "#E53935",
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Statistiques des utilisateurs" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
