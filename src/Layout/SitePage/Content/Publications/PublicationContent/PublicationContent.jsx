import React from 'react';
import PublicationAddForm from '../PublicationAddForm/PublicationAddForm';
import styles from './publicationcontent.module.css';
import PublicationList from './PublicationList/PublicationList';

export default function PublicationContent(props) {

   return (
    <div className={styles.publicationContent}>
      <PublicationAddForm />
      <PublicationList />
    </div>
  );
}
