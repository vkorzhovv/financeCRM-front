import classNames from "classnames";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './projectexpensesaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, editExpense, getExpenses } from "../../../../../redux/projectExpensesReducer";
import { selectIsFetchingExpenses } from "../../../../../redux/projectExpensesSelector";
import { editDateForInput } from "../../../../../utils/dateEditor";
import { selectMe } from "../../../../../redux/authSelectors";
import { selectSubtypes } from "../../../../../redux/cashItemSelector";
import { getSubtypes } from "../../../../../redux/cashItemReducer";
import { getItems, getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes } from "../../../../../redux/cashItemSelector";
import { getEmployees } from "../../../../../redux/usersReducer";
import { selectEmployees } from "../../../../../redux/usersSelector";

export default function ProjectExpensesAddPopup(props) {

  const dispatch = useDispatch();

  const me = useSelector(selectMe);
  const subtypesList = useSelector(selectSubtypes);
  const isFetching = useSelector(selectIsFetchingExpenses);
  const users = useSelector(selectEmployees)
  const typesList = useSelector(selectPaymentTypes);
  const createdTypes = useSelector(selectAllItems);

  const {
    clearErrors,
    setError,
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getEmployees())
      .then(() => {
        setValue('payer', props.detail ? props.expense.payer.id : me.id);
      }
      )

    const getTypes = () => {
      return (
        dispatch(getItems())
          .then(() => dispatch(getPaymentTypes()))
      )
    }

    getTypes()
      .then(() => {
        props.detail && setValue('type', props.expense && props.expense.payment_type)
      })


    if (props.detail) {
      props.expense.payment_type && dispatch(getSubtypes(props.expense.payment_type))
        .then(() => setValue('purpose', props.expense && props.expense.subtype))
    }

  }, [dispatch, setValue])

  useEffect(() => {
    getValues('type') && dispatch(getSubtypes(getValues('type')))
  }, [dispatch, getValues('type')])

  const addExpenseLocal = async (data) => {
    await dispatch(addExpense(
      data.type,
      data.purpose,
      data.date,
      data.summ,
      Number(data.payer),
      props.projectId
    ))
      .then(() => {
        dispatch(getExpenses(props.projectId))
        props.handleClickClose(false)
        document.body.classList.remove('modal-show');
      })
      .catch(err => {
        if (err.response.data) {
          setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
        } else {
          console.log(err.message)
        }
      })
  }

  const editExpenseLocal = async (data) => {
    await dispatch(editExpense(
      props.expense.id,
      data.type,
      data.purpose,
      data.date,
      data.summ,
      Number(data.payer),
      props.projectId
    ))
      .then(() => {
        dispatch(getExpenses(props.projectId))
        props.handleClickClose(false)
        document.body.classList.remove('modal-show');
      })
      .catch(err => {
        if (err.response.data) {
          setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
        } else {
          console.log(err.message)
        }
      })
  }

  const onSubmit = (data => {
    props.detail ? editExpenseLocal(data) : addExpenseLocal(data);
  })

  return createPortal((
    <div className={classNames('flex', 'popup', styles.invoicesAddPopup)}>
      <div className={classNames('popupWindow', styles.invoicesPopupWindow)}>
        <h3 className={classNames('popupHeader')}>{props.popupHeader}</h3>
        <form
          className={classNames('flex', 'popupform', styles.projectForm)}
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            clearErrors('serverError');
          }
          }
        >
          <div className={!errors.payer
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="payer">Плательщик</label>
            <select {...register('payer', {
              required: 'Выберите плательщика',
            })}
              id='payer'
              className={!errors.payer
                ? classNames('popupInput', styles.input, !me.is_superuser && 'nonTouch')
                : classNames('popupInput', 'popupError', styles.input, styles.error, !me.is_superuser && 'nonTouch')}
            >
              <option value="">Выбрать</option>
              {users && users.map(item =>
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.last_name} {item.first_name} {item.father_name}
                </option>
              )}
            </select>
            {errors.payer && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.payer.message}</div>}
          </div>
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="type">Тип расходов</label>
            <select
              {...register('type', {
                required: 'Выберите тип',
              })}
              id='type'
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {typesList && createdTypes && typesList.filter(item =>
                createdTypes.map(type => type.item_type).includes(item.type)
              )
                .map(item =>
                  <option
                    key={item.type}
                    value={item.type}>
                    {item.name}
                  </option>
                )}
            </select>
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.purpose
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="purpose">Назначение расходов</label>
            <select
              disabled={!props.detail ? !getValues('type') : !props.expense.payment_type}
              {...register('purpose', {
                required: 'Выберите назначение',
              })}
              id='purpose'
              className={!errors.purpose
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {subtypesList && subtypesList.map(item =>
                <option
                  key={item}
                  value={item}>
                  {item}
                </option>
              )}
            </select>

            {errors.purpose && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.purpose.message}</div>}
          </div>
          <div className={!errors.summ
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ">Сумма расходов</label>
            <input
              id='summ'
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ'
              defaultValue={props.detail && props.expense.amount}
              placeholder='0 &#8381;'
              {...register('summ',
                {
                  required: 'Введите сумму',
                  pattern: {
                    value: /^[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                    message: 'Минимум 1. В качестве разделителя "точка"'
                  },
                })
              }
            />
            {errors.summ && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ.message}</div>}
          </div>
          <div className={!errors.date
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="date">Дата</label>
            <input
              id='date'
              className={!errors.date
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail ? props.expense.date : editDateForInput(new Date())}
              name='date'
              {...register('date',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.date && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.date.message}</div>}
          </div>
          <div className={classNames('popupBtnsWrapper', styles.btnsWrapper)}>
            <button
              className={classNames('btn', 'btnTransparent')}
              onClick={props.handleClickClose}
              type="button"
            >
              Отменить
            </button>
            <button
              className={isFetching ? classNames('btn', 'progress') : 'btn'}
              type='submit'
              disabled={!isValid}
            >
              {isFetching ? 'Загрузка...' : props.submitText}
            </button>
          </div>
        </form>
        {errors.serverError && <div className={'errorForm'}>{errors.serverError.message}</div>}
      </div>
    </div>
  ), document.getElementById('modal_root'))
}
