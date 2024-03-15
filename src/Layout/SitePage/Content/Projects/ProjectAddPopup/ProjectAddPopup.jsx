import classNames from "classnames";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './projectaddpopup.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, getProjects } from "../../../../../redux/projectsReducer";
import { editProject } from "../../../../../redux/projectItemReducer";
import { selectIsFetchingAddProjects } from "../../../../../redux/projectItemSelector";
import { selectIsFetchingEditProjects } from "../../../../../redux/projectsSelector";
import { getClients, getEmployees } from "../../../../../redux/usersReducer";
import { selectClients, selectEmployees } from "../../../../../redux/usersSelector";
import Select from 'react-select';

export default function ProjectAddPopup(props) {

  const dispatch = useDispatch();
  const isFetchingAdd = useSelector(selectIsFetchingAddProjects);
  const isFetchingEdit = useSelector(selectIsFetchingEditProjects);
  const employees = useSelector(selectEmployees);
  const clients = useSelector(selectClients);

  const optionsStatus = [{ value: '1', label: 'Активен' }, { value: '0', label: 'Неактивен' }];

  let optionsEmployees = [];
  employees?.map((item) => {
    optionsEmployees.push({
      value: `${item?.id}`, label: `${item?.last_name} ${item?.first_name} ${item?.father_name}`
    })
  })
  optionsEmployees.sort((a, b) => a.label.localeCompare(b.label))

  let optionsClients = [];
  clients?.map((item) => {
    optionsClients.push({
      value: `${item?.id}`, label: `${item?.last_name} ${item?.first_name} ${item?.father_name}`
    })
  })
  optionsClients.sort((a, b) => a.label.localeCompare(b.label))

  const {
    clearErrors,
    setError,
    register,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getClients())
      .then(() => {
        props.detail && setValue('client', String(props.project.client?.id || ''));
      }
      )
    dispatch(getEmployees())
      .then(() => {
        props.detail && setValue('manager', String(props.project.project_manager?.id || ''));
        props.detail && setValue('foreman', String(props.project.foreman?.id || ''));
      }
      )

    props.detail && setValue('status', String(Number(props.project.active)))

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
      Number(data.client) || null,
      Number(data.foreman),
      data.coordinates || null
    ))
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
      Number(data.client) || null,
      Number(data.foreman),
      data.coordinates || null
    ))
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
              {...register('description')}
            ></textarea>
            {errors.description && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.description.message}</div>}
          </div>
          <div className={!errors.manager
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Менеджер</label>
            <Controller
              control={control}
              name='manager'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsEmployees}
                  value={value ? optionsEmployees.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
              rules={{ required: 'Выберите менеджера' }}
            />
            {errors.manager && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.manager.message}</div>}
          </div>
          <div className={!errors.client
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Клиент</label>
            <Controller
              control={control}
              name='client'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsClients}
                  value={value ? optionsClients.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
            />
            {errors.client && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.client.message}</div>}
          </div>
          <div className={!errors.foreman
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Прораб</label>
            <Controller
              control={control}
              name='foreman'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsEmployees}
                  value={value ? optionsEmployees.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
              rules={{ required: 'Выберите менеджера' }}
            />
            {errors.foreman && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.foreman.message}</div>}
          </div>
          <div className={!errors.status
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Статус</label>
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
              type='number'
              step='0.01'
              name='summ'
              defaultValue={props.detail && props.project.price}
              placeholder='0 &#8381;'
              {...register('summ',
                {
                  pattern: {
                    value: /^[0]{1}$|^[0]{1}[.]([0-9]{0,2})$|^[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                    message: 'Неверный ввод'
                  },
                })
              }
            />
            {errors.summ && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ.message}</div>}
          </div>
          <div className={!errors.coordinates
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)}>Координаты</label>
            <input
              className={!errors.coordinates
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='coordinates'
              defaultValue={props.detail && props.project.coordinates}
              placeholder='00.000000, 00.00000'
              {...register('coordinates')}
            />
            {errors.coordinates && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.coordinates.message}</div>}
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
