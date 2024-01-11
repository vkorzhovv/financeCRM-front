import React from "react";
import { createPortal } from "react-dom";
import CashAddPopup from "./CashAddPopup";

export default function CashAddPopupContainer(props) {

  return (
    !props.isStatic
      ?
      createPortal((
        <CashAddPopup
          id={props.id}
          name={props.name}
          type={props.type}
          submitText={props.submitText}
          popupHeader={props.popupHeader}
          handleClickClose={props.handleClickClose}
          close={props.close}
          detail={props.detail}
        />
      ), document.getElementById('modal_root'))
      :
      <CashAddPopup
        isStatic={props.isStatic}
        submitText={props.submitText}
        popupHeader={props.popupHeader}
      />
  )
}
