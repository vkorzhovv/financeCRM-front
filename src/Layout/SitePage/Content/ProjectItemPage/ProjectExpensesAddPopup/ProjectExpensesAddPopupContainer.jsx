import React from "react";
import ProjectExpensesAddPopup from "./ProjectExpensesAddPopup";

export default function ProjectExpensesAddPopupContainer(props) {

  return (
    <ProjectExpensesAddPopup
      handleClickClose={props.handleClickClose}
      projectId={props.projectId}
      expense={props.expense}

      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
    />
  )
};
