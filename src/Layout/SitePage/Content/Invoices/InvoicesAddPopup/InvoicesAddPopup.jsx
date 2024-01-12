import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './invoicesaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addInvoice, getInvoices } from "../../../../../redux/invoicesReducer";
import { editInvoice, getInvoiceItem } from "../../../../../redux/invoiceItemReducer";

export default function InvoicesAddPopup(props) {

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

  const addInvoiceLocal = async (data) => {
    await dispatch(addInvoice(
      data.description,
      false,
      data.type,
      data.purpose,
      Number(data.payer),
      Number(data.receiver),
      Number(data.project),
      data.summ,
      data.date,
    ))
      .then(() => {
        dispatch(getInvoices())
        props.close(false)
        document.body.classList.remove('modal-show');
      })
  }

  const editInvoiceLocal = async (data) => {
    await dispatch(editInvoice(
      props.invoice.id,
      data.description,
      Boolean(Number(data.status)),
      data.type,
      data.purpose,
      Number(data.payer),
      Number(data.receiver),
      Number(data.project),
      data.summ,
      data.date,
    ))
      .then(() => {
        dispatch(getInvoiceItem(props.invoice.id))
        props.close(false)
        document.body.classList.remove('modal-show');
      })
  }

  const onSubmit = (data => {
    props.detail ? editInvoiceLocal(data) : addInvoiceLocal(data);
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
              {props.payersList && props.payersList.map(item =>
                <option value={item.id} selected={props.detail && props.invoice.payer.id && item.id === props.invoice.payer.id}>{item.last_name} {item.first_name} {item.father_name}</option>
              )}
            </select>
            {errors.payer && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.payer.message}</div>}
          </div>
          <div className={!errors.receiver
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="receivers">Получатель</label>
            <select {...register('receiver', {
              required: 'Выберите получателя',
            })}
              className={!errors.receiver
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.receiversList && props.receiversList.map(item =>
                <option value={item.id} selected={props.detail && props.invoice.receiver.id && item.id === props.invoice.receiver.id}>{item.last_name} {item.first_name} {item.father_name}</option>
              )}
            </select>
            {errors.receiver && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.receiver.message}</div>}
          </div>
          <div className={!errors.project
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="project">Проект</label>
            <select {...register('project', {
              required: 'Выберите проект',
            })}
              className={!errors.projects
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.projectsList && props.projectsList.map(item =>
                <option value={item.id} selected={props.detail && props.invoice.project.id && item.id === props.invoice.project.id}>{item.name}</option>
              )}
            </select>
            {errors.project && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.project.message}</div>}
          </div>
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="type">Тип начисления</label>
            <select
              onChange={
                props.setTypeId(watchType)
              }
              {...register('type', {
                required: 'Выберите тип',
              })}
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.typesList && props.typesList.map(item =>
                <option value={item.id} selected={props.detail && props.invoice.payment_type && item.id === props.invoice.payment_type.id}>{item.name}</option>
              )}
            </select>
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.purpose
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="purpose">Назначение начисления</label>
            <select
              disabled={!watchType}
              {...register('purpose', {
                required: 'Выберите тип',
              })}
              className={!errors.purpose
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.subtypesList && props.subtypesList.map(item =>
                <option value={item.id} selected={props.detail && props.invoice.subtype && item.id === props.invoice.subtype.id}>{item.name}</option>
              )}
            </select>

            {errors.purpose && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.purpose.message}</div>}
          </div>
          <div className={!errors.summ
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ">Сумма счета</label>
            <input
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ'
              defaultValue={props.detail && props.invoice.amount}
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
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Дата выставления</label>
            <input
              className={!errors.date
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail && props.invoice.date}
              name='date'
              {...register('date',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.date && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.date.message}</div>}
          </div>
          {props.remainder === (0).toFixed(2) &&
            <div className={!errors.status
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="status">Статус</label>
              <select {...register('status', {
                required: 'Выберите статус',
              })}
                className={!errors.status
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
              >
                {/* <option value="">Выбрать</option> */}
                <option value='1' selected={props.detail && props.invoice.approved}>Подтвержден</option>
                <option value='0' selected={props.detail && !props.invoice.approved}>Не подтвержен</option>
              </select>
              {errors.status && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.status.message}</div>}
            </div>
          }
          <div className={!errors.description
            ? classNames('popupInputBox', styles.inputBox)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <textarea
              className={!errors.description
                ? classNames('popupInput', 'popupTextarea', styles.input)
                : classNames('popupInput', 'popupError', 'popupTextarea', styles.input, styles.error)}
              type={'text'}
              name='description'
              defaultValue={props.detail && props.invoice.comment}
              placeholder='Комментарий'
              {...register('description',
                {
                  required: 'Введите комментарий',
                })}
            ></textarea>
            {errors.description && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.description.message}</div>}
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
