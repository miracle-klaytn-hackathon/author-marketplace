import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";

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

const UserProfile = () => {
  return (
    <Styled.Container>
      <h1>User Profile</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="line-info">
            <div className="name">
              <div className="avatar" />
            </div>
            <div className="value">Name user</div>
          </div>
          <div className="line-info">
            <div className="name">Email</div>
            <div className="value">hehe@gmail.com</div>
          </div>
          <div className="line-info">
            <div className="name">Phone</div>
            <div className="value">1235</div>
          </div>
        </Grid>
      </Grid>
    </Styled.Container>
  );
};

export default UserProfile;
