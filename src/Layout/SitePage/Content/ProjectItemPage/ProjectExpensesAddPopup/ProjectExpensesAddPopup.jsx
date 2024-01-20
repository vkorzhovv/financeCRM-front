import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './projectexpensesaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addExpense, editExpense, getExpenses } from "../../../../../redux/projectExpensesReducer";
// import { getProjects } from "../../../../../redux/projectsReducer";

export default function ProjectExpensesAddPopup(props) {

  const dispatch = useDispatch();

  const {
    clearErrors,
    // setError,
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const watchType = watch('type', false)

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
        // dispatch(getProjects())
        props.handleClickClose(false)
        document.body.classList.remove('modal-show');
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
        // dispatch(getProjects())
        props.handleClickClose(false)
        document.body.classList.remove('modal-show');
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
              className={!errors.payer
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.users && props.users.map(item =>
                <option value={item.id} selected={props.detail && props.expense.payer.id && item.id === props.expense.payer.id}>{item.last_name} {item.first_name} {item.father_name}</option>
              )}
            </select>
            {errors.payer && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.payer.message}</div>}
          </div>
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="type">Тип расходов</label>
            <select
              onChange={
                props.setType(watchType)
              }
              {...register('type', {
                required: 'Выберите тип',
              })}
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.typesList && props.createdTypes && props.typesList.filter(item =>
                props.createdTypes.map(type => type.item_type).includes(item.type)
              )
                .map(item =>
                  <option value={item.type} selected={props.detail && props.expense.payment_type && item.type === props.expense.payment_type}>{item.name}</option>
                )}
            </select>
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.purpose
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="purpose">Назначение расходов</label>
            <select
              disabled={!watchType}
              {...register('purpose', {
                required: 'Выберите назначение',
              })}
              className={!errors.purpose
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.subtypesList && props.subtypesList.map(item =>
                <option value={item} selected={props.detail && props.expense.subtype && item === props.expense.subtype}>{item}</option>
              )}
            </select>

            {errors.purpose && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.purpose.message}</div>}
          </div>
          <div className={!errors.summ
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ">Сумма расходов</label>
            <input
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ'
              defaultValue={props.detail && props.expense.amount}
              placeholder='0 р'
              {...register('summ',
                {
                  required: 'Введите сумму',
                })
              }
            />
            {errors.summ && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ.message}</div>}
          </div>
          <div className={!errors.date
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Дата</label>
            <input
              className={!errors.date
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail && props.expense.date}
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
            <input
              className={classNames('btn')}
              type='submit'
              value={props.submitText}
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  ), document.getElementById('modal_root'))
}
