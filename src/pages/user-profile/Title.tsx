import React from "react";
import Box from "@mui/system/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ROUTES from "routes/constant";


const Title = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      marginBottom="30px"
    >
      <Box width="50%" maxWidth="100%" flex="0 0 auto">
        <Typography
          variant="h3"
          fontWeight={600}
          fontSize={24}
          lineHeight={1.6}
        >
          Profile
        </Typography>
        <Typography
          marginBottom={1}
          variant="body1"
          fontSize={14}
          color="#7e7e7e"
        >
          Welcome ENFTX Profile page
        </Typography>
      </Box>
      <Box width="auto" maxWidth="100%" flex="0 0 auto">
        <Link
          href={ROUTES.home}
          color="#7184ad"
          fontSize={14}
          display="inline-block"
          underline="none"
        >
          Home
        </Link>
        <NavigateNextIcon
          fontSize="small"
          sx={{
            margin: "0 10px",
            position: "relative",
            top: 5,
          }}
        />
        <Link
          href={ROUTES.userProfile}
          color="#7184ad"
          fontSize={14}
          display="inline-block"
          underline="none"
        >
          Profile
        </Link>
      </Box>
    </Grid>
  );
};

export default Title;
