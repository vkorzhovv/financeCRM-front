import React from "react";
import InvoicesAddPopup from "./InvoicesAddPopup";

export default function InvoicesAddPopupContainer(props) {

  return (
    <InvoicesAddPopup
      projectExpense={props.projectExpense}
      projectReceipt={props.projectReceipt}
      projectClient={props.projectClient}

      projectId={props.projectId}
      remainder={props.remainder}
      invoice={props.invoice}

      handleClickClose={props.handleClickClose}
      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
      close={props.close}
    />
  )
};
