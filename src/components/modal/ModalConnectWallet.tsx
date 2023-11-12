import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Button from "components/button/button";
import { ReactNode, useCallback } from "react";
import { styled } from "styled-components";
import { BrowserProvider } from "ethers";
import { useWeb3 } from "../../web3/useWeb3";

import metamaskLogo from "../../assets/images/mm.png";
import etherLogo from "assets/images/EtheriumIcon.svg";

const Styled = {
  BootstrapDialog: styled(Dialog)`
    & .muidialogcontent-root {
      padding: 0px;
    }

    & .muidialogactions-root {
      padding: 0px;
    }
  `,

  Title: styled(DialogTitle)`
    color: ${({ theme }) => theme.colors.primary};
  `,

  Content: styled(DialogContent)`
    min-height: 100px;
  `,

  GroupActions: styled(DialogActions)``,

  BtnCancel: styled(Button)`
    padding: 8px 12px;
    min-width: 85px;
  `,

  BtnConfirm: styled(Button)`
    padding: 8px 12px;
    min-width: 85px;
  `,

  BtnLogo: styled.img`
    height: 50px;
    width: 50px;
  `,
};

export interface PropsConfirmation {
  open: boolean;
  title?: string;
  content?: string | ReactNode;
  onClose: () => void;
}

const provider = new BrowserProvider(window.ethereum);

const ModalConnectWallet = ({
  open,
  onClose,
  content,
  title,
}: PropsConfirmation) => {
  const { connectWallet } = useWeb3();

  const handleConnect = useCallback(() => {
    connectWallet();
    onClose();
  }, [connectWallet, onClose]);

  const connectEtherWallet = async () => {
    await provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
    onClose();
  };

  return (
    <div>
      <Styled.BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Styled.Content dividers>
          <div>
            <Styled.BtnConfirm
              onClick={handleConnect}
              text={"Metamask"}
              icon={<Styled.BtnLogo src={metamaskLogo} alt="metamask-logo" />}
            />
          </div>
          <div>
            <Styled.BtnConfirm
              onClick={connectEtherWallet}
              className="bases__width100 bases__margin--top12"
              text={"Etherium"}
              icon={<Styled.BtnLogo src={etherLogo} alt="etherium-logo" />}
            />
          </div>
        </Styled.Content>
      </Styled.BootstrapDialog>
    </div>
  );
};

export default ModalConnectWallet;
