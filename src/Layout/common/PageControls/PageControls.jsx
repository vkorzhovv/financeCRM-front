import React, { useState } from 'react';
import styles from './pagecontrols.module.css';
import classNames from 'classnames';
import SettingsIcon from '../../../svgIcons/settings';
import SearchIcon from '../../../svgIcons/search';
import { useDispatch, useSelector } from 'react-redux';
import { getDebInvoices, getInvoices, getUnpaidInvoices, getUserDebInvoices, getUserInvoices, getUserUnpaidInvoices } from '../../../redux/invoicesReducer';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { selectMe } from '../../../redux/authSelectors';
import SearchBlock from '../PageHeader/SearchBlock/SearchBlock';
import CheckIcon from '../../../svgIcons/check';
import { useEffect } from 'react';

export default function PageControls(props) {

  const me = useSelector(selectMe);

  const [isVisible, setIsVisible] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleClick = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  const handleClickOpenDelete = () => {
    setIsOpenDelete(true)
    document.body.classList.add('modal-show');
  }

  const handleClickCloseDelete = () => {
    setIsOpenDelete(false)
    document.body.classList.remove('modal-show');
  }

  const dispatch = useDispatch()
  const handleDebInvoices = () => {
    me.user_type === 's' ? dispatch(getDebInvoices()) : dispatch(getUserDebInvoices(me.id))
  }
  const handleUnpaidInvoices = () => {
    me.user_type === 's' ? dispatch(getUnpaidInvoices()) : dispatch(getUserUnpaidInvoices(me.id))
  }
  const handleAllInvoices = () => {
    me.user_type === 's' ? dispatch(getInvoices()) : dispatch(getUserInvoices(me.id))
  }

  const userFilterActive =
    props.usersFilter && Boolean(sessionStorage.getItem('userBalanceStart')) &&
    (
      sessionStorage.getItem('userBalanceStart') != '-Infinity' ||
      sessionStorage.getItem('userBalanceEnd') != 'Infinity'
    );
  const projectFilterActive =
    props.projectsFilter && Boolean(sessionStorage.getItem('projectBalanceMax')) &&
    (
      sessionStorage.getItem('projectManager') != '' ||
      sessionStorage.getItem('projectForeman') != '' ||
      sessionStorage.getItem('projectClient') != '' ||
      sessionStorage.getItem('projectStartDate') != '' ||
      sessionStorage.getItem('projectEndDate') != '' ||
      sessionStorage.getItem('projectSummMin') != '0' ||
      sessionStorage.getItem('projectSummMax') != 'Infinity' ||
      sessionStorage.getItem('projectBalanceMin') != '-Infinity' ||
      sessionStorage.getItem('projectBalanceMax') != 'Infinity' ||
      sessionStorage.getItem('projectExpensesMin') != '-Infinity' ||
      sessionStorage.getItem('projectExpensesMax') != 'Infinity' ||
      sessionStorage.getItem('projectStatus') != ''
    );
  const invoiceFilterActive =
    props.invoicesFilter && Boolean(sessionStorage.getItem('invoiceSummMax')) &&
    (
      sessionStorage.getItem('invoiceProject') != '' ||
      sessionStorage.getItem('invoicePayer') != '' ||
      sessionStorage.getItem('invoiceReceiver') != '' ||
      sessionStorage.getItem('invoiceFromDate') != '' ||
      sessionStorage.getItem('invoiceToDate') != '' ||
      sessionStorage.getItem('invoiceSummMin') != '0' ||
      sessionStorage.getItem('invoiceSummMax') != 'Infinity' ||
      sessionStorage.getItem('invoiceType') != '' ||
      sessionStorage.getItem('invoiceStatus') != ''
    );
  const paymentFilterActive =
    props.paymentFilter && Boolean(sessionStorage.getItem('paymentSummMax')) &&
    (
      sessionStorage.getItem('paymentProject') != '' ||
      sessionStorage.getItem('paymentPayer') != '' ||
      sessionStorage.getItem('paymentReceiver') != '' ||
      sessionStorage.getItem('paymentFromDate') != '' ||
      sessionStorage.getItem('paymentToDate') != '' ||
      sessionStorage.getItem('paymentSummMin') != '0' ||
      sessionStorage.getItem('paymentSummMax') != 'Infinity' ||
      sessionStorage.getItem('paymentStatus') != ''
    );
  const publicationFilterActive = props.publicationFilter && Boolean(sessionStorage.getItem('publicationProject').length)


  return (
    <div className={classNames('flex', styles.pageControls)}>
      <div className={classNames('flex', styles.svgBtnsBlock)}>
        {(!props.detail && !props.publicationSearch) &&
          <div className={classNames('flex', styles.pageControlItem, styles.findBlock)}>
            <div className={
              isVisible
                ? classNames(styles.searchBlock, styles.searchVisible)
                : styles.searchBlock}>
              <SearchBlock
                isVisible={isVisible}
                paymentSearch={props.paymentSearch}
                invoiceSearch={props.invoiceSearch}
                cashSearch={props.cashSearch}
                usersSearch={props.usersSearch}
                projectSearch={props.projectSearch}
                searchPlaceholder={props.searchPlaceholder}
              />
            </div>
            <button className={classNames(styles.searchBtn, styles.controlsBtn)} onClick={handleClick}>
              <SearchIcon />
            </button>
          </div>
        }
        {
          (!props.withoutCash && !props.detail) &&
          <div className={classNames(styles.pageControlItem, styles.filterBlock)}>
            <button
              onClick={props.openFilter}
              className={classNames(styles.filterBtn, styles.controlsBtn)}
            >
              <SettingsIcon />
              {
                (userFilterActive || projectFilterActive || invoiceFilterActive || paymentFilterActive || publicationFilterActive) &&
                <div>
                  <CheckIcon />
                </div>
              }
            </button>
          </div>
        }
      </div>
      {
        props.withInvoices &&
        <div className={classNames(styles.invoicesBtnBlock)}>
          <button
            onClick={handleAllInvoices}
            className={classNames(styles.invoicesBtn)}
          >
            Все счета
          </button>
          <button
            onClick={handleUnpaidInvoices}
            className={classNames(styles.invoicesBtn)}
          >
            Неоплаченные счета
          </button>
          <button
            onClick={handleDebInvoices}
            className={classNames(styles.invoicesBtn)}
          >
            Дебиторка
          </button>
        </div>
      }
      {props.detail && !props.approved && !props.isApprovedInvoiceForPayment && props.accessDelete &&
        <div className={classNames(styles.pageControlItem, styles.deleteBlock)}>
          <button
            className={classNames('btn', 'btnTransparent', styles.deleteBtn)}
            onClick={handleClickOpenDelete}
          >
            Удалить
          </button>
        </div>
      }
      {
        !props.withoutCash && !props.approved && !props.isApprovedInvoiceForPayment && props.access &&
        <div className={classNames(styles.pageControlItem, styles.addBlock)}>
          <button
            className={classNames('btn', styles.addBtn)}
            onClick={props.handleClickAdd}
          >
            {props.addBtnText}
          </button>
        </div>
      }
      {isOpenDelete && <ConfirmDelete onDelete={props.onDelete} closeDelete={handleClickCloseDelete} />}
    </div>
  );
}
