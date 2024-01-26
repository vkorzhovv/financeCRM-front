import React from 'react';
import styles from './content.module.css';
import { Routes, Route } from 'react-router-dom';
import Projects from './Projects/Projects';
import StaffContainer from './Staff/StaffContainer';
import StaffItemPageContainer from './StaffItemPage/StaffItemPageContainer';
import ProjectItemPageContainer from './ProjectItemPage/ProjectItemPageContainer';
import CashItemContainer from './CashItem/CashItemContainer';
import InvoicesContainer from './Invoices/InvoicesContainer';
import InvoicesItemPageContainer from './InvoicesItemPage/InvoicesItemPageContainer';
import PaymentContainer from './Payment/PaymentContainer';
import PaymentItemPageContainer from './PaymentItemPage/PaymentItemPageContainer';

export default function Content(props) {

  return (
    <main className={styles.content}>
        <Routes>
          <Route path={''} element={<Projects />} />
          <Route path='staff' element={<StaffContainer />} />
          <Route path='staff/:userId?' element={<StaffItemPageContainer />} />
          <Route path='projects' element={<Projects />} />
          <Route path='projects/:projectId?' element={<ProjectItemPageContainer />} />
          <Route path='money' element={<CashItemContainer />} />
          <Route path='invoices' element={<InvoicesContainer />} />
          <Route path='invoices/:invoicesId?' element={<InvoicesItemPageContainer />} />
          <Route path='payment' element={<PaymentContainer />} />
          <Route path='payment/:paymentId?' element={<PaymentItemPageContainer />} />
        </Routes>
    </main>
  );
}
