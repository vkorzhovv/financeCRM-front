import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './paymentaddpopup.module.css';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';


export default function PaymentAddPopup(props) {

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
              <option value="1">Счет 1</option>
              <option value="2">Счет 2</option>
              <option value="3">Счет 3</option>
            </select>
            {errors.check && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.check.message}</div>}
          </div>
          <div className={!errors.summ_plus
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ_plus">Сумма начислено</label>
            <input
              className={!errors.summ_plus
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ_plus'
              // defaultValue={props.detail && props.project.price}
              placeholder='0 р'
              {...register('summ_plus',
                {
                  required: 'Введите сумму',
                })
              }
            />
            {errors.summ_plus && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ_plus.message}</div>}
          </div>
          {props.detail &&
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
                  })
                }
              />
              {errors.summ_minus && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.summ_minus.message}</div>}
            </div>
          }
          <div className={!errors.date
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Дата начисления</label>
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
                <option value='1'>Подтвержден</option>
                <option value='0'>Не подтвержден</option>
              </select>
              {errors.status && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.status.message}</div>}
            </div>
          }
          <div className={!errors.scan
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start">Скан</label>
            <input
              className={!errors.scan
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='file'
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
          <div className={!errors.photo
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="photo">Фотография</label>
            <input
              className={!errors.photo
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='file'
              // defaultValue={props.detail && props.project.start_date}
              name='photo'
              {...register('photo',
                {
                  required: 'Выберите документ',
                })
              }
            />
            {errors.photo && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.photo.message}</div>}
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
