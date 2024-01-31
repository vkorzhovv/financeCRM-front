import React from 'react';
import styles from './searchblock.module.css';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../../../redux/usersReducer';
import { searchProject } from '../../../../redux/projectsReducer';
import { searchItem } from '../../../../redux/cashItemReducer';

export default function SearchBlock(props) {

const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data => {
    props.usersSearch && dispatch(searchUser(data.searchText));
    props.projectSearch && dispatch(searchProject(data.searchText));
    props.cashSearch && dispatch(searchItem(data.searchText));
  })

  return (
    <form
      onChange={handleSubmit(onSubmit)}
      className={classNames(styles.search)}
    >
      <input
        type='text'
        placeholder={props.searchPlaceholder}
        {...register('searchText')}
      />
    </form>
  );
}
