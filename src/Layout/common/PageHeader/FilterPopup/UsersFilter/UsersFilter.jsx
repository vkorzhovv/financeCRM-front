import classNames from "classnames";
import React, { useEffect } from "react";
import styles from './usersfilter.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { filterUser } from "../../../../../redux/usersReducer";

export default function UsersFilter(props) {
  const dispatch = useDispatch();

  const {
    clearErrors,
    register,
    reset,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data => {
    dispatch(filterUser(
      data.balanceStart || '-Infinity',
      data.balanceEnd || 'Infinity'
    ))
  })

  useEffect(() => {
    if (sessionStorage.getItem('userBalanceStart') !== '-Infinity') {
      setValue('balanceStart', sessionStorage.getItem('userBalanceStart'))
    }
    if (sessionStorage.getItem('userBalanceEnd') !== 'Infinity') {
      setValue('balanceEnd', sessionStorage.getItem('userBalanceEnd'))
    }
  }, [setValue])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        clearErrors('serverError');
      }}
      className={classNames('filterForm')}
    >
      <div className={classNames('flex', 'filterHeader')}>
        <h3 className={'filterTitle'}>Фильтр</h3>
        <div>
          <button
            onClick={() => reset()}
            className={classNames('btn', 'btnTransparent', 'filterBtn')}
            type="button"
          >
            Сбросить
          </button>
          <button
            className={classNames('btn', 'filterBtn')}
            type='submit'
            disabled={!isValid}
          >
            {'Применить'}
          </button>
        </div>
      </div>
      <div className={classNames('flex', styles.userFilter)}>
        <p className={classNames('filterLabel', styles.userLabel)}>Баланс</p>
        <div className={classNames('popupInputBox', styles.userFilterInput)}>
          <input
            className={!errors.balanceStart
              ? classNames('popupInput', 'filterInput')
              : classNames('popupInput', 'filterInput', 'popupError')}
            type='number'
            step='0.01'
            name='balanceStart'
            id='balanceStart'
            placeholder='Min'
            {...register('balanceStart',
              {
                pattern: {
                  value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                  message: 'Неверный ввод'
                },
                max: {
                  value: Boolean(getValues('balanceEnd')) ? Number(getValues('balanceEnd')) : Infinity,
                  message: 'Больше Max'
                }
              })
            }
          />
          {errors.balanceStart && <div className={classNames('popupErrorMessage')}>{errors.balanceStart.message}</div>}
        </div>
        <div className={classNames('popupInputBox', styles.userFilterInput)}>
          <input
            className={!errors.balanceEnd
              ? classNames('popupInput', 'filterInput')
              : classNames('popupInput', 'filterInput', 'popupError')}
            type='number'
            step='0.01'
            name='balanceEnd'
            id='balanceEnd'
            placeholder='Max'
            {...register('balanceEnd',
              {
                pattern: {
                  value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                  message: 'Неверный ввод'
                },
                min: {
                  value: Boolean(getValues('balanceStart')) ? Number(getValues('balanceStart')) : -Infinity,
                  message: 'Меньше Min'
                }
              })
            }
          />
          {errors.balanceEnd && <div className={classNames('popupErrorMessage')}>{errors.balanceEnd.message}</div>}
        </div>
      </div>
    </form>
  )
}
