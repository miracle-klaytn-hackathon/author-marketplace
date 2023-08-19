import Button from "components/button/button";
import styled from "styled-components";

const Styled = {
  Container: styled.div`
    font-size: 20px;
    margin-bottom: 20px;
    .title {
      color: #59a52c;
    }
  `,
  WarningBadgeHeader: styled.div`
    border-left: solid 1px #d1a95d;
    background: rgb(209, 169, 93, 0.1);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    color: #666666;
    margin-top: 25px;
    font-size: 14px;
    width: 100%;
    margin-bottom: 20px;
    .icon {
      margin-right: 12px;
    }
  `,
  FieldInput: styled.div`
    margin-bottom: 40px;
  `,
  WrapCategory: styled.div`
    margin-top: 20px;
    padding: 20px;
    border: solid 1px #e5e5e5;
  `,
  WrapGeneralInfo: styled.div`
    display: flex;
    align-items: center;
    .line-info {
      display: flex;
      align-items: center;
      .value {
        margin-left: 6px;
        color: #666666;
      }
    }
    .separate {
      margin: 0px 12px;
    }
  `,

  WrapHeader: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
  `,
  WarningBadge: styled.div`
    border-left: solid 1px #d1a95d;
    background: rgb(209, 169, 93, 0.1);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    color: #666666;
    margin-top: 25px;
    margin-left: 20px;
    font-size: 14px;
    width: 100%;
    .icon {
      margin-right: 12px;
    }
  `,
  WrapInputType: styled.div`
    margin-top: 20px;
    padding: 20px;
    border: solid 1px #e5e5e5;
  `,
  WrapRecords: styled.div`
    margin-top: 20px;
    padding: 20px 0px;

    .wrap-consumption {
      width: 100%;
      .no {
        margin-right: 28px;
        color: #666666;
        font-size: 16px;
        min-width: 20px;
      }
      display: flex;
      align-items: center;
      .custom-textfield {
        width: 100%;
        margin-top: 5px;

        @media (max-width: 925px) {
          max-width: 180px;
        }
        @media (max-width: 768px) {
          max-width: 140px;
        }
      }
    }
  `,

  WrapButtonUpload: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 280px;

    /* margin-top: 23px; */
    .icon {
      min-width: 20px;
      cursor: pointer;
    }
  `,
  WrapUpload: styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 1535px) {
      padding-left: 66px;
    }
    @media (max-width: 830px) {
      flex-direction: column;
    }
    .custom-textfield {
      width: 100%;
      margin-top: -1px;
      @media (max-width: 2000px) {
        max-width: 530px;
      }
      @media (max-width: 830px) {
        margin-bottom: 20px;
      }
    }
  `,
  ButtonUpload: styled(Button)`
    /* border: solid 1px #59a52c;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 20px;
    color: #59a52c;
    background: #ffff; */
    margin-left: 28px;
    min-width: 165px;
    margin-right: 24px;
    @media (max-width: 1300px) {
      margin-left: 10px;
      margin-right: 10px;
    }
    .requited {
      color: #b41c1c;
    }
  `,
  AddCategory: styled.div`
    color: #59a52c;
    display: flex;
    align-items: center;
    margin-top: 40px;
    text-decoration: underline;
    cursor: pointer;
    .icon {
      margin-right: 8px;
    }
  `,
  WrapTrash: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .icon-trash {
      cursor: pointer;
      margin: 0px 8px;
    }
  `,
  WrapButtons: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 40px;
    .discard {
      border: none;
      color: #6b6b6b;
    }
    .saveBtn {
      margin: 0px 24px;
    }
    .btnUpdate {
      margin-left: 24px;
    }
  `,
  WrapSelectMain: styled.div`
    max-width: 520px;
  `,
};

export default Styled;
