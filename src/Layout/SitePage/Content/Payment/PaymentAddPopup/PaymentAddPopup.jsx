import classNames from "classnames";
import React from "react";
import styles from './paymentaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addPayment, getPayments, getPaymentsInInvoice } from "../../../../../redux/paymentReducer";
import { editPayment, getPaymentItem } from "../../../../../redux/paymentItemReducer";
import { getInvoiceItem } from "../../../../../redux/invoiceItemReducer";
import { editFileName } from "../../../../../utils/fileNameEditor";

export default function PaymentAddPopup(props) {

  const dispatch = useDispatch();

  const {
    clearErrors,
    // setError,
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  function arrayFiles(list) {
    const arr = [];
    for (let key in list) {
      arr.push(list[key])
    }
    return arr.slice(0, -2);
  }

  const addPaymentLocal = async (data) => {
    await dispatch(addPayment(
      data.date,
      data.summ_plus,
      false,
      data.check || props.invoice.id,
      data.description || 'Нет комментария',
      arrayFiles(data.scans)
    ))
      .then(() => {
        !props.invoicePage && dispatch(getPayments());
        !props.invoicePage && props.close(false);
        !props.invoicePage && document.body.classList.remove('modal-show');
        props.invoicePage && dispatch(getPaymentsInInvoice(props.invoice.id));
        props.invoicePage && reset();
      })
  }
  const editPaymentLocal = async (data) => {
    await dispatch(editPayment(
      props.payment.id,
      data.date,
      data.summ_plus,
      Boolean(Number(data.status)),
      data.check,
      data.description,
      arrayFiles(data.scans)
    ))
      .then(() => {
        !props.invoicePage && dispatch(getPaymentItem(props.payment.id))
        !props.invoicePage && props.invoice && dispatch(getPaymentsInInvoice(props.invoice.id));
        !props.invoicePage && props.invoice && dispatch(getInvoiceItem(props.invoice.id))
        props.close(false);
        document.body.classList.remove('modal-show');
      })
  }

  const onSubmit = (data => {
    props.detail ? editPaymentLocal(data) : addPaymentLocal(data);
  })

  return (
    <div className={classNames('flex', props.isStatic ? styles.paymentAddPopupStatic : 'popup')}>
      <div className={classNames(props.isStatic ? styles.paymentPopupStaticWindow : 'popupWindow')}>
        <h3 className={classNames(props.isStatic ? styles.popupHeaderStatic : 'popupHeader')}>{props.popupHeader}</h3>
        <form
          className={classNames('flex', 'popupform', styles.paymentForm)}
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            clearErrors('serverError');
          }
          }
        >
          {!props.isStatic &&
            <div className={!errors.check
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel')} htmlFor="check">Счет</label>
              <select {...register('check', {
                required: 'Выберите счет',
              })}
                className={!errors.check
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
              >
                <option value="">Выбрать</option>
                {props.invoicesList && props.invoicesList.map(item =>
                  <option value={item.id} selected={props.detail && props.payment.invoice && item.id === props.payment.invoice.id}>Счет № {item.id + 10000}</option>
                )}
              </select>
              {errors.check && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.check.message}</div>}
            </div>
          }

          <div className={!errors.summ_plus
            ? classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox')
            : classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ_plus">Сумма начислено</label>
            <input
              className={!errors.summ_plus
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ_plus'
              defaultValue={props.detail && props.payment.total}
              placeholder='0 р'
              {...register('summ_plus',
                {
                  required: 'Введите сумму',
                })
              }
            />
            {errors.summ_plus && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ_plus.message}</div>}
          </div>
          <div className={!errors.date
            ? classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox')
            : classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Дата начисления</label>
            <input
              className={!errors.date
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail && props.payment.date}
              name='date'
              {...register('date',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.date && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.date.message}</div>}
          </div>
          {props.detail &&
            <div className={!errors.status
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="status">Статус платежа</label>
              <select {...register('status', {
                required: 'Выберите статус',
              })}
                className={!errors.status
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
              >
                <option value="">Выбрать</option>
                <option value='1' selected={props.detail && props.payment.approved}>Оплачен</option>
                <option value='0' selected={props.detail && !props.payment.approved}>Не оплачен</option>
              </select>
              {errors.status && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.status.message}</div>}
            </div>
          }

          {props.detail && (props.payment.scans && props.payment.scans.length) > 0 &&
            <div className={classNames('flex', 'popupInputBox')}>
              <p className={classNames('popupLabel', styles.projectLabel)}>Загруженные файлы:</p>
              {props.payment.scans.map((item, index) =>
                <a
                  key={item.id}
                  href={item.scan}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className={styles.attachmentFieldDocument}>
                  Файл {index + 1}{editFileName(item.scan)}
                </a>
              )}
            </div>
          }

          <div className={!errors.scans
            ? classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox')
            : classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Скан/фото документа</label>
            <input
              className={!errors.scans
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='file'
              multiple
              name='scans'
              {...register('scans')}
            />
            {errors.scans && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.scans.message}</div>}
          </div>

          {!props.isStatic &&
            <div className={!errors.description
              ? classNames('popupInputBox', styles.inputBox)
              : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <textarea
                className={!errors.description
                  ? classNames('popupInput', 'popupTextarea', styles.input)
                  : classNames('popupInput', 'popupError', 'popupTextarea', styles.input, styles.error)}
                type={'text'}
                name='description'
                defaultValue={props.detail && props.payment.comment}
                placeholder='Комментарий'
                {...register('description',
                  {
                    required: 'Введите комментарий',
                  })}
              ></textarea>
              {errors.description && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.description.message}</div>}
            </div>
          }

          <div className={classNames('popupBtnsWrapper', styles.btnsWrapper)}>
            {!props.isStatic &&
              <button
                className={classNames('btn', 'btnTransparent')}
                onClick={props.handleClickClose}
                type="button"
              >
                Отменить
              </button>
            }
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
  )
}
