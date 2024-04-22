import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPaymentTypes } from "../../../../../redux/cashItemSelector";
import TypeAddPopup from "./TypeAddPopup";

export default function TypeAddPopupContainer(props) {

  const dispatch = useDispatch()
  const paymentsTypes = useSelector(selectPaymentTypes);

  return (
    <TypeAddPopup
      paymentsTypes={paymentsTypes}
      isStatic={props.isStatic}
    />
  )
}
