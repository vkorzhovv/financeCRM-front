import React from "react";
import ProjectAddPopup from "./ProjectAddPopup";

export default function ProjectAddPopupContainer(props) {

  return (
    <ProjectAddPopup
      submitText={props.submitText}
      handleClickClose={props.handleClickClose}
      popupHeader={props.popupHeader}
      close={props.close}
      detail={props.detail}
      project={props.project}
    />
  )
}




