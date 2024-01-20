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
      <div className={classNames('table', styles.projectTable)}>
        <div className={classNames('tableHeader', styles.titles)}>
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
          {props.projects && props.projects.map(item =>
            <ProjectItem
              key={item.id}
              item={item}
            />
          )}
        </div>
      </div>
    </div>
  );
}
