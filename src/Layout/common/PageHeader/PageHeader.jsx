import React from 'react';
import PageControls from '../PageControls/PageControls';
import styles from './pageheader.module.css';
import classNames from 'classnames';
import FilterPopup from './FilterPopup/FilterPopup';
import { useState } from 'react';

export default function PageHeader(props) {

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    isOpenFilter ? setIsOpenFilter(false) : setIsOpenFilter(true);
  }

  return (
    <div className={classNames('flex', styles.headerWithFilter)}>
      <div className={classNames('flex', styles.pageHeader)}>
        <h1 className={classNames(styles.pageTitle)}>
          {props.title}
        </h1>
        <PageControls
          accessDelete={props.accessDelete}
          access={props.access}
          isApprovedInvoiceForPayment={props.isApprovedInvoiceForPayment}
          approved={props.approved}
          addBtnText={props.addBtnText}
          handleClickAdd={props.handleClickAdd}
          detail={props.detail}
          onDelete={props.onDelete}
          withoutCash={props.withoutCash}
          withInvoices={props.withInvoices}

          openFilter={handleOpenFilter}

          paymentSearch={props.paymentSearch}
          invoiceSearch={props.invoiceSearch}
          cashSearch={props.cashSearch}
          usersSearch={props.usersSearch}
          projectSearch={props.projectSearch}
          searchPlaceholder={props.searchPlaceholder}
        />
      </div>
      {
        isOpenFilter &&
        <div className={classNames(styles.pageFilter)}>
          <FilterPopup
            paymentFilter={props.paymentFilter}
            invoicesFilter={props.invoicesFilter}
            projectsFilter={props.projectsFilter}
            usersFilter={props.usersFilter}
          />
        </div>
      }
    </div>
  );
}
