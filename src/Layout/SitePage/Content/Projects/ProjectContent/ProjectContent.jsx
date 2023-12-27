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
          {props.projects && props.projects.map(item =>
            <ProjectItem
              key={item.id}
              item={item}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
