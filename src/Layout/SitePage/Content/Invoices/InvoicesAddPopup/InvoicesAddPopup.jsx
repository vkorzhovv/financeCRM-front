import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './invoicesaddpopup.module.css';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';


export default function InvoicesAddPopup(props) {

  // const dispatch = useDispatch();

  const {
    clearErrors,
    // setError,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  // const addProjectLocal = (data) => {
  //   dispatch(addProject(data.name, data.description, data.start, data.end, data.summ, Boolean(Number(data.status)), Number(data.manager), Number(data.client), Number(data.foreman)));
  //   props.close(false)
  //   document.body.classList.remove('modal-show');
  // }
  // const editProjectLocal = (data) => {
  //   dispatch(editProject(props.project.id, data.name, data.description, data.start, data.end, data.summ, Boolean(Number(data.status)), Number(data.manager), Number(data.client), Number(data.foreman)));
  //   props.close(false)
  //   document.body.classList.remove('modal-show');
  // }

  const onSubmit = (data => {
    // props.detail ? editProjectLocal(data) : addProjectLocal(data);
    console.log(data)
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
              <option value="1">Вася</option>
              <option value="2">Коля</option>
              <option value="3">Петя</option>
            </select>
            {errors.payer && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.payer.message}</div>}
          </div>
          <div className={!errors.recipient
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="recipient">Получатель</label>
            <select {...register('recipient', {
              required: 'Выберите получателя',
            })}
              className={!errors.recipient
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              <option value="1">Вася</option>
              <option value="2">Коля</option>
              <option value="3">Петя</option>
            </select>
            {errors.recipient && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.recipient.message}</div>}
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
              <option value="1">Вася</option>
              <option value="2">Коля</option>
              <option value="3">Петя</option>
            </select>
            {errors.project && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.project.message}</div>}
          </div>
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="type">Тип начисления</label>
            <select {...register('type', {
              required: 'Выберите тип',
            })}
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              <option value="1">Тип 1</option>
              <option value="2">Тип 2</option>
              <option value="3">Тип 3</option>
            </select>
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.purpose
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel')} htmlFor="purpose">Назначение начисления</label>
            <select {...register('purpose', {
              required: 'Выберите назначение',
            })}
              className={!errors.purpose
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              <option value="1">Тип 1</option>
              <option value="2">Тип 2</option>
              <option value="3">Тип 3</option>
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
              // defaultValue={props.detail && props.project.price}
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
              // defaultValue={props.detail && props.project.start_date}
              name='date'
              {...register('date',
                {
                  required: 'Выберите дату',
                })
              }
            />
            {errors.date && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.date.message}</div>}
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
              // defaultValue={props.detail && props.project.description}
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
