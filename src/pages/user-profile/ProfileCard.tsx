import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

interface ProfileCardProps {
  avatarLink: string;
  walletAdress: string;
  userName: string;
  email: string;
}

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <Card>
      <CardContent>
        <Avatar src={props.avatarLink} alt={`${props.userName} avatar`} />
        <Typography
          variant="h4"
          sx={{
            marginTop: "10px",
            fontSize: 18,
          }}
        >
          Welcome, {props.userName} ({props.email}) !
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.75 }} noWrap>
          Wallet address: {props.walletAdress}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
