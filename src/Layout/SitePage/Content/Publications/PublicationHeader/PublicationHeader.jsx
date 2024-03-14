import React from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import styles from './publicationheader.module.css';

export default function PublicationHeader(props) {

  return (
    <div>
      <PageHeader
        title={'Лента'}

        publicationFilter={true}
        publicationSearch={true}
      />
    </div>
  );
}
