import classNames from "classnames";
import React from "react";
import styles from './paymentaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addPayment, getPayments } from "../../../../../redux/paymentReducer";
import { editPayment } from "../../../../../redux/paymentItemReducer";


export default function PaymentAddPopup(props) {

  const dispatch = useDispatch();

  const {
    clearErrors,
    // setError,
    register,
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
      data.check,
      data.description,
      arrayFiles(data.scan)
    ))
      .then(() => {
        console.log(
          arrayFiles(data.scan)
        )
        dispatch(getPayments());
        props.close(false);
        document.body.classList.remove('modal-show');
      })
  }
  const editPaymentLocal = (data) => {
    dispatch(editPayment(
      props.payment.id,
      data.date,
      data.summ_plus,
      Boolean(Number(data.status)),
      data.check,
    ));
    props.close(false);
    document.body.classList.remove('modal-show');
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
          {/* {props.detail &&
            <div className={!errors.summ_minus
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ_minus">Сумма оплачено</label>
              <input
                className={!errors.summ_minus
                  ? classNames('popupInput', styles.inputHalf, styles.input)
                  : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
                type='text'
                name='summ_minus'
                // defaultValue={props.detail && props.project.price}
                placeholder='0 р'
                {...register('summ_minus',
                  {
                    required: 'Введите сумму',
                  }
                )}
              />
              {errors.summ_minus && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ_minus.message}</div>}
            </div>
          } */}
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
          <div className={!errors.scan
            ? classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox')
            : classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Скан/фото документа</label>
            <input
              className={!errors.scan
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='file'
              multiple
              // defaultValue={props.detail && props.project.start_date}
              name='scan'
              {...register('scan',
                {
                  required: 'Выберите документ',
                })
              }
            />
            {errors.scan && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.scan.message}</div>}
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
