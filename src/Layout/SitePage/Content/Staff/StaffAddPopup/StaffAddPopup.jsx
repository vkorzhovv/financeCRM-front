import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './staffaddpopup.module.css';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

export default function StaffAddPopup(props) {

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

  const onSubmit = (data => {
    // dispatch(login(data.username, data.password, setError));
    console.log(data);
  })

  return createPortal((
    <div className={classNames('flex', 'popup', styles.staffAddPopup)}>
      <div className={classNames('popupWindow', styles.staffPopupWindow)}>
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
              placeholder='Фамилия Имя Отчество'
              {...register('name',
                {
                  required: 'Введите полное имя',
                })}
            />
            {errors.name && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.name.message}</div>}
          </div>
          <div className={!errors.description
            ? classNames('popupInputBox',  styles.inputBox)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <textarea
              className={!errors.description
                ? classNames('popupInput', 'popupTextarea', styles.input)
                : classNames('popupInput', 'popupError', 'popupTextarea', styles.input, styles.error)}
              type={'text'}
              name='description'
              placeholder='Описание'
              {...register('description',
                {
                  required: 'Введите описание',
                })}
            ></textarea>
            {errors.description && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.description.message}</div>}
          </div>
          <div className={!errors.login
            ? classNames('popupInputBox', styles.inputBox)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <input
              className={!errors.login
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='login'
              placeholder='Логин'
              {...register('login',
                {
                  required: 'Введите логин',
                })}
            />
            {errors.login && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.login.message}</div>}
          </div>
          <div className={!errors.password
            ? classNames('popupInputBox', styles.inputBox)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <input
              className={!errors.password
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='password'
              name='password'
              placeholder='Пароль'
              {...register('password',
                {
                  required: 'Введите пароль',
                })}
            />
            {errors.password && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.password.message}</div>}
          </div>
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="type">Тип пользователя</label>
            <input
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='type'
              placeholder='Выбрать'
              {...register('type',
                {
                  required: 'Введите пароль',
                })
              }
            />
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.phone
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="type">Телефон</label>
            <input
              className={!errors.phone
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='phone'
              placeholder='7800000000'
              {...register('phone',
                {
                  required: 'Введите номер телефона',
                })
              }
            />
            {errors.phone && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.phone.message}</div>}
          </div>
          <div className={classNames('flex', styles.inputBox)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="type">Вести учет финансов</label>
            <div className={styles.checkWrapper}>
              <input
                className={classNames(styles.inputCheck)}
                type='checkbox'
                name='finance'
                {...register('finance')}
              />
            </div>
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
