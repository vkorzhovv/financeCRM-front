import React from 'react';
import styles from './searchblock.module.css';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { searchUser } from '../../../../redux/usersReducer';
import { searchProject } from '../../../../redux/projectsReducer';
import { searchItem } from '../../../../redux/cashItemReducer';
import { searchInvoice } from '../../../../redux/invoicesReducer';
import { searchPayment } from '../../../../redux/paymentReducer';
import { useEffect } from 'react';

export default function SearchBlock(props) {

const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const resetFunction = () => {
    if(props.usersSearch) {
      dispatch(searchUser(''))
    }
    if(props.projectSearch) {
      dispatch(searchProject(''))
    }
    if(props.cashSearch) {
      dispatch(searchItem(''))
    }
    if(props.invoiceSearch) {
      dispatch(searchInvoice(''))
    }
    if(props.paymentSearch) {
      dispatch(searchPayment(''))
    }
    reset();
  }

  useEffect(() => {
    !props.isVisible && resetFunction();
  }, [props.isVisible])

  const onSubmit = (data => {
    props.usersSearch && dispatch(searchUser(data.searchText));
    props.projectSearch && dispatch(searchProject(data.searchText));
    props.cashSearch && dispatch(searchItem(data.searchText));
    props.invoiceSearch && dispatch(searchInvoice(data.searchText));
    props.paymentSearch && dispatch(searchPayment(data.searchText))
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
