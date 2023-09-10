import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { TStore, actions } from "store";
import { cloneDeep } from "lodash";
import { useParams } from "react-router-dom";
import { BookToken, getBookToken } from 'api/tokens/token';

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
  const [bookToken, setBookToken] = useState<BookToken>();
  const dispatch = useDispatch();
  const { cartList } = useSelector((state: TStore) => state.customer);
  const params = useParams();
  const isExist = cartList?.some(
    (item: any) => String(item.id) === String(params?.id)
  );

  useEffect(() => {
    const address = params?.id
    address && getBookToken(address).then(
      res => setBookToken(res.data)
    )
  }, [])

  const handleAddToCart = useCallback(() => {
    let currentList = cloneDeep(cartList) || [];
    if (isExist) {
      const newList = currentList?.filter(
        (item: any) => String(item.id) !== String(params?.id)
      );

      dispatch(actions.customer.actionCart(newList));
      return;
    }
    currentList.push({
      id: params?.id,
      name: bookToken?.name,
      symbol: bookToken?.symbol,
      owner: bookToken?.owner
    });

    dispatch(actions.customer.actionCart(currentList));
  }, [cartList, dispatch, isExist, params.id, bookToken]);

  return (
    <Style.Container>
      {bookToken && <Grid container spacing={1}>
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
            <h1 className="title">{bookToken.name}</h1>
            <div className="owner">
              Owned by <b>{bookToken.owner}</b>
            </div>
            <div className="wrap-description">
              <div className="symbol">
                <div className="sub-title">Symbol</div>
                <b>{bookToken.symbol}</b>
              </div>
              <div className="volume">
                <div className="sub-title">Total Volume</div>
                <b>100 ETH</b>
              </div>
            </div>
          </div>
          <Button
            text={isExist ? "Remove from cart" : "Add To Cart"}
            onClick={handleAddToCart}
          />
        </Grid>
      </Grid>}
    </Style.Container>
  )
}

export default MarketPlaceDetail;
