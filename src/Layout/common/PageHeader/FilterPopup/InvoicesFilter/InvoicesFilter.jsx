import classNames from "classnames";
import React, { useEffect } from "react";
import styles from './invoicesfilter.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from "../../../../../redux/usersSelector";
import { getUsers } from "../../../../../redux/usersReducer";
import { editName } from "../../../../../utils/nameEditor";
import { selectProjects } from "../../../../../redux/projectsSelector";
import { getProjects } from "../../../../../redux/projectsReducer";
import { filterInvoice } from "../../../../../redux/invoicesReducer";

export default function InvoicesFilter(props) {

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const projects = useSelector(selectProjects);

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

  useEffect(() => {
    dispatch(getProjects())
      .then(() => {
        setValue('project', sessionStorage.getItem('invoiceProject'));
      })
    dispatch(getUsers())
      .then(() => {
        setValue('payer', sessionStorage.getItem('invoicePayer'));
        setValue('receiver', sessionStorage.getItem('invoiceReceiver'));
      })
    setValue('fromDate', sessionStorage.getItem('invoiceFromDate'));
    setValue('toDate', sessionStorage.getItem('invoiceToDate'));
    setValue('minSumm', sessionStorage.getItem('invoiceSummMin') === '0' ? '' : sessionStorage.getItem('invoiceSummMin'));
    setValue('maxSumm', sessionStorage.getItem('invoiceSummMax') === 'Infinity' ? '' : sessionStorage.getItem('invoiceSummMax'));
    setValue('invoiceType', sessionStorage.getItem('invoiceType'));
    setValue('status', sessionStorage.getItem('invoiceStatus'));
  }, [dispatch, setValue])

  const onSubmit = (data => {
    dispatch(filterInvoice(
      data.project,
      data.payer,
      data.receiver,
      data.fromDate,
      data.toDate,
      data.minSumm || 0,
      data.maxSumm || 'Infinity',
      data.invoiceType,
      data.status
    ))
  })

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
      <div className={classNames('flex', 'filterFields')}>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Проект</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('project')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              {projects && projects.map(item =>
                <option
                  key={item.id}
                  value={item.id}>
                  {item.name}
                </option>
              )}
            </select>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Плательщик</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('payer')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              {users && users.map(item =>
                <option
                  key={item.id}
                  value={item.id}>
                  {item.last_name} {editName(item.first_name)} {editName(item.father_name)}
                </option>
              )}
            </select>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Получатель</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('receiver')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              {users && users.map(item =>
                <option
                  key={item.id}
                  value={item.id}>
                  {item.last_name} {editName(item.first_name)} {editName(item.father_name)}
                </option>
              )}
            </select>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Дата от/до</p>
          <div className={classNames('flex', 'fromToFilter', styles.fromTo)}>
            <div className={classNames('popupInputBox', 'filterInputBox')}>
              <input
                className={!errors.fromDate
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='date'
                name='fromDate'
                {...register('fromDate',
                  // {
                  //   max: {
                  //     value: Boolean(getValues('maxSumm')) ? Number(getValues('maxSumm')) : Infinity,
                  //     message: 'Больше Max'
                  //   }
                  // }
                )
                }
              />
              {errors.fromDate && <div className={classNames('popupErrorMessage')}>{errors.fromDate.message}</div>}
            </div>
            <div className={classNames('popupInputBox', 'filterInputBox')}>
              <input
                className={!errors.toDate
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='date'
                name='toDate'
                {...register('toDate',
                  // {
                  //   max: {
                  //     value: Boolean(getValues('maxSumm')) ? Number(getValues('maxSumm')) : Infinity,
                  //     message: 'Больше Max'
                  //   }
                  // }
                )
                }
              />
              {errors.toDate && <div className={classNames('popupErrorMessage')}>{errors.toDate.message}</div>}
            </div>
          </div>
        </div>
      </div>
      <div className={classNames('flex', 'filterFields', 'addRowFilterFields')}>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Сумма счета</p>
          <div className={classNames('flex', 'fromToFilter', styles.fromTo)}>
            <div className={classNames('popupInputBox', 'filterInputBox')}>
              <input
                className={!errors.minSumm
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='number'
                step='0.01'
                name='minSumm'
                placeholder='Min'
                {...register('minSumm',
                  {
                    pattern: {
                      value: /^[0]{1}$|^[0]{1}[.]([0-9]{0,2})$|^[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    min: {
                      value: 0,
                      message: 'Минимум 0'
                    },
                    max: {
                      value: Boolean(getValues('maxSumm')) ? Number(getValues('maxSumm')) : Infinity,
                      message: 'Меньше Max'
                    }
                  })
                }
              />
              {errors.minSumm && <div className={classNames('popupErrorMessage')}>{errors.minSumm.message}</div>}
            </div>
            <div className={classNames('popupInputBox', 'filterInputBox')}>
              <input
                className={!errors.maxSumm
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='number'
                step='0.01'
                name='maxSumm'
                placeholder='Max'
                {...register('maxSumm',
                  {
                    pattern: {
                      value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    min: {
                      value: Boolean(getValues('minSumm')) ? Number(getValues('minSumm')) : 0,
                      message: 'Больше Min'
                    }
                  })
                }
              />
              {errors.maxSumm && <div className={classNames('popupErrorMessage')}>{errors.maxSumm.message}</div>}
            </div>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Расход/Поступление</p>
          <div className={classNames('popupInputBox', 'filterInputBox', styles.invoiceBox)}>
            <select {...register('invoiceType')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              <option value='0'>Поступление</option>
              <option value='1'>Расход</option>
            </select>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Статус</p>
          <div className={classNames('popupInputBox', 'filterInputBox', styles.invoiceBox)}>
            <select {...register('status')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              <option value='0'>Не оплачено</option>
              <option value='1'>Частично оплачено</option>
              <option value='2'>Оплачено</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  )
}
