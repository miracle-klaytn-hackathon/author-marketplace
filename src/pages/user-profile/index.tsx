import Grid from "@mui/material/Grid";
import React from "react";
import styled from "styled-components";
import Title from "./Title";
import ProfileCard from "./ProfileCard";
import { PROFILE } from "constants/common";
import Collection from "./Collection";

const Styled = {
  Container: styled.div`
    .avatar {
      width: 100px;
      height: 100px;
      background: gray;
      border-radius: 50%;
    }
    .line-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: solid;
      padding-bottom: 10px;
      .name {
        min-width: 200px;
        font-weight: bold;
      }
    }
  `,
};

const mockApi = [
  {
    bookName: "test",
    bookImg: "https://enftx.vercel.app/images/items/2.jpg",
    bookAuthor: {
      name: "long",
      avatar: "https://enftx.vercel.app/images/avatar/2.jpg",
    },
  },
  {
    bookName: "test",
    bookImg: "https://enftx.vercel.app/images/items/2.jpg",
    bookAuthor: {
      name: "long",
      avatar: "https://enftx.vercel.app/images/avatar/2.jpg",
    },
  },
  {
    bookName: "test",
    bookImg: "https://enftx.vercel.app/images/items/2.jpg",
    bookAuthor: {
      name: "long",
      avatar: "https://enftx.vercel.app/images/avatar/2.jpg",
    },
  },
  {
    bookName: "test",
    bookImg: "https://enftx.vercel.app/images/items/2.jpg",
    bookAuthor: {
      name: "long",
      avatar: "https://enftx.vercel.app/images/avatar/2.jpg",
    },
  },
];

const UserProfile = () => {
  return (
    <Styled.Container>
      <h1>User Profile</h1>
      <Title />
      <Grid container>
        <ProfileCard
          avatarLink={PROFILE.SAMPLE_PROFILE_CARD_PROPS.avatarLink}
          walletAdress={PROFILE.SAMPLE_PROFILE_CARD_PROPS.walletAdress}
          userName={PROFILE.SAMPLE_PROFILE_CARD_PROPS.userName}
          email={PROFILE.SAMPLE_PROFILE_CARD_PROPS.email}
        />
        <Collection collectionList={mockApi} />
      </Grid>
    </Styled.Container>
  );
};

export default UserProfile;
