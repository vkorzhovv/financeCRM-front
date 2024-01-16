import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUnapprovedInvoices } from "../../../../../redux/invoicesReducer";
import { selectUnapprovedInvoices } from "../../../../../redux/invoicesSelector";
import PaymentAddPopup from "./PaymentAddPopup";


export default function PaymentAddPopupContainer(props) {

  const dispatch = useDispatch()

  const invoicesList = useSelector(selectUnapprovedInvoices)

  useEffect(() => {
    !props.isStatic && dispatch(getUnapprovedInvoices())
  }, [dispatch, props.isStatic])


  return (
    !props.isStatic
      ?
      createPortal((
        <PaymentAddPopup
          invoicesPage={props.invoicesPage}
          invoice={props.invoice}
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
        invoicePage={props.invoicePage}
        invoice={props.invoice}
        isStatic={props.isStatic}
        submitText={props.submitText}
        popupHeader={props.popupHeader}
      />
  )
}
