import React from 'react';
import styles from './projectdata.module.css';
import classNames from 'classnames';
import ProjectMoney from './ProjectMoney/ProjectMoney';

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
                {props.project.active ? "Активен" : "Неактивен"}
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
            <table className={styles.projectTable}>
              <thead className={styles.projectTableTitles}>
                <tr>
                  {projectTh.map(item =>
                    <th className={styles.titlesItem}>{item}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className={styles.projectTableItem}>
                  <td>
                    {props.project.start_date}
                  </td>
                  <td>
                    {props.project.end_date}
                  </td>
                  <td>
                    {props.project.price}
                  </td>
                  <td>
                    {props.project.remainder}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={classNames(styles.projectDataItem, styles.projectMoney)}>
          <div className={classNames('flex', styles.moneyHeader)}>
            <h3 className={classNames(styles.moneyHeaderText)}>Поступления по проекту</h3>
            <div className={classNames('flex')}>
              <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>Общая сумма</p>
              <div>Плюс</div>
            </div>
          </div>
          <table className={styles.moneyTable}>
            <tbody>
              {props.payments.map(item =>
                <ProjectMoney money={item} />
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={classNames(styles.projectDataItem, styles.projectMoney)}>
        <div className={classNames('flex', styles.moneyHeader)}>
          <h3 className={classNames(styles.moneyHeaderText)}>Расходы по проекту</h3>
          <div className={classNames('flex')}>
            <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>Общая сумма</p>
            <div>Плюс</div>
          </div>
        </div>
        <table className={styles.moneyTable}>
          <tbody>
            {props.costs.map(item =>
              <ProjectMoney money={item} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
