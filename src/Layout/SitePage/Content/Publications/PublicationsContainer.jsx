import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterPublication, getPublications } from '../../../../redux/publicationsReducer';
import Publications from './Publications';

export default function PublicationsContainer(props) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPublications())
      .then(() => {
        dispatch(filterPublication(sessionStorage.getItem('publicationProject') || []))
      })
  }, [dispatch])

  return (
    <Publications />
  );
}
