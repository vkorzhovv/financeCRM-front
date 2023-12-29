import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './cashaddpopup.module.css';
import { useForm } from 'react-hook-form';

export default function CashAddPopup(props) {

  const {
    clearErrors,
    // setError,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data => {
    console.log(data)
  })

  return createPortal((
    <div className={classNames('flex', 'popup', styles.cashAddPopup)}>
      <div className={classNames('popupWindow', styles.cashPopupWindow)}>
        <h3 className={classNames('popupHeader')}>{props.popupHeader}</h3>
        <form
          className={classNames('flex', 'popupform', styles.staffForm)}
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
              // defaultValue={props.detail && props.user.username}
              placeholder='Название статьи'
              {...register('name',
                {
                  required: 'Введите название',
                })}
            />
            {errors.name && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.name.message}</div>}
          </div>
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="type">Тип статьи</label>
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
