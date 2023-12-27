import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './projectaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProject } from "../../../../../redux/projectsReducer";
import { editProject } from "../../../../../redux/projectItemReducer";

export default function ProjectAddPopup(props) {

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

  const addProjectLocal = (data) => {
    dispatch(addProject(data.name, data.description, data.start, data.end, data.summ, Boolean(Number(data.status)), Number(data.manager), Number(data.client), Number(data.foreman)));
    props.close(false)
    document.body.classList.remove('modal-show');
  }
  const editProjectLocal = (data) => {
    dispatch(editProject(props.project.id, data.name, data.description, data.start, data.end, data.summ, Boolean(Number(data.status)), Number(data.manager), Number(data.client), Number(data.foreman)));
    props.close(false)
    document.body.classList.remove('modal-show');
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
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="type">Менеджер</label>
            <select {...register('manager', {
              required: 'Выберите менеджера',
            })}
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.employees && props.employees.map(item =>
                <option value={item.id} selected={props.detail && item.id === props.project.project_manager.id}>{item.last_name} {item.first_name} {item.father_name}</option>
              )}
            </select>

            {/* <input
              className={!errors.manager
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='manager'
              placeholder='Выбрать'
              {...register('manager',
                {
                  required: 'Выберите менеджера',
                })
              }
            /> */}
            {errors.manager && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.manager.message}</div>}
          </div>
          <div className={!errors.client
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="client">Клиент</label>
            <select {...register('client', {
              required: 'Выберите клиента',
            })}
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.clients && props.clients.map(item =>
                <option value={item.id} selected={props.detail && item.id === props.project.client.id}>{item.last_name} {item.first_name} {item.father_name}</option>
              )}
            </select>

            {/* <input
              className={!errors.client
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='client'
              placeholder='Выбрать'
              {...register('client',
                {
                  required: 'Выберите клиента',
                })
              }
            /> */}
            {errors.client && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.client.message}</div>}
          </div>
          <div className={!errors.foreman
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="foreman">Прораб</label>
            <select {...register('foreman', {
              required: 'Выберите прораба',
            })}
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              {props.contractors && props.contractors.map(item =>
                <option value={item.id} selected={props.detail && item.id === props.project.foreman.id}>{item.last_name} {item.first_name} {item.father_name}</option>
              )}
            </select>
            {/* <input
              className={!errors.foreman
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='foreman'
              placeholder='Выбрать'
              {...register('foreman',
                {
                  required: 'Выберите прораба',
                })
              }
            /> */}
            {errors.foreman && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.foreman.message}</div>}
          </div>
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
              <option value="">Выбрать</option>
              <option value='1' selected={props.detail && props.project.active}>Активен</option>
              <option value='0' selected={props.detail && !props.project.active}>Неактивен</option>
            </select>

            {/* <input
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='status'
              placeholder='Выбрать'
              {...register('status',
                {
                  required: 'Выберите статус',
                })
              }
            /> */}
            {errors.status && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.status.message}</div>}
          </div>
          <div className={!errors.start
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Начало проекта</label>
            <input
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
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ'
              defaultValue={props.detail && props.project.price}
              placeholder='0 р'
              {...register('summ',
                {
                  required: 'Введите сумму',
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
              Отмена
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
