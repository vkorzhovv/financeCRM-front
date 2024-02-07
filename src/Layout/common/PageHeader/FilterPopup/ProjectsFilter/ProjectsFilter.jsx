import classNames from "classnames";
import React, { useEffect } from "react";
import styles from './projectsfilter.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectClients, selectContractors, selectEmployees } from "../../../../../redux/usersSelector";
import { getClients, getContractors, getEmployees } from "../../../../../redux/usersReducer";
import { editName } from "../../../../../utils/nameEditor";
import { filterProject } from "../../../../../redux/projectsReducer";

export default function ProjectsFilter(props) {

  const dispatch = useDispatch();
  const contractors = useSelector(selectContractors);
  const employees = useSelector(selectEmployees);
  const clients = useSelector(selectClients);

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
    dispatch(getClients())
      .then(() => {
        setValue('client', sessionStorage.getItem('projectClient'));
      }
      )
    dispatch(getEmployees())
      .then(() => {
        setValue('manager', sessionStorage.getItem('projectManager'));
      }
      )
    dispatch(getContractors())
      .then(() => {
        setValue('foreman', sessionStorage.getItem('projectForeman'));
      }
      )
    setValue('start', sessionStorage.getItem('projectStartDate'));
    setValue('end', sessionStorage.getItem('projectEndDate'));
    setValue('minSumm', sessionStorage.getItem('projectSummMin') === '0' ? '' : sessionStorage.getItem('projectSummMin'));
    setValue('maxSumm', sessionStorage.getItem('projectSummMax') === 'Infinity' ? '' : sessionStorage.getItem('projectSummMax'));
    setValue('minBalance', sessionStorage.getItem('projectBalanceMin') === '-Infinity' ? '' : sessionStorage.getItem('projectBalanceMin'));
    setValue('maxBalance', sessionStorage.getItem('projectBalanceMax') === 'Infinity' ? '' : sessionStorage.getItem('projectBalanceMax'));
    setValue('minExpense', sessionStorage.getItem('projectExpensesMin') === '-Infinity' ? '' : sessionStorage.getItem('projectExpensesMin'));
    setValue('maxExpense', sessionStorage.getItem('projectExpensesMax') === 'Infinity' ? '' : sessionStorage.getItem('projectExpensesMax'));
    setValue('status', sessionStorage.getItem('projectStatus'));
  }, [dispatch, setValue])

  const onSubmit = (data => {
    dispatch(filterProject(
      data.manager,
      data.foreman,
      data.client,
      data.start,
      data.end,
      data.minSumm || 0,
      data.maxSumm || 'Infinity',
      data.minBalance || '-Infinity',
      data.maxBalance || 'Infinity',
      data.minExpense || '-Infinity',
      data.maxExpense || 'Infinity',
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
          <p className={classNames('filterLabel')}>Менеджер</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('manager')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              {employees && employees.map(item =>
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
          <p className={classNames('filterLabel')}>Прораб</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('foreman')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              {contractors && contractors.map(item =>
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
          <p className={classNames('filterLabel')}>Клиент</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('client')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              {clients && clients.map(item =>
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
          <p className={classNames('filterLabel')}>Дата начала</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <input
              className={classNames('popupInput', 'filterInput')}
              type='date'
              name='start'
              {...register('start')}
            />
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Дата окончания</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <input
              className={classNames('popupInput', 'filterInput')}
              type='date'
              name='end'
              {...register('end')}
            />
          </div>
        </div>
      </div>
      <div className={classNames('flex', 'filterFields', 'addRowFilterFields')}>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Сумма договора</p>
          <div className={classNames('flex', 'fromToFilter', styles.fromTo)}>
            <div className={classNames('popupInputBox', 'filterInputBox', styles.projectBox)}>
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
                      message: "Больше 0"
                    },
                    max: {
                      value: Boolean(getValues('maxSumm')) ? Number(getValues('maxSumm')) : Infinity,
                      message: 'Больше Max'
                    }
                  })
                }
              />
              {errors.minSumm && <div className={classNames('popupErrorMessage')}>{errors.minSumm.message}</div>}
            </div>
            <div className={classNames('popupInputBox', 'filterInputBox', styles.projectBox)}>
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
                      value: /^[0]{1}$|^[0]{1}[.]([0-9]{0,2})$|^[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    min: {
                      value: Number(getValues('minSumm')) && 0,
                      message: 'Больше Min и 0'
                    }
                  })
                }
              />
              {errors.maxSumm && <div className={classNames('popupErrorMessage')}>{errors.maxSumm.message}</div>}
            </div>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Текущий баланс</p>
          <div className={classNames('flex', 'fromToFilter', styles.fromTo)}>
            <div className={classNames('popupInputBox', 'filterInputBox', styles.projectBox)}>
              <input
                className={!errors.minBalance
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='number'
                step='0.01'
                name='minBalance'
                placeholder='Min'
                {...register('minBalance',
                  {
                    pattern: {
                      value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    max: {
                      value: Boolean(getValues('maxBalance')) ? Number(getValues('maxBalance')) : Infinity,
                      message: 'Больше Max'
                    }
                  })
                }
              />
              {errors.minBalance && <div className={classNames('popupErrorMessage')}>{errors.minBalance.message}</div>}
            </div>
            <div className={classNames('popupInputBox', 'filterInputBox', styles.projectBox)}>
              <input
                className={!errors.maxBalance
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='number'
                step='0.01'
                name='maxBalance'
                placeholder='Max'
                {...register('maxBalance',
                  {
                    pattern: {
                      value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    min: {
                      value: Boolean(getValues('minBalance')) ? Number(getValues('minBalance')) : -Infinity,
                      message: 'Больше Min'
                    }
                  })
                }
              />
              {errors.maxBalance && <div className={classNames('popupErrorMessage')}>{errors.maxBalance.message}</div>}
            </div>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Расходы</p>
          <div className={classNames('flex', 'fromToFilter', styles.fromTo)}>
            <div className={classNames('popupInputBox', 'filterInputBox', styles.projectBox)}>
              <input
                className={!errors.minExpense
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='number'
                step='0.01'
                name='minExpense'
                placeholder='Min'
                {...register('minExpense',
                  {
                    pattern: {
                      value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    max: {
                      value: Boolean(getValues('maxExpense')) ? Number(getValues('maxExpense')) : Infinity,
                      message: 'Больше Max'
                    }
                  })
                }
              />
              {errors.minExpense && <div className={classNames('popupErrorMessage')}>{errors.minExpense.message}</div>}
            </div>
            <div className={classNames('popupInputBox', 'filterInputBox', styles.projectBox)}>
              <input
                className={!errors.maxExpense
                  ? classNames('popupInput', 'filterInput')
                  : classNames('popupInput', 'filterInput', 'popupError')}
                type='number'
                step='0.01'
                name='maxExpense'
                placeholder='Max'
                {...register('maxExpense',
                  {
                    pattern: {
                      value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                    min: {
                      value: Boolean(getValues('minExpense')) ? Number(getValues('minExpense')) : -Infinity,
                      message: 'Больше Min'
                    }
                  })
                }
              />
              {errors.maxExpense && <div className={classNames('popupErrorMessage')}>{errors.maxExpense.message}</div>}
            </div>
          </div>
        </div>
        <div className={classNames('flex', 'filterColumn')}>
          <p className={classNames('filterLabel')}>Статус</p>
          <div className={classNames('popupInputBox', 'filterInputBox')}>
            <select {...register('status')}
              className={classNames('popupInput', 'filterInput')}
            >
              <option value="">Выбрать</option>
              <option value='1'>Активен</option>
              <option value='0'>Неактивен</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  )
}
