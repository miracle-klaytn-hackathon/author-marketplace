import { Grid } from "@mui/material";
import React from "react";
import { styled } from "styled-components";

const Style = {
  WrapImg: styled.div`
    border-radius: 10px;
    border: 1px solid rgba(18, 18, 18, 0.12);
    padding: 10px 0px;
    img {
      width: 100%;
      object-fit: cover;
    }
  `,
  Container: styled.div`
    .wrap-description {
      margin-top: 10px;
      margin-bottom: 10px;
      border: 1px solid rgba(18, 18, 18, 0.12);
      border-radius: 10px;
      padding: 10px;
    }
  `,
};

const MarketPlaceDetail = () => {
  return (
    <Style.Container>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Style.WrapImg>
            <img
              src="https://i.seadn.io/gcs/files/c2b0ac6e3709bf736aaa1a8d5ae04546.png?auto=format&dpr=1&h=500"
              alt=""
            />
          </Style.WrapImg>
        </Grid>
        <Grid item xs={6}>
          <div className="content">
            <h1 className="title">Wreck League Majestics</h1>
            <div className="owner">
              Owned by <b>luan</b>
            </div>
            <div className="wrap-description">
              <div className="floor">
                <div className="sub-title">Best offer</div>
                <b>0.14 ETH</b>
              </div>
              <div className="volume">
                <div className="sub-title">Total Volume</div>
                <b>100 ETH</b>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Style.Container>
  );
};

export default MarketPlaceDetail;
