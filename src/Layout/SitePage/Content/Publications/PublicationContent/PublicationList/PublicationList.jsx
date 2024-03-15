import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredPublications } from '../../../../../../redux/publicationsSelector';
import styles from './publicationlist.module.css';
import classNames from 'classnames';
import PublicationItem from './PublicationItem/PublicationItem';

export default function PublicationList(props) {

  const publications = useSelector(selectFilteredPublications)

  return (
    <div className={classNames('flex', styles.pubList)}>
      {
        publications.map((item) =>
          <PublicationItem
            key={item.id}
            item={item}
          />
        )
      }
    </div>
  );
}
