import React from 'react';
import styles from './projectdata.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../utils/dateEditor';
import ProjectMoneyBox from './ProjectMoneyBox/ProjectMoneyBox';
import { NavLink } from 'react-router-dom';

export default function ProjectData(props) {

  const projectTh = [
    'Сумма договора',
    'Текущий баланс',
    'Прибыль по проекту',
    'Текущее сальдо',
  ]

  const receipts = props.projectInvoices ? props.projectInvoices.map(item =>
    item.receipts
  ).reduce((acc, number) => Number(acc) + Number(number), 0).toFixed(2) : (0).toFixed(2);
  const expenses = props.projectExpenses ? props.projectExpenses.map(item =>
    item.amount
  ).reduce((acc, number) => Number(acc) + Number(number), 0).toFixed(2) : (0).toFixed(2);

  const balance = (props.project.price - receipts).toFixed(2);
  const profit = (props.project.price - expenses).toFixed(2);
  const saldo = (receipts - expenses).toFixed(2);

  return (
    <div className={styles.projectData}>
      <div className={styles.left}>
        <div className={classNames(styles.leftItem)}>
          <div className={classNames(styles.leftItem, styles.projectDataItem, styles.projectDataMain)}>
            <div className={classNames('flex', styles.projectHeader)}>
              <h2 className={styles.theProjectTitle}>{props.project.name}</h2>
              <div className={styles.status}>
                {props.project.active ? <span className={styles.statusTrue}>Активен</span> : <span className={styles.statusFalse}>Неактивен</span>}
              </div>
            </div>
            <div className={classNames('flex', styles.projectMainInfo)}>
              <div className={styles.projectPersonList}>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Клиент:</p>
                  {props.project.client ?
                    <NavLink to={`/staff/${props.project.client.id}`}>
                      {props.project.client.last_name} {props.project.client.first_name} {props.project.client.father_name}
                    </NavLink>
                    :
                    <p>Не выбран</p>
                  }
                </div>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Менеджер:</p>
                  {props.project.project_manager ?
                    <NavLink to={`/staff/${props.project.project_manager.id}`}>
                      {props.project.project_manager.last_name} {props.project.project_manager.first_name} {props.project.project_manager.father_name}
                    </NavLink>
                    :
                    <p>Не выбран</p>
                  }
                </div>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Прораб:</p>
                  {props.project.foreman ?
                    <NavLink to={`/staff/${props.project.foreman.id}`}>
                      {props.project.foreman.last_name} {props.project.foreman.first_name} {props.project.foreman.father_name}
                    </NavLink>
                    :
                    <p>Не выбран</p>
                  }
                </div>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Дата начала:</p>
                  <p>{editDate(props.project.start_date)}</p>
                </div>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Дата окончания:</p>
                  <p>{editDate(props.project.end_date)}</p>
                </div>
              </div>
              <div className={styles.description}>
                <p>
                  {props.project.description}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(styles.projectDataItem)}>
            <div className={classNames('table', styles.projectTable)}>
              <div className={classNames('tableHeader', styles.projectTableTitles)}>
                <div className={classNames('tableRow')}>
                  {projectTh.map((item, index) =>
                    <div
                      key={item + index}
                      className={classNames('tableCell', styles.titlesItem)}>
                      {item}
                    </div>
                  )}
                </div>
              </div>
              <div className={classNames('tableBody')}>
                <div className={classNames('tableRow', styles.projectTableItem)}>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {props.project.price}&nbsp;&#8381;
                  </div>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {balance}&nbsp;&#8381;
                  </div>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {profit}&nbsp;&#8381;
                  </div>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {saldo}&nbsp;&#8381;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles.projectDataItem, styles.dataItemMoney)}>
          <ProjectMoneyBox
            projectId={props.projectId}
            receipts={true}
            title={"Поступления по проекту"}
            cash={props.projectInvoices}
          />
        </div>
      </div>
      <div className={classNames(styles.projectDataItem, styles.dataItemMoney)}>
        <ProjectMoneyBox
          projectId={props.projectId}
          expenses={true}
          title={"Расходы по проекту"}
          cash={props.projectExpenses}
        />
      </div>
    </div>
  );
}
