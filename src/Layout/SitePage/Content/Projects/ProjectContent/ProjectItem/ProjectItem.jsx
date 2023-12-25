import React from 'react';
import styles from './projectitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function ProjectItem(props) {

  return (
    <tr className={styles.projectItem}>
      <td className={classNames(styles.projectCell, styles.cellWidth)}>
        {props.item.name}
      </td>
      <td className={classNames(styles.projectCell, styles.cellWidth)}>
        {props.item.manager}
      </td>
      <td className={classNames(styles.projectCell, styles.cellWidth)}>
        {props.item.client}
      </td>
      <td className={classNames(styles.projectCell, styles.cellWidth)}>
        {props.item.foreman}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.start}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.end}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.summ}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.balance}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell)}>
        {props.item.expend}
      </td>
      <td className={classNames(styles.projectCell, styles.centerCell, styles.statusCell)}>
        {props.item.status}
      </td>
      <NavLink
        to='/projects/id'
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
