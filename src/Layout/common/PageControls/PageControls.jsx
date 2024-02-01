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
    me.user_type === 's' ? dispatch(getDebInvoices()) : dispatch(getUserDebInvoices(me.id));
  }
  const handleUnpaidInvoices = () => {
    me.user_type === 's' ? dispatch(getUnpaidInvoices()) : dispatch(getUserUnpaidInvoices(me.id));
  }
  const handleAllInvoices = () => {
    me.user_type === 's' ? dispatch(getInvoices()) : dispatch(getUserInvoices(me.id));
  }

  return (
    <div className={classNames('flex', styles.pageControls)}>
      <div className={classNames('flex', styles.svgBtnsBlock)}>
        {!props.detail &&
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
          <div className={classNames(styles.pageControlItem, styles.settingsBlock)}>
            <button className={classNames(styles.settingsBtn, styles.controlsBtn)}>
              <SettingsIcon />
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
