import classNames from "classnames";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './invoicesaddpopup.module.css';
import { useForm } from 'react-hook-form';
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
import { selectAllUsers, selectEmployees } from "../../../../../redux/usersSelector";
import { getEmployees, getUsers } from "../../../../../redux/usersReducer";
import { getItems, getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes } from "../../../../../redux/cashItemSelector";

export default function InvoicesAddPopup(props) {

  const dispatch = useDispatch();

  const me = useSelector(selectMe);
  const isFetchingAdd = useSelector(selectIsFetchingAddInvoice);
  const isFetchingEdit = useSelector(selectIsFetchingEditInvoice);
  const subtypesList = useSelector(selectSubtypes);
  const usersList = useSelector(selectAllUsers);
  // const employeesList = useSelector(selectEmployees);
  const projectsList = useSelector(selectProjects);
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
    dispatch(getUsers())
      .then(() => {
        if (!props.detail && props.projectReceipt) {
          setValue('payer', props.projectClient);
        }
        if (!props.detail && !props.projectReceipt) {
          setValue('payer', me.id);
        }

        if (props.detail) {
          setValue('payer', props.invoice.payer && props.invoice.payer.id);
        }

        props.detail && setValue('receiver', props.invoice.receiver && props.invoice.receiver.id);
      })
    dispatch(getProjects())
      .then(() => {
        props.detail && setValue('project', props.invoice.project.id);
      })

    const getTypes = () => {
      return (
        dispatch(getItems())
          .then(() => dispatch(getPaymentTypes()))
      )
    }

    getTypes()
      .then(() => {
        props.detail && setValue('type', props.invoice.payment_type);
      })


    if (props.detail) {
      props.invoice.payment_type &&
        dispatch(getSubtypes(props.invoice.payment_type))
          .then(() => setValue('purpose', props.invoice.subtype && props.invoice.subtype))
    }

  }, [dispatch, setValue])

  useEffect(() => {
    getValues('type') && dispatch(getSubtypes(getValues('type')))
  }, [dispatch, getValues('type')])

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
      .then(() => {
        (!props.projectReceipt && !props.projectExpense) && dispatch(getInvoices())
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
                ? classNames('popupInput', styles.input, (!me.is_superuser || props.projectReceipt) && 'nonTouch')
                : classNames('popupInput', 'popupError', styles.input, styles.error, (!me.is_superuser || props.projectReceipt) && 'nonTouch')}
            >
              <option value="">Выбрать</option>
              {props.projectReceipt ?
                usersList && usersList.map(item =>
                  <option
                    value={item.id}
                    key={item.id}>
                    {item.last_name} {item.first_name} {item.father_name}
                  </option>
                )
                :
                usersList && usersList.filter(item => item.id !== props.projectClient).map(item =>
                  <option
                    value={item.id}
                    key={item.id}>
                    {item.last_name} {item.first_name} {item.father_name}
                  </option>
                )
              }
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
              id='receivers'
              className={!errors.receiver
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {usersList && usersList.map(item =>
                <option
                  key={item.id}
                  value={item.id}
                >{item.last_name} {item.first_name} {item.father_name}
                </option>
              )}
            </select>
            {errors.receiver && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.receiver.message}</div>}
          </div>
          {
            !props.projectId &&
            <div className={!errors.project
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel')} htmlFor="project">Проект</label>
              <select {...register('project', {
                required: 'Выберите проект',
              })}
                id='project'
                className={!errors.projects
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
              >
                <option value="">Выбрать</option>
                {projectsList && projectsList.map(item =>
                  <option
                    value={item.id}
                    key={item.id}>
                    {item.name}
                  </option>
                )}
              </select>
              {errors.project && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.project.message}</div>}
            </div>
          }
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="type">Тип начисления</label>
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
            <label className={classNames('popupLabel')} htmlFor="purpose">Назначение начисления</label>
            <select
              disabled={!props.detail ? !getValues('type') : !props.invoice.payment_type}
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
                  value={item}
                  key={item}>
                  {item}
                </option>
              )}
            </select>

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
              type='text'
              name='summ'
              defaultValue={props.detail && props.invoice.amount}
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
