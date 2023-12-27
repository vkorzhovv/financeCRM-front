import React from 'react';
import styles from './projectitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function ProjectItem(props) {

  return (
    <tr className={styles.projectItem}>
      <td className={classNames(styles.projectCell, styles.cellWidth)}>
        {props.item.name}
      </td>
      <td className={classNames(styles.projectCell, styles.cellWidth, styles.centerCell)}>
        {props.item.project_manager.last_name}&nbsp;
        {editName(props.item.project_manager.first_name)}&nbsp;
        {editName(props.item.project_manager.father_name)}
      </td>
      <td className={classNames(styles.projectCell, styles.cellWidth, styles.centerCell)}>
        {props.item.client.last_name}&nbsp;
        {editName(props.item.client.first_name)}&nbsp;
        {editName(props.item.client.father_name)}
      </td>
      <td className={classNames(styles.projectCell, styles.cellWidth, styles.centerCell)}>
        {props.item.foreman.last_name}&nbsp;
        {editName(props.item.foreman.first_name)}&nbsp;
        {editName(props.item.foreman.father_name)}
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
        {props.item.remainder}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.expenses}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell, styles.statusCell)}>
        {props.item.active ? "Активен" : "Неактивен"}
      </td>
      <NavLink
        to={`/projects/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
