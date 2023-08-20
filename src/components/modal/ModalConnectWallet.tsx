import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import Button from "components/button/button";
import { ReactNode, useCallback } from "react";
import { styled } from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "helpers/connectors";

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
};

export interface PropsConfirmation {
  open: boolean;
  title?: string;
  content?: string | ReactNode;
  onClose: () => void;
}

const ModalConnectWallet = ({
  open,
  onClose,
  content,
  title,
}: PropsConfirmation) => {
  const { activate } = useWeb3React();
  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
  };

  const handleConnect = useCallback(() => {
    activate(connectors.injected);
    setProvider("injected");
    onClose();
  }, [activate, onClose]);

  return (
    <div>
      <Styled.BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Styled.Content dividers>
          <div onClick={handleConnect}>Metamask</div>
        </Styled.Content>
      </Styled.BootstrapDialog>
    </div>
  );
};

export default ModalConnectWallet;
