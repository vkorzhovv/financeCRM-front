import React from 'react';
import styles from './projectitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function ProjectItem(props) {

  return (
    <tr className={styles.projectItem}>
      <td className={classNames(styles.projectCell, styles.cellWidth, styles.projectName)}>
        {props.item.name}
      </td>
      <td className={classNames('nowrapString', styles.projectCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.project_manager
            ?
            `${props.item.project_manager.last_name} ${editName(props.item.project_manager.first_name)} ${editName(props.item.project_manager.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames('nowrapString', styles.projectCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.client
            ?
            `${props.item.client.last_name} ${editName(props.item.client.first_name)} ${editName(props.item.client.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames('nowrapString', styles.projectCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.foreman
            ?
            `${props.item.foreman.last_name} ${editName(props.item.foreman.first_name)} ${editName(props.item.foreman.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {editDate(props.item.start_date)}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {editDate(props.item.end_date)}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.price}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.balance}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.expenses}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.active ? <span className={styles.statusTrue}>Активен</span> : <span className={styles.statusFalse}>Неактивен</span>}
      </td>
      <NavLink
        to={`/projects/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
