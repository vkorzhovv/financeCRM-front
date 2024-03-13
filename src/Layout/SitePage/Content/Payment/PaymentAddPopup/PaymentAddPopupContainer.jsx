import React from "react";
import { createPortal } from "react-dom";
import PaymentAddPopup from "./PaymentAddPopup";

export default function PaymentAddPopupContainer(props) {

  return (
    !props.isStatic
      ?
      createPortal((
        <PaymentAddPopup
          isStatic={props.isStatic}
          invoicesPage={props.invoicesPage}
          invoice={props.invoice}
          payment={props.payment}
          handleClickClose={props.handleClickClose}
          submitText={props.submitText}
          popupHeader={props.popupHeader}
          close={props.close}
          detail={props.detail}
        />
      ), document.getElementById('modal_root'))
      :
      <PaymentAddPopup
        invoicePage={props.invoicePage}
        invoice={props.invoice}
        isStatic={props.isStatic}
        submitText={props.submitText}
        popupHeader={props.popupHeader}
        remainder={props.remainder}
      />
  )
}
