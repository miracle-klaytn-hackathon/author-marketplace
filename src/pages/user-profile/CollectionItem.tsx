import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import styles from "./Profile.module.scss";

export interface CollectionItemProps {
  bookName: string;
  bookImg: string;
  bookAuthor: {
    name: string;
    avatar: string;
  };
}
const CollectionItem = (props: CollectionItemProps) => {
  return (
    <Card
      raised
      sx={{
        position: "relative",
        padding: "16px 16px 0 16px",
        borderRadius: "16px",
      }}
    >
      <CardMedia
        component="img"
        image={props.bookImg}
        alt={props.bookName}
        sx={{ borderRadius: "16px" }}
      />
      <CardContent sx={{ paddingX: 0, paddingBottom: "16px !important" }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.bookName}
        </Typography>
        <Tooltip
          title={props.bookAuthor.name}
          className={styles.customTooltip}
        >
          <Avatar
            src={props.bookAuthor.avatar}
            alt={`${props.bookAuthor.name} avatar`}
          />
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default CollectionItem;
