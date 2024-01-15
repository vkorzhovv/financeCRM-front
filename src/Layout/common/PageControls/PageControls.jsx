import React, { useState } from 'react';
import styles from './pagecontrols.module.css';
import classNames from 'classnames';
import SettingsIcon from '../../../svgIcons/settings';
import SearchIcon from '../../../svgIcons/search';
import { useDispatch } from 'react-redux';
import { getDebInvoices, getInvoices, getUnpaidInvoices } from '../../../redux/invoicesReducer';

export default function PageControls(props) {

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  const dispatch = useDispatch()
  const handleDebInvoices = () => {
    dispatch(getDebInvoices());
  }
  const handleUnpaidInvoices = () => {
    dispatch(getUnpaidInvoices());
  }
  const handleAllInvoices = () => {
    dispatch(getInvoices());
  }

  return (
    <div className={classNames('flex', styles.pageControls)}>
      <div className={classNames(styles.pageControlItem, styles.findBlock)}>
        <input className={
          isVisible
            ? classNames(styles.searchInput, styles.searchVisible)
            : styles.searchInput}
          placeholder='Введите запрос'></input>
        <button className={classNames(styles.searchBtn, styles.controlsBtn)} onClick={handleClick}>
          <SearchIcon />
        </button>
      </div>
      {
        !props.withoutCash &&
        <div className={classNames(styles.pageControlItem, styles.settingsBlock)}>
          <button className={classNames(styles.settingsBtn, styles.controlsBtn)}>
            <SettingsIcon />
          </button>
        </div>
      }
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
      {props.detail && !props.isApprovedInvoiceForPayment &&
        <div className={classNames(styles.pageControlItem, styles.deleteBlock)}>
          <button
            className={classNames('btn', 'btnTransparent', styles.deleteBtn)}
            onClick={props.onDelete}
          >
            Удалить
          </button>
        </div>
      }
      {
        !props.withoutCash && !props.approved && !props.isApprovedInvoiceForPayment &&
        <div className={classNames(styles.pageControlItem, styles.addBlock)}>
          <button
            className={classNames('btn', styles.addBtn)}
            onClick={props.handleClickAdd}
          >
            {props.addBtnText}
          </button>
        </div>
      }

    </div>
  );
}
