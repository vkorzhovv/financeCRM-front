import React from 'react';
import styles from './invoicemoneycontrols.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../svgIcons/edit';
import CheckIcon from '../../../../../../svgIcons/check';

export default function InvoiceMoneyControls(props) {

  return (
    <div className={classNames('flex', styles.moneyControls)}>
      <button className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}>
        <DeleteIcon />
      </button>
      <button className={classNames('flex', styles.controlBtn, styles.strokeSVG)}>
        <EditIcon />
      </button>
      <button className={classNames('flex', styles.controlBtn, styles.fillSVG)}>
        <CheckIcon />
      </button>
    </div>
  );
}
