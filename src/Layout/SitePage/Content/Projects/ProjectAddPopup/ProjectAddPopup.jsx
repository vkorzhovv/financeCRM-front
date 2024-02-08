import classNames from "classnames";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './projectaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, getProjects } from "../../../../../redux/projectsReducer";
import { editProject } from "../../../../../redux/projectItemReducer";
import { selectIsFetchingAddProjects } from "../../../../../redux/projectItemSelector";
import { selectIsFetchingEditProjects } from "../../../../../redux/projectsSelector";
import { getClients, getEmployees } from "../../../../../redux/usersReducer";
import { selectClients, selectEmployees } from "../../../../../redux/usersSelector";

export default function ProjectAddPopup(props) {

  const dispatch = useDispatch();
  const isFetchingAdd = useSelector(selectIsFetchingAddProjects);
  const isFetchingEdit = useSelector(selectIsFetchingEditProjects);
  const employees = useSelector(selectEmployees);
  const clients = useSelector(selectClients);

  const {
    clearErrors,
    setError,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getClients())
      .then(() => {
        props.detail && setValue('client', props.project.client && props.project.client.id);
      }
      )
    dispatch(getEmployees())
      .then(() => {
        props.detail && setValue('manager', props.project.project_manager && props.project.project_manager.id);
        props.detail && setValue('foreman', props.project.foreman && props.project.foreman.id);
      }
      )
  }, [dispatch, setValue])

  const addProjectLocal = (data) => {
    dispatch(addProject(
      data.name,
      data.description,
      data.start,
      data.end,
      data.summ,
      Boolean(Number(data.status)),
      Number(data.manager),
      Number(data.client),
      Number(data.foreman)))
      .then(() => {
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
  const editProjectLocal = (data) => {
    dispatch(editProject(
      props.project.id,
      data.name,
      data.description,
      data.start,
      data.end,
      data.summ,
      Boolean(Number(data.status)),
      Number(data.manager),
      Number(data.client),
      Number(data.foreman)))
      .then(() => {
        props.close(false)
        document.body.classList.remove('modal-show');
        dispatch(getProjects());
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
    props.detail ? editProjectLocal(data) : addProjectLocal(data);
  })

  return createPortal((
    <div className={classNames('flex', 'popup', styles.projectAddPopup)}>
      <div className={classNames('popupWindow', styles.projectPopupWindow)}>
        <h3 className={classNames('popupHeader')}>{props.popupHeader}</h3>
        <form
          className={classNames('flex', 'popupform', styles.projectForm)}
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            clearErrors('serverError');
          }
          }
        >
          <div className={!errors.name
            ? classNames('popupInputBox', styles.inputBox)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <input
              className={!errors.name
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='name'
              defaultValue={props.detail && props.project.name}
              placeholder='Название'
              {...register('name',
                {
                  required: 'Введите название проекта',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов'
                  },
                })}
            />
            {errors.name && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.name.message}</div>}
          </div>
          <div className={!errors.description
            ? classNames('popupInputBox', styles.inputBox)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <textarea
              className={!errors.description
                ? classNames('popupInput', 'popupTextarea', styles.input)
                : classNames('popupInput', 'popupError', 'popupTextarea', styles.input, styles.error)}
              type={'text'}
              name='description'
              defaultValue={props.detail && props.project.description}
              placeholder='Описание'
              {...register('description',
                {
                  required: 'Введите описание',
                })}
            ></textarea>
            {errors.description && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.description.message}</div>}
          </div>
          <div className={!errors.manager
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="manager">Менеджер</label>
            <select {...register('manager', {
              required: 'Выберите менеджера',
            })}
              id='manager'
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {employees && employees.map(item =>
                <option
                  key={item.id}
                  value={item.id}>
                  {item.last_name} {item.first_name} {item.father_name}
                </option>
              )}
            </select>

            {errors.manager && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.manager.message}</div>}
          </div>
          <div className={!errors.client
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="client">Клиент</label>
            <select {...register('client', {
              required: 'Выберите клиента',
            })}
              id='client'
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {clients && clients.map(item =>
                <option
                  key={item.id}
                  value={item.id}>
                  {item.last_name} {item.first_name} {item.father_name}
                </option>
              )}
            </select>

            {errors.client && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.client.message}</div>}
          </div>
          <div className={!errors.foreman
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="foreman">Прораб</label>
            <select {...register('foreman', {
              required: 'Выберите прораба',
            })}
              id='foreman'
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {employees && employees.map(item =>
                <option
                  key={item.id}
                  value={item.id}>
                  {item.last_name} {item.first_name} {item.father_name}
                </option>
              )}
            </select>
            {errors.foreman && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.foreman.message}</div>}
          </div>
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
              defaultValue={props.detail && String(Number(props.project.active))}
            >
              <option value="">Выбрать</option>
              <option value='1'>Активен</option>
              <option value='0'>Неактивен</option>
            </select>

            {errors.status && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.status.message}</div>}
          </div>
          <div className={!errors.start
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Начало проекта</label>
            <input
              id='start'
              className={!errors.start
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail && props.project.start_date}
              name='start'
              {...register('start',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.start && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.start.message}</div>}
          </div>
          <div className={!errors.end
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="end">Окончание проекта</label>
            <input
              id='end'
              className={!errors.end
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='date'
              defaultValue={props.detail && props.project.end_date}
              name='end'
              {...register('end',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.end && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.end.message}</div>}
          </div>
          <div className={!errors.summ
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ">Сумма договора</label>
            <input
              id='summ'
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ'
              defaultValue={props.detail && props.project.price}
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
      </div>
    </div>
  ), document.getElementById('modal_root'))
}
