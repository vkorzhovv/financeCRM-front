import React from 'react';
import styles from './content.module.css';
import { Routes, Route } from 'react-router-dom';
import Staff from './Staff/Staff';
import Projects from './Projects/Projects';
import Payment from './Payment/Payment';
import Money from './Money/Money';
import Invoices from './Invoices/Invoices';
import StaffItemPage from './StaffItemPage/StaffItemPage';
import ProjectItemPage from './ProjectItemPage/ProjectItemPage';
// import classNames from 'classnames';

export default function Content(props) {

  return (
    <main className={styles.content}>
        <Routes>
          <Route path={''} element={<Staff />} />
          <Route path='/staff' element={<Staff />} />
          <Route path='/staff/:id?' element={<StaffItemPage />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id?' element={<ProjectItemPage />} />
          <Route path='/money' element={<Money />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
    </main>
  );
}
