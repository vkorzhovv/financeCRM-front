import classNames from 'classnames';
import React from 'react';
import styles from './projectcontent.module.css';
import ProjectItem from './ProjectItem/ProjectItem';

export default function ProjectContent(props) {

  const projectTh = [
    'Название',
    'Менеджер',
    'Клиент',
    'Прораб',
    'Дата начала',
    'Дата окончания',
    'Сумма договора',
    'Текущий баланс',
    'Расход',
    'Статус',
  ]

  const projects = [
    {
      name: 'Главный проект',
      manager: 'Петров Петр Петрович',
      client: 'Сидоров Сидор Сидорович',
      foreman: 'Николаев Николай Николаевич',
      start: '01.02.2022',
      end: '01.02.2024',
      summ: '1 000 000 р',
      balance: '500 000 р',
      expend: '5,3 л',
      status: 'Активен'
    },
    {
      name: 'Название',
      manager: 'Менеджер',
      client: 'Клиент',
      foreman: 'Прораб',
      start: 'Дата начала',
      end: 'Дата окончания',
      summ: 'Сумма договора',
      balance: 'Текущий баланс',
      expend: 'Расход',
      status: 'Статус'
    },
    {
      name: 'Название',
      manager: 'Менеджер',
      client: 'Клиент',
      foreman: 'Прораб',
      start: 'Дата начала',
      end: 'Дата окончания',
      summ: 'Сумма договора',
      balance: 'Текущий баланс',
      expend: 'Расход',
      status: 'Статус'
    },
  ]

  return (
    <div className={styles.projectContent}>
      <table className={classNames('table')}>
        <thead className={styles.titles}>
          <tr>
            {projectTh.map(item =>
              <th className={styles.titlesItem}>{item}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {projects.map(item =>
            <ProjectItem item={item} />
          )}
        </tbody>
      </table>
    </div>
  );
}
