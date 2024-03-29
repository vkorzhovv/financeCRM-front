import React, { useState } from 'react';
import styles from './projectmoneybox.module.css';
import classNames from 'classnames';
import ProjectMoney from './ProjectMoney/ProjectMoney';
import InvoicesAddPopupContainer from '../../../Invoices/InvoicesAddPopup/InvoicesAddPopupContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../../../../redux/projectsReducer';
import { selectMe } from '../../../../../../redux/authSelectors';

export default function ProjectMoneyBox(props) {

  const me = useSelector(selectMe);

  const dispatch = useDispatch()

  const [isOpenPopupInvoices, setIsOpenPopupInvoices] = useState(false);
  const [isOpenPopupExpenses, setIsOpenPopupExpenses] = useState(false);

  const closeExpenses = () => {
    setIsOpenPopupExpenses(false)
    dispatch(getProjects())
  }

  const handleClickOpen = () => {
    props.receipts ? setIsOpenPopupInvoices(true) : setIsOpenPopupExpenses(true);
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    props.receipts ? setIsOpenPopupInvoices(false) : closeExpenses();
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={classNames(styles.projectMoney)}>
      <div className={classNames('flex', styles.moneyHeader)}>
        <h3 className={classNames(styles.moneyHeaderText)}>{props.title}</h3>
        <div className={classNames('flex', styles.moneyHeaderData)}>
          <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>
            {
              props.cash.map(item =>
                item.receipts
              ).reduce((acc, number) => Number(acc) + Number(number), 0).toFixed(2)
            }&nbsp;&#8381;
          </p>
          {me.user_type === 's' &&
            <button
              onClick={handleClickOpen}
              className={classNames('flex', styles.addPayBtn)}
            >
              <span className={classNames(styles.horLine, styles.line)}></span>
              <span className={classNames(styles.verLine, styles.line)}></span>
            </button>
          }
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <div className={classNames('table', styles.moneyTable)}>
          {props.cash.map(item =>
            <ProjectMoney
              projectClient={props.projectClient}
              projectId={props.projectId}
              key={item.id}
              receipts={props.receipts || false}
              money={item}
              me={me}
            />
          )}
        </div>
      </div>

      {isOpenPopupExpenses &&
        <InvoicesAddPopupContainer
          projectExpense={true}
          projectClient={props.projectClient}

          projectId={props.projectId}
          handleClickClose={handleClickClose}
          close={handleClickClose}

          submitText={"Добавить"}
          popupHeader={"Добавить расход"}
        />
      }
      {isOpenPopupInvoices &&
        <InvoicesAddPopupContainer
          projectReceipt={true}
          projectClient={props.projectClient}

          projectId={props.projectId}
          handleClickClose={handleClickClose}
          close={handleClickClose}

          submitText={"Добавить"}
          popupHeader={"Добавить поступление"}
        />
      }
    </div>
  );
}
