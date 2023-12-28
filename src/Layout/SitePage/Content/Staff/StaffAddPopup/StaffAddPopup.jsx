import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './staffaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { addUser } from "../../../../../redux/usersReducer";
import { useDispatch } from 'react-redux';
import { editUser } from "../../../../../redux/userItemReducer";


export default function StaffAddPopup(props) {

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

  const addUserLocal = (data) => {
    dispatch(addUser(
      data.name,
      data.surname,
      data.patronymic,
      data.login,
      data.password,
      data.type,
      data.phone,
      data.finance,
      data.description
    ));
    props.close(false);
    document.body.classList.remove('modal-show');
  }

  const editUserLocal = (data) => {
    dispatch(editUser(
      props.user.id,
      data.name,
      data.surname,
      data.patronymic,
      data.login,
      data.type,
      data.phone,
      data.finance,
      data.description
    ));
    props.close(false);
    document.body.classList.remove('modal-show');
  }

  const onSubmit = (data => {
    props.detail ? editUserLocal(data) : addUserLocal(data)
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
          <div className={classNames(styles.group)}>
            <div className={!errors.surname
              ? classNames(styles.inputBox)
              : classNames('popupBoxError', styles.inputBox, styles.boxError)}>
              <input
                className={!errors.surname
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
                type='text'
                name='surname'
                defaultValue={props.detail && props.user.last_name}
                placeholder='Фамилия'
                {...register('surname',
                  {
                    required: 'Введите фамилию',
                  })}
              />
              {errors.surname && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.surname.message}</div>}
            </div>
            <div className={!errors.name
              ? classNames(styles.inputBox)
              : classNames('popupBoxError', styles.inputBox, styles.boxError)}>
              <input
                className={!errors.name
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
                type='text'
                name='name'
                defaultValue={props.detail && props.user.first_name}
                placeholder='Имя'
                {...register('name',
                  {
                    required: 'Введите имя',
                  })}
              />
              {errors.name && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.name.message}</div>}
            </div>
            <div className={!errors.patronymic
              ? classNames(styles.inputBox)
              : classNames('popupBoxError', styles.inputBox, styles.boxError)}>
              <input
                className={!errors.patronymic
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
                type='text'
                name='patronymic'
                defaultValue={props.detail && props.user.father_name}
                placeholder='Отчество'
                {...register('patronymic',
                  {
                    required: 'Введите отчетство',
                  })}
              />
              {errors.patronymic && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.patronymic.message}</div>}
            </div>
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
              defaultValue={props.detail && props.user.description}
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
              defaultValue={props.detail && props.user.username}
              placeholder='Логин'
              {...register('login',
                {
                  required: 'Введите логин',
                })}
            />
            {errors.login && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.login.message}</div>}
          </div>
          {!props.detail &&
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
            </div>}
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="type">Тип пользователя</label>
            <select {...register('type', {
              required: 'Выберите клиента',
            })}
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              <option value="k" selected={props.detail && props.user.user_type === 'k'}>Клиент</option>
              <option value="p" selected={props.detail && props.user.user_type === 'p'}>Подрядчик</option>
              <option value="s" selected={props.detail && props.user.user_type === 's'}>Сотрудник</option>

            </select>

            {/* <input
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='type'
              defaultValue={props.detail && props.user.user_type}
              placeholder='Выбрать'
              {...register('type',
                {
                  required: 'Введите пароль',
                })
              }
            /> */}
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
              defaultValue={props.detail && props.user.phone}
              placeholder='+7800000000'
              {...register('phone',
                {
                  required: 'Введите номер телефона',
                  minLength: {
                    value: 12,
                    message: 'Введите номер целиком'
                  },
                  maxLength: {
                    value: 12,
                    message: 'Слишком длинный номер'
                  },
                  pattern: {
                    value: /^((\+7)([0-9]){10})$/,
                    message: 'Формат +70000000000'
                  },
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
                defaultChecked={props.detail && props.user.financial_accounting}
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
