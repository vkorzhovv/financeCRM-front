import React from 'react';
import styles from './projectdata.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../utils/dateEditor';
import ProjectMoneyBox from './ProjectMoneyBox/ProjectMoneyBox';

export default function ProjectData(props) {

  const projectTh = [
    'Дата начала',
    'Дата окончания',
    'Сумма договора',
    'Текущий баланс',
  ]

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
                  <p className={styles.personTitle}>Клиент:</p> <p>{props.project.client && `${props.project.client.last_name} ${props.project.client.first_name} ${props.project.client.father_name}`}</p>
                </div>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Менеджер:</p><p>{props.project.project_manager && `${props.project.project_manager.last_name} ${props.project.project_manager.first_name} ${props.project.project_manager.father_name}`}</p>
                </div>
                <div className={classNames('flex', styles.personItem)}>
                  <p className={styles.personTitle}>Прораб:</p><p>{props.project.foreman && `${props.project.foreman.last_name} ${props.project.foreman.first_name} ${props.project.foreman.father_name}`}</p>
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
                    {editDate(props.project.start_date)}
                  </div>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {editDate(props.project.end_date)}
                  </div>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {props.project.price}
                  </div>
                  <div className={classNames('tableCell', styles.itemCell)}>
                    {props.project.balance}
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
