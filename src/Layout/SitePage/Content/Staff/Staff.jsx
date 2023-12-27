import React from 'react';
import styles from './staff.module.css';
import StaffContentContainer from './StaffContent/StaffContentContainer';
import StaffHeader from './StaffHeader/StaffHeader';

export default function Staff(props) {

  return (
    <div className={styles.staff}>
      <StaffHeader />
      <StaffContentContainer users={props.users}/>
    </div>
  );
}
