import classNames from "classnames";
import React from "react";
import InvoicesFilter from "./InvoicesFilter/InvoicesFilter";
import PaymentFilter from "./PaymentFilter/PaymentFilter";
import ProjectsFilter from "./ProjectsFilter/ProjectsFilter";
import UsersFilter from "./UsersFilter/UsersFilter";

export default function FilterPopup(props) {
  return (
    <div className={classNames('flex')}>
      {props.usersFilter && <UsersFilter />}
      {props.projectsFilter && <ProjectsFilter />}
      {props.invoicesFilter && <InvoicesFilter />}
      {props.paymentFilter && <PaymentFilter />}
    </div>
  )
}
