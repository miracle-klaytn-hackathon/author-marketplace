import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CollectionItem, { CollectionItemProps } from "./CollectionItem";
import styles from "./Profile.module.scss";

interface CollectionProps {
  collectionList: CollectionItemProps[];
}
const Collection = (props: CollectionProps) => {
  const renderCollectionItems = props.collectionList.map((el, index) => (
    <Grid item md={2} lg={1} key={index}>
      <CollectionItem
        bookName={el.bookName}
        bookImg={el.bookImg}
        bookAuthor={{
          name: el.bookAuthor.name,
          avatar: el.bookAuthor.avatar,
        }}
      />
    </Grid>
  ));

  return (
    <Grid container flexDirection="column" className={styles.collection}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: 18,
          lineHeight: 1.6,
          color: "#212529",
          padding: "30px 0 20px",
        }}
      >
        My Collection
      </Typography>
      <Grid container spacing={4} columns={{ md: 4, lg: 4 }}>
        {renderCollectionItems}
      </Grid>
    </Grid>
  );
};

export default Collection;
