import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/material";
import Button from "components/button/button";
import { ReactNode } from "react";
import { styled } from "styled-components";

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
  onConfirmation: () => void;
  onClose: () => void;
}

const ModalConfirm = ({
  open,
  onClose,
  onConfirmation,
  content,
  title,
}: PropsConfirmation) => {
  return (
    <div>
      <Styled.BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Styled.Title sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title || "Confirmation"}
        </Styled.Title>

        <Styled.Content dividers>
          <Typography gutterBottom>
            {content ||
              "Your progress on this input will be lost. Do you want to proceed?"}
          </Typography>
        </Styled.Content>

        <Styled.GroupActions>
          <Styled.BtnCancel text="Cancel" white onClick={onClose} />
          <Styled.BtnConfirm text="OK" onClick={onConfirmation} />
        </Styled.GroupActions>
      </Styled.BootstrapDialog>
    </div>
  );
};

export default ModalConfirm;
