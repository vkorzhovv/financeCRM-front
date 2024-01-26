import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './staffaddpopup.module.css';
import { useForm } from 'react-hook-form';
import { addUser, getClients, getContractors, getEmployees } from "../../../../../redux/usersReducer";
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from "../../../../../redux/userItemReducer";
import { selectIsFetchingAddUser } from "../../../../../redux/usersSelector";
import { selectIsFetchingEditUser } from "../../../../../redux/userItemSelector";
import { selectMe } from "../../../../../redux/authSelectors";

export default function StaffAddPopup(props) {

  const me = useSelector(selectMe)

  const dispatch = useDispatch();
  const isFetchingAdd = useSelector(selectIsFetchingAddUser);
  const isFetchingEdit = useSelector(selectIsFetchingEditUser);

  const {
    clearErrors,
    setError,
    register,
    getValues,
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
      data.superuser || false,
      data.description,
    ))
      .then(() => {
        data.type === 'k' ? dispatch(getClients())
          : data.type === 's' ? dispatch(getEmployees())
            : dispatch(getContractors())
        props.close(false);
        document.body.classList.remove('modal-show');
        return true;
      })
      .catch(err => {
        if (err.response.data) {
          setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
        } else {
          console.log(err.message)
        }
      })
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
      data.superuser || false,
      data.description,
    ))
      .then(() => {
        props.close(false);
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
    props.detail ? editUserLocal(data) : addUserLocal(data);
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
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Максимум 20 символов'
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁ]+$/,
                      message: 'Ввод только русских букв'
                    }
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
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Максимум 20 символов'
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁ]+$/,
                      message: 'Ввод только русских букв'
                    }
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
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Максимум 20 символов'
                    },
                    pattern: {
                      value: /^[а-яА-ЯёЁ]+$/,
                      message: 'Ввод только русских букв'
                    }
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
                  minLength: {
                    value: 4,
                    message: 'Минимум 4 символа'
                  },
                  pattern: {
                    value: /^[a-zA-z0-9]+$/,
                    message: 'Ввод только латинских букв и цифр'
                  }
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
                    pattern: {
                      value: /(?=.*[a-zA-Z])(?=.*[0-9])/g,
                      message: 'Пароль должен содержать латинские буквы и цифры'
                    },
                    minLength: {
                      value: 8,
                      message: 'Минимум 8 символов'
                    },
                  })}
              />
              {errors.password && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.password.message}</div>}
            </div>}
          <div className={!errors.type
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="type">Тип пользователя</label>
            <select
              id='type'
              {...register('type', {
                required: 'Выберите тип пользователя',
              })}
              defaultValue={props.detail && props.user.user_type}
              className={!errors.type
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
            >
              <option value="">Выбрать</option>
              <option value="k">Клиент</option>
              <option value="p">Подрядчик</option>
              <option value="s">Сотрудник</option>
            </select>
            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.phone
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="phone">Телефон</label>
            <input
              className={!errors.phone
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              id='phone'
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
                    message: 'Номер начиная с "+7" без пробелов'
                  },
                })
              }
            />
            {errors.phone && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.phone.message}</div>}
          </div>
          {
            me.is_superuser && getValues('type') === 's' &&
            <div className={classNames('flex', styles.inputBox)}>
              <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="superuser">Доступ ко всему</label>
              <div className={styles.checkWrapper}>
                <input
                  className={classNames(styles.inputCheck)}
                  type='checkbox'
                  name='superuser'
                  id='superuser'
                  defaultChecked={props.detail && props.user.is_superuser}
                  {...register('superuser')}
                />
              </div>
            </div>
          }
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
