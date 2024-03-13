import classNames from "classnames";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './invoicesaddpopup.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, getInvoices, getProjectExpenses, getProjectInvoices, getProjectReceipts } from "../../../../../redux/invoicesReducer";
import { editInvoice, getInvoiceItem } from "../../../../../redux/invoiceItemReducer";
import { selectIsFetchingAddInvoice } from "../../../../../redux/invoicesSelector";
import { selectIsFetchingEditInvoice } from "../../../../../redux/invoiceItemSelector";
import { editDateForInput } from "../../../../../utils/dateEditor";
import { selectMe } from "../../../../../redux/authSelectors";
import { selectSubtypes } from "../../../../../redux/cashItemSelector";
import { getSubtypes } from "../../../../../redux/cashItemReducer";
import { getProjects } from "../../../../../redux/projectsReducer";
import { selectProjects } from "../../../../../redux/projectsSelector";
import { selectAllUsers } from "../../../../../redux/usersSelector";
import { getUsers } from "../../../../../redux/usersReducer";
import { getItems, getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes } from "../../../../../redux/cashItemSelector";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { useState } from "react";

export default function InvoicesAddPopup(props) {

  const {
    clearErrors,
    setError,
    register,
    getValues,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const me = useSelector(selectMe);
  const isFetchingAdd = useSelector(selectIsFetchingAddInvoice);
  const isFetchingEdit = useSelector(selectIsFetchingEditInvoice);
  const subtypesList = useSelector(selectSubtypes);
  const usersList = useSelector(selectAllUsers);
  const projectsList = useSelector(selectProjects);
  const typesList = useSelector(selectPaymentTypes);
  const createdTypes = useSelector(selectAllItems);

  let optionsUsers = [];
  usersList?.map((item) => {
    optionsUsers.push({
      value: `${item?.id}`, label: `${item?.last_name} ${item?.first_name} ${item?.father_name}`
    })
  })

  let optionsProjects = [];
  projectsList?.map((item) => {
    optionsProjects.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  let optionsTypes = [];
  typesList?.filter(item =>
    createdTypes.map(type => type.item_type).includes(item.type)
  ).map((item) => {
    optionsTypes.push({
      value: `${item?.type}`, label: `${item?.name}`
    })
  })

  let optionsSubtypes = [];
  subtypesList?.map((item) => {
    optionsSubtypes.push({
      value: `${item}`, label: `${item}`
    })
  })

  useEffect(() => {

    dispatch(getUsers())
      .then(() => {
        if (!props.detail && props.projectReceipt) {
          setValue('payer', String(props.projectClient));
        }

        if (!props.detail && !props.projectReceipt) {
          setValue('payer', String(me.id));
        }

        if (props.detail) {
          setValue('payer', String(props.invoice.payer?.id));
        }

        props.detail && setValue('receiver', String(props.invoice.receiver?.id));
      })

    dispatch(getProjects())
      .then(() => {
        props.detail && setValue('project', String(props.invoice?.project?.id));
      })

    const getTypes = () => {
      return (
        dispatch(getItems())
          .then(() => dispatch(getPaymentTypes()))
      )
    }

    getTypes()
      .then(() => {
        props.detail && setValue('type', String(props.invoice?.payment_type));
      })


    if (props.detail) {
      dispatch(getSubtypes(props.invoice?.payment_type))
        .then(() => setValue('purpose', props.invoice?.subtype))
      console.log('да ты заебал', props.invoice?.subtype)
    }

  }, [dispatch, setValue])

  const watchType = watch('type');

  useEffect(() => {
    watchType && dispatch(getSubtypes(watchType))
  }, [dispatch, watchType])

  const addInvoiceLocal = (data) => {
    dispatch(addInvoice(
      data.description,
      false,
      data.type,
      data.purpose,
      Number(data.payer),
      Number(data.receiver),
      props.projectId || Number(data.project),
      data.summ,
      data.date,
    ))
      .then((response) => {
        (!props.projectReceipt && !props.projectExpense) && dispatch(getInvoices())
        props.projectReceipt && dispatch(getProjectReceipts(props.projectId))
        props.projectExpense && dispatch(getProjectExpenses(props.projectId))
        props.close(false)
        document.body.classList.remove('modal-show');
        navigate(`/invoices/${response?.data?.id}`)
      })
      .catch(err => {
        if (err.response.data) {
          setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
        } else {
          console.log(err.message)
        }
      })
  }

  const editInvoiceLocal = (data) => {
    dispatch(editInvoice(
      props.invoice.id,
      data.description,
      Boolean(Number(data.status)),
      data.type,
      data.purpose,
      Number(data.payer),
      Number(data.receiver),
      props.projectId || Number(data.project),
      data.summ,
      data.date,
    ))
      .then(() => {
        (!props.projectReceipt && !props.projectExpense) && dispatch(getInvoiceItem(props.invoice.id))
        props.projectReceipt && dispatch(getProjectReceipts(props.projectId))
        props.projectExpense && dispatch(getProjectExpenses(props.projectId))
        props.close(false)
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
          }}
        >
          <div className={!errors.payer
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Плательщик</label>
            <Controller
              control={control}
              name='payer'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  isDisabled={!me.is_superuser || props.projectReceipt}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={props.projectReceipt
                    ?
                    optionsUsers
                    :
                    optionsUsers.filter(item => item.value !== String(props.projectClient))}
                  value={value ? optionsUsers.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
              rules={{ required: 'Выберите плательщика' }}
            />
            {errors.payer && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.payer.message}</div>}
          </div>
          <div className={!errors.receiver
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Получатель</label>
            <Controller
              control={control}
              name='receiver'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsUsers}
                  value={value ? optionsUsers.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
              rules={{ required: 'Выберите получателя' }}
            />
            {errors.receiver && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.receiver.message}</div>}
          </div>
          {
            !props.projectId &&
            <div className={!errors.project
              ? classNames('flex', 'popupInputBox')
              : classNames('flex', 'popupInputBox', 'popupBoxError')}>
              <label className={classNames('popupLabel')}>Проект</label>
              <Controller
                control={control}
                name='project'
                render={({ field: { value, onChange } }) => (
                  <Select
                    isClearable={true}
                    placeholder='Выбрать'
                    classNamePrefix="react-select"
                    className={classNames('react-select-container')}
                    options={optionsProjects}
                    value={value ? optionsProjects.find((с) => с.value === value) : ''}
                    onChange={(val) => onChange(val?.value)}
                  />
                )}
                rules={{ required: 'Выберите проект' }}
              />
              {errors.project && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.project.message}</div>}
            </div>
          }
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Тип начисления</label>
            <Controller
              control={control}
              name='type'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsTypes}
                  value={value ? optionsTypes.find((с) => с.value === value) : ''}
                  onChange={(val) => {
                    onChange(val?.value)
                    setValue('purpose', '')
                  }}
                />
              )}
              rules={{ required: 'Выберите тип' }}
            />
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.purpose
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Тип начисления</label>
            <Controller
              control={control}
              name='purpose'
              render={({ field: { value, onChange } }) => (
                <Select
                  isDisabled={!props.detail ? !getValues('type') : !props.invoice?.payment_type}
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsSubtypes}
                  value={value ? optionsSubtypes.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
              rules={{ required: 'Выберите тип' }}
            />
            {errors.purpose && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.purpose.message}</div>}
          </div>
          <div className={!errors.summ
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ">Сумма счета</label>
            <input
              id='summ'
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='number'
              step='0.01'
              name='summ'
              defaultValue={props.detail && props.invoice.amount}
              placeholder='0 &#8381;'
              {...register('summ',
                {
                  required: 'Введите сумму',
                  pattern: {
                    value: /^[0]{1}$|^[0]{1}[.]([0-9]{0,2})$|^[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                    message: 'Неверный ввод'
                  },
                })
              }
            />
            {errors.summ && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ.message}</div>}
          </div>
          <div className={!errors.date
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="date">Дата выставления</label>
            <input
              id='date'
              className={!errors.date
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail ? props.invoice.date : editDateForInput(new Date())}
              name='date'
              {...register('date',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.date && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.date.message}</div>}
          </div>
          {props.remainder <= (0).toFixed(2) && props.invoice.amount !== (0).toFixed(2) && me.is_superuser &&
            <div className={!errors.status
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="status">Статус</label>
              <select {...register('status', {
                required: 'Выберите статус',
              })}
                id='status'
                className={!errors.status
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
                defaultValue={props.detail && String(Number(props.invoice.approved))}
              >
                <option value='1'>Подтвержден</option>
                <option value='0'>Не подтвержен</option>
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
      </div >
    </div >
  ), document.getElementById('modal_root'))
}
