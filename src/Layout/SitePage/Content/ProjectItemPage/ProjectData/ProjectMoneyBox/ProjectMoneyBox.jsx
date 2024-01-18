import React, { useState } from 'react';
import styles from './projectmoneybox.module.css';
import classNames from 'classnames';
import ProjectMoney from './ProjectMoney/ProjectMoney';
import InvoicesAddPopupContainer from '../../../Invoices/InvoicesAddPopup/InvoicesAddPopupContainer';
import ProjectExpensesAddPopupContainer from '../../ProjectExpensesAddPopup/ProjectExpensesAddPopupContainer';

export default function ProjectMoneyBox(props) {

  const [isOpenPopupInvoices, setIsOpenPopupInvoices] = useState(false);
  const [isOpenPopupExpenses, setIsOpenPopupExpenses] = useState(false);

  const handleClickOpen = () => {
    props.receipts ? setIsOpenPopupInvoices(true) : setIsOpenPopupExpenses(true);
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    props.receipts ? setIsOpenPopupInvoices(false) : setIsOpenPopupExpenses(false);
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={classNames(styles.projectMoney)}>
      <div className={classNames('flex', styles.moneyHeader)}>
        <h3 className={classNames(styles.moneyHeaderText)}>{props.title}</h3>
        <div className={classNames('flex')}>
          <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>
            {
              props.receipts ?
                props.cash.map(item =>
                  item.receipts
                ).reduce((acc, number) => Number(acc) + Number(number), 0).toFixed(2)
                :
                props.cash.map(item =>
                  item.amount
                ).reduce((acc, number) => Number(acc) + Number(number), 0).toFixed(2)
            }
          </p>
          <button
            onClick={handleClickOpen}
            className={classNames('flex', styles.addPayBtn)}
          >
            <span className={classNames(styles.horLine, styles.line)}></span>
            <span className={classNames(styles.verLine, styles.line)}></span>
          </button>
        </div>
      </div>
      <table className={styles.moneyTable}>
        <tbody>
          {props.cash.map(item =>
            <ProjectMoney
              projectId={props.projectId}
              key={item.id}
              receipts={props.receipts || false}
              money={item}
            />
          )}
        </tbody>
      </table>

      {isOpenPopupExpenses &&
        <ProjectExpensesAddPopupContainer
          projectId={props.projectId}
          handleClickClose={handleClickClose}

          submitText={"Добавить"}
          popupHeader={"Добавить расход"}
        />
      }
      {isOpenPopupInvoices &&
        <InvoicesAddPopupContainer
          projectId={props.projectId}
          handleClickClose={handleClickClose}
          close={handleClickClose}
        />
      }
    </div>
  );
}
