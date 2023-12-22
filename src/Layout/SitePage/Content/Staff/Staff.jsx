import React from 'react';
import styles from './staff.module.css';
import StaffContent from './StaffContent/StaffContent';
import StaffHeader from './StaffHeader/StaffHeader';
// import classNames from 'classnames';

export default function Staff(props) {

  return (
    <div className={styles.staff}>
      <StaffHeader />
      <StaffContent />
    </div>
  );
}
