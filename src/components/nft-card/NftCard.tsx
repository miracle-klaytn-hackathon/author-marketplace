import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import { styled } from "styled-components";

const Style = {
  Container: styled.div`
    padding: 0px 5px;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
    margin-top: 8px;
    transition: box-shadow 0.25s ease-in-out 0s, transform 0.25s ease 0s;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
    .content {
      padding: 16px;
      .title {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 16px;
      }
      .wrap-description {
        display: flex;
        justify-content: space-between;
      }
      .sub-title {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }
  `,
};
const NftCard = ({ cardInfo }: any) => {
  const navigate = useNavigate();
  return (
    <div>
      <Style.Container
        onClick={() => navigate(`${ROUTES.marketplace}/${cardInfo.id}`)}
      >
        <img
          src="https://i.seadn.io/gcs/files/c2b0ac6e3709bf736aaa1a8d5ae04546.png?auto=format&dpr=1&h=500"
          alt=""
        />
        <div className="content">
          <div className="title">{cardInfo.name}</div>
          <div className="wrap-description">
            <div className="floor">
              <div className="sub-title">Floor</div>
              <b>{cardInfo.price} ETH</b>
            </div>
            <div className="volume">
              <div className="sub-title">Total Volume</div>
              <b>100 ETH</b>
            </div>
          </div>
        </div>
      </Style.Container>
    </div>
  );
};

export default NftCard;
