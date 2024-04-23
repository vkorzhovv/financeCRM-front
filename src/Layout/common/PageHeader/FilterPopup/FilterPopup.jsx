import classNames from "classnames";
import React from "react";
import CashFilter from "./CashFilter/CashFilter";
import InvoicesFilter from "./InvoicesFilter/InvoicesFilter";
import PaymentFilter from "./PaymentFilter/PaymentFilter";
import ProjectsFilter from "./ProjectsFilter/ProjectsFilter";
import PublicationFilter from "./PublicationFilter/PublicationFilter";
import UsersFilter from "./UsersFilter/UsersFilter";

export default function FilterPopup(props) {
  return (
    <div className={classNames('flex')}>
      {props.usersFilter && <UsersFilter />}
      {props.projectsFilter && <ProjectsFilter />}
      {props.invoicesFilter && <InvoicesFilter />}
      {props.paymentFilter && <PaymentFilter />}
      {props.publicationFilter && <PublicationFilter />}
    </div>
  )
}
