import { Grid } from "@mui/material"
import { useWeb3React } from '@web3-react/core'
import { getBookTokenABI } from 'api/tokens/token'
import Button from 'components/button/button'
import { ethers } from 'ethers'
import { connectors } from 'helpers/connectors'
import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { TStore } from "store"
import styled from "styled-components"

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
}

const CartPage = () => {
  const [bookAbi, setBookAbi] = useState<string>("");
  const { cartList } = useSelector((state: TStore) => state.customer)
  const { activate, active, library, account } = useWeb3React();

  useEffect(() => {
    getBookTokenABI().then(
      res => setBookAbi(res.data)
    )
  }, [])

  const handleCheckout = useCallback(() => {
    activate(connectors.injected)
      .then(_ => library && cartList.map(
        (item: any) => new ethers.Contract(item.id, bookAbi, library.getSigner(account))
      ))
      .then(contracts => contracts.map((con: any) => con.safeMint(account, "https://i.seadn.io/gcs/files/c2b0ac6e3709bf736aaa1a8d5ae04546.png?auto=format&dpr=1&h=500")))
  }, [active]);

  return (
    <Styled.Container>
      <h1>Cart List</h1>
      <Grid container spacing={2}>
        {cartList?.map((token: any) => (
          <Grid item xs={12} key={token.id}>
            <div className="line-info">
              <img
                src="https://i.seadn.io/gcs/files/c2b0ac6e3709bf736aaa1a8d5ae04546.png?auto=format&dpr=1&h=500"
                alt=""
              />
              <div className="content">
                <div className="title">{token.name}</div>
                <div className="wrap-description">
                  <div className="symbol">
                    <div className="sub-title">Symbol</div>
                    <b>{token.symbol}</b>
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
      <Button
        text={"Checkout"}
        onClick={handleCheckout}
      />
    </Styled.Container>
  )
}

export default CartPage
