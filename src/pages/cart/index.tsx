import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { TStore } from "store";
import styled from "styled-components";

const Styled = {
  Container: styled.div`
    .avatar {
      width: 100px;
      height: 100px;
      background: gray;
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
      img {
        width: 200px;
      }
      .content {
        padding-left: 30px;
      }
    }
  `,
};

const CartPage = () => {
  const { cartList } = useSelector((state: TStore) => state.customer);

  return (
    <Styled.Container>
      <h1>Cart List</h1>
      <Grid container spacing={2}>
        {cartList?.map((item: any) => (
          <Grid item xs={12} key={item.id}>
            <div className="line-info">
              <img
                src="https://i.seadn.io/gcs/files/c2b0ac6e3709bf736aaa1a8d5ae04546.png?auto=format&dpr=1&h=500"
                alt=""
              />
              <div className="content">
                <div className="title">{item.name}</div>
                <div className="wrap-description">
                  <div className="floor">
                    <div className="sub-title">Floor</div>
                    <b>{item.price} ETH</b>
                  </div>
                  <div className="volume">
                    <div className="sub-title">Total Volume</div>
                    <b>100 ETH</b>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Styled.Container>
  );
};

export default CartPage;
