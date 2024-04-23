import classNames from "classnames";
import React, { useState } from "react";
import styles from './paymentaddpopup.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, getPayments, getPaymentsInInvoice } from "../../../../../redux/paymentReducer";
import { editPayment, getPaymentItem } from "../../../../../redux/paymentItemReducer";
import { getInvoiceItem } from "../../../../../redux/invoiceItemReducer";
import { editFileName, editFileNameFull } from "../../../../../utils/fileNameEditor";
import { selectIsFetchingAddPayment } from "../../../../../redux/paymentSelector";
import { selectIsFetchingEditPayment } from "../../../../../redux/paymentItemSelector";
import { editDateForInput } from "../../../../../utils/dateEditor";
import LoadingIcon from "../../../../../svgIcons/loading";
import { selectInvoiceItem } from "../../../../../redux/invoiceItemSelector";
import { useEffect } from "react";
import { getUnapprovedInvoices, getUserInvoices } from "../../../../../redux/invoicesReducer";
import { selectUnapprovedInvoices } from "../../../../../redux/invoicesSelector";
import { selectMe } from "../../../../../redux/authSelectors";
import { getMe } from "../../../../../redux/authReducer";
import Select from 'react-select';

export default function PaymentAddPopup(props) {

  const [filesList, setFilesList] = useState(((props.detail && props.payment.scans) && props.payment.scans.slice()) || []);

  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const isFetchingAdd = useSelector(selectIsFetchingAddPayment);
  const isFetchingEdit = useSelector(selectIsFetchingEditPayment);
  const invoice = useSelector(selectInvoiceItem);
  const invoicesList = useSelector(selectUnapprovedInvoices);

  let optionsCheck = [];
  invoicesList?.map((item) => {
    optionsCheck.push({
      value: `${item?.id}`, label: `Счет № ${item.id + 10000}`
    })
  })

  const optionsStatus = [{ value: '1', label: 'Оплачен' }, { value: '0', label: 'Неоплачен' }];

  const {
    clearErrors,
    setError,
    control,
    register,
    reset,
    watch,
    setValue,
    setFocus,
    handleSubmit,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    !props.isStatic &&
      dispatch(getUnapprovedInvoices())
        .then(() => {
          props.detail && setValue('check', String(props.payment.invoice.id));
        })

    if (props.detail) {
      dispatch(getInvoiceItem(props.payment.invoice.id))
    }

    props.detail && setValue('status', String(Number(props.payment.approved)))

    me?.user_type !== 's' && dispatch(getUserInvoices(me.id))
  }, [dispatch, setValue])

  const watchCheck = watch('check');

  useEffect(() => {
    watchCheck && dispatch(getInvoiceItem(watchCheck));
  }, [dispatch, watchCheck])

  function arrayFiles(list) {
    const arr = [];
    for (let key in list) {
      arr.push(list[key])
    }
    return arr.slice(0, -2);
  }

  const handleDeleteFile = (arr, item) => {
    const filtered = arr.filter((el) => el.id !== item.id)
    setFilesList(filtered);
  }

  const addPaymentLocal = (data) => {
    dispatch(addPayment(
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
        props.invoicePage && dispatch(getInvoiceItem(props.invoice.id));
        props.invoicePage && reset();
      })
      .catch(err => {
        if (err.response.data) {
          setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
        } else {
          console.log(err.message)
        }
      })
  }
  const editPaymentLocal = (data) => {
    dispatch(editPayment(
      props.payment.id,
      data.date,
      data.summ_plus,
      Boolean(Number(data.status)),
      data.check,
      data.description,
      arrayFiles(data.scans).concat(filesList)
    ))
      .then(() => {
        !props.invoicePage && dispatch(getPaymentItem(props.payment.id))
        !props.invoicePage && props.invoice && dispatch(getPaymentsInInvoice(props.invoice.id));
        !props.invoicePage && props.invoice && dispatch(getInvoiceItem(props.invoice.id))
        dispatch(getMe());
        props.close(false);
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
              <label className={classNames('popupLabel')}>Счет</label>
              <Controller
                control={control}
                name='check'
                render={({ field: { value, onChange } }) => (
                  <Select
                    isClearable={true}
                    isDisabled={me?.user_type !== 's'}
                    placeholder='Выбрать'
                    classNamePrefix="react-select"
                    className={classNames('react-select-container')}
                    options={optionsCheck}
                    value={value ? optionsCheck.find((с) => с.value === value) : ''}
                    onChange={(val) => onChange(val?.value)}
                  />
                )}
                rules={{ required: 'Выберите счет' }}
              />

              {errors.check && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.check.message}</div>}
            </div>
          }

          {!props.isStatic && (!props.detail ? watchCheck : props.payment.invoice) &&
            <div className={classNames('flex', 'popupInputBox')}>
              <p className={classNames('popupLabel', styles.projectLabel)}>Остаток по счету:</p>
              <div className={classNames('flex', styles.filesContainer)}>
                {(invoice.amount - invoice.receipts).toFixed(2)}&nbsp;&#8381;
              </div>
            </div>
          }

          <div className={!errors.summ_plus
            ? classNames('flex', props.isStatic && styles.inputBoxStatic, 'popupInputBox')
            : classNames('flex', props.isStatic && styles.inputBoxStatic, 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ_plus">Сумма начислено</label>
            <input
              id='summ_plus'
              className={!errors.summ_plus
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='number'
              step='0.01'
              name='summ_plus'
              defaultValue={props.detail && props.payment.total}
              placeholder='0 &#8381;'
              {...register('summ_plus',
                {
                  required: 'Введите сумму',
                  pattern: {
                    value: /^[0]{1}$|^[0]{1}[.]([0-9]{0,2})$|^[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                    message: 'Неверный ввод'
                  },
                })
              }
            />
            {(props.invoicePage && props.remainder > 0) &&
              <button
                onClick={() => {
                  setFocus('summ_plus')
                  setValue('summ_plus', props.remainder)
                }}
                type='button'
                className={classNames('btn', styles.fullBtn)}>
                Полная оплата
              </button>
            }
            {errors.summ_plus && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ_plus.message}</div>}
          </div>
          <div className={!errors.date
            ? classNames('flex', props.isStatic && styles.inputBoxStatic, 'popupInputBox')
            : classNames('flex', props.isStatic && styles.inputBoxStatic, 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="date">Дата начисления</label>
            <input
              id='date'
              className={!errors.date
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail ? props.payment.date : editDateForInput(new Date())}
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
              <Controller
                control={control}
                name='status'
                render={({ field: { value, onChange } }) => (
                  <Select
                    isClearable={true}
                    isSearchable={false}
                    placeholder='Выбрать'
                    classNamePrefix="react-select"
                    className={classNames('react-select-container')}
                    options={optionsStatus}
                    value={value ? optionsStatus.find((с) => с.value === value) : ''}
                    onChange={(val) => onChange(val?.value)}
                  />
                )}
                rules={{ required: 'Выберите статус' }}
              />

              {errors.status && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.status.message}</div>}
            </div>
          }

          {props.detail && (filesList && filesList.length > 0) &&
            <div className={classNames('flex', 'popupInputBox')}>
              <p className={classNames('popupLabel', styles.projectLabel)}>Загруженные файлы:</p>
              <div className={classNames('flex', styles.filesContainer)}>
                {filesList.map((item) =>
                  <div
                    key={item.id}
                    className={classNames('flex', styles.fileBox)}
                  >
                    <a
                      href={item.scan}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className={styles.attachmentFieldDocument}>
                      {editFileNameFull(item.scan)}
                    </a>

                    <button
                      onClick={() => handleDeleteFile(filesList, item)}
                      type="button"
                      className={classNames('flex', styles.deleteFileBtn)}
                    >
                      <span className={classNames(styles.horLine, styles.line)}></span>
                      <span className={classNames(styles.verLine, styles.line)}></span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          }

          <div className={!errors.scans
            ? classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox', styles.scansBox)
            : classNames('flex', props.isStatic ? styles.inputBoxStatic : 'popupInputBox', 'popupBoxError', styles.boxError, styles.scansBox)}>
            <label
              onClick={(e) => {
                console.log('label');
                e.stopPropagation()
              }}
              className={classNames('flex', styles.fileLabel)}
              htmlFor="scans">
              <p className={styles.labelText}>Скан/фото документа</p>
              <div className={classNames('flex', 'popupInput', styles.inputHalf, styles.inputFile)}>Добавить файл    <LoadingIcon /></div>

              {arrayFiles(getValues('scans')).length ?
                <span className={styles.fileName}>
                  {
                    arrayFiles(getValues('scans')).length === 1 ?
                      arrayFiles(getValues('scans'))[0].name :
                      `Загружено файлов: ${arrayFiles(getValues('scans')).length}`
                  }
                </span>
                :
                <span className={styles.fileName}>

                </span>
              }
            </label>
            <input
              id='scans'
              className={!errors.scans
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='file'
              multiple
              accept=".pdf, .jpg, .jpeg, .png"
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
            <button
              className={(isFetchingAdd || isFetchingEdit) ? classNames('btn', 'progress') : 'btn'}
              type='submit'
              disabled={!isValid}
            >
              {(isFetchingAdd || isFetchingEdit) ? 'Загрузка...' : props.submitText}
            </button>
          </div>
        </form>
        {errors.serverError && <div className={'errorForm'}>{errors.serverError.message}</div>}
      </div>
    </div>
  )
}
