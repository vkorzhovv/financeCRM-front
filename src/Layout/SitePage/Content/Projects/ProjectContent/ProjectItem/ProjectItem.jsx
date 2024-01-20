import React from 'react';
import styles from './projectitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function ProjectItem(props) {

  return (
    <div className={classNames('tableRow', styles.projectItem)}>
      <div className={classNames('leftCell', 'tableCell', styles.projectCell, styles.projectName)}>
        {props.item.name}
      </div>
      <div className={classNames('tableCell', 'nowrapString', styles.projectCell)}>
        {
          props.item.project_manager
            ?
            `${props.item.project_manager.last_name} ${editName(props.item.project_manager.first_name)} ${editName(props.item.project_manager.father_name)}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', 'nowrapString', styles.projectCell)}>
        {
          props.item.client
            ?
            `${props.item.client.last_name} ${editName(props.item.client.first_name)} ${editName(props.item.client.father_name)}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', 'nowrapString', styles.projectCell)}>
        {
          props.item.foreman
            ?
            `${props.item.foreman.last_name} ${editName(props.item.foreman.first_name)} ${editName(props.item.foreman.father_name)}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', styles.projectCell)}>
        {editDate(props.item.start_date)}
      </div>
      <div className={classNames('tableCell', styles.projectCell)}>
        {editDate(props.item.end_date)}
      </div>
      <div className={classNames('tableCell', styles.projectCell)}>
        {props.item.price}
      </div>
      <div className={classNames('tableCell', styles.projectCell)}>
        {props.item.balance}
      </div>
      <div className={classNames('tableCell', styles.projectCell)}>
        {props.item.expenses}
      </div>
      <div className={classNames('tableCell', styles.projectCell)}>
        {props.item.active ? <span className={styles.statusTrue}>Активен</span> : <span className={styles.statusFalse}>Неактивен</span>}
      </div>
      <NavLink
        to={`/projects/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </div>
  );
}
