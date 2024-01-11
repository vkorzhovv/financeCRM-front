import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../../../../redux/invoicesReducer";
import { selectInvoices } from "../../../../../redux/invoicesSelector";
import PaymentAddPopup from "./PaymentAddPopup";


export default function PaymentAddPopupContainer(props) {

  const dispatch = useDispatch()

  const invoicesList = useSelector(selectInvoices)

  useEffect(() => {
    !props.isStatic && dispatch(getInvoices())
  }, [dispatch, props.isStatic])

  return (
    !props.isStatic
      ?
      createPortal((
        <PaymentAddPopup
          payment={props.payment}
          invoicesList={invoicesList}
          handleClickClose={props.handleClickClose}
          submitText={props.submitText}
          popupHeader={props.popupHeader}
          close={props.close}
          detail={props.detail}
        />
      ), document.getElementById('modal_root'))
      :
      <PaymentAddPopup
        isStatic={props.isStatic}
        submitText={props.submitText}
        popupHeader={props.popupHeader}
      />
  )
}
