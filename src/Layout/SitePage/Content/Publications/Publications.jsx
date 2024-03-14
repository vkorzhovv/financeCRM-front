import React from 'react';
import PublicationContent from './PublicationContent/PublicationContent';
import PublicationHeader from './PublicationHeader/PublicationHeader';
import styles from './publications.module.css';

export default function Publications(props) {

   return (
    <div className={styles.publications}>
      <PublicationHeader />
      <PublicationContent />
    </div>
  );
}
