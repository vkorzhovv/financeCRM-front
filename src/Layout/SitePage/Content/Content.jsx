import React from 'react';
import styles from './content.module.css';
import { Routes, Route } from 'react-router-dom';
import Projects from './Projects/Projects';
import Payment from './Payment/Payment';
import Money from './Money/Money';
import Invoices from './Invoices/Invoices';
import StaffContainer from './Staff/StaffContainer';
import StaffItemPageContainer from './StaffItemPage/StaffItemPageContainer';
import ProjectItemPageContainer from './ProjectItemPage/ProjectItemPageContainer';

export default function Content(props) {

  return (
    <main className={styles.content}>
        <Routes>
          <Route path={''} element={<StaffContainer />} />
          <Route path='/staff' element={<StaffContainer />} />
          <Route path='/staff/:userId?' element={<StaffItemPageContainer />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:projectId?' element={<ProjectItemPageContainer />} />
          <Route path='/money' element={<Money />} />
          <Route path='/invoices' element={<Invoices />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
    </main>
  );
}
