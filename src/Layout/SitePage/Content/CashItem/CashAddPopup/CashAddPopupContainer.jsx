import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectPaymentTypes } from "../../../../../redux/cashItemSelector";
import CashAddPopup from "./CashAddPopup";

export default function CashAddPopupContainer(props) {

  const dispatch = useDispatch()
  const paymentsTypes = useSelector(selectPaymentTypes);

  useEffect(() => {
    dispatch(getPaymentTypes())
  }, [dispatch])

  return (
    !props.isStatic
      ?
      createPortal((
        <CashAddPopup
          id={props.id}
          name={props.name}
          type={props.type}
          paymentsTypes={paymentsTypes}
          submitText={props.submitText}
          popupHeader={props.popupHeader}
          handleClickClose={props.handleClickClose}
          close={props.close}
          detail={props.detail}
        />
      ), document.getElementById('modal_root'))
      :
      <CashAddPopup
        paymentsTypes={paymentsTypes}
        isStatic={props.isStatic}
        submitText={props.submitText}
        popupHeader={props.popupHeader}
      />
  )
}
