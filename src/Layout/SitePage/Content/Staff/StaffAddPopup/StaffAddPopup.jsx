import classNames from "classnames";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from './staffaddpopup.module.css';
import { Controller, useForm } from 'react-hook-form';
import { addUser, getClients, getContractors, getEmployees } from "../../../../../redux/usersReducer";
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from "../../../../../redux/userItemReducer";
import { selectIsFetchingAddUser } from "../../../../../redux/usersSelector";
import { selectIsFetchingEditUser } from "../../../../../redux/userItemSelector";
import { selectMe } from "../../../../../redux/authSelectors";
import Select from 'react-select';
import { useEffect } from "react";

export default function StaffAddPopup(props) {

  const me = useSelector(selectMe)

  const dispatch = useDispatch();
  const isFetchingAdd = useSelector(selectIsFetchingAddUser);
  const isFetchingEdit = useSelector(selectIsFetchingEditUser);

  const optionsTypes = [{ value: 'k', label: 'Клиент' }, { value: 'p', label: 'Подрядчик' }, { value: 's', label: 'Сотрудник' }];

  const {
    clearErrors,
    setError,
    register,
    setValue,
    control,
    resetField,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const addUserLocal = (data) => {
    dispatch(addUser(
      {
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        login: data.login || null,
        password: data.password || null,
        type: data.type,
        phone: data.phone,
        superuser: data.superuser || false,
        descr: data.description,
        start_balance: Number(data.start_balance) || 0,
        countBalance: data.countBalance || false,
        isRegister: data.registerUser,
      }
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
      {
        userId: props.user.id,
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        login: data.login || null,
        password: data.password,
        type: data.type,
        phone: data.phone,
        superuser: data.superuser || false,
        descr: data.description,
        start_balance: Number(data.start_balance) || 0,
        countBalance: data.countBalance || false,
        isRegister: data.registerUser,
      }
    ))
      .then(() => {
        data.type === 'k' ? dispatch(getClients())
          : data.type === 's' ? dispatch(getEmployees())
            : dispatch(getContractors())
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

  const watchType = watch('type');
  const watchRegisterUser = watch('registerUser');
  const watchCountBalance = watch('countBalance');

  const [registerUser, setRegisterUser] = useState(true);
  const [countBalance, setCountBalance] = useState(false);

  useEffect(() => {
    props.detail && setValue('type', props.user.user_type)
    props.detail && setValue('registerUser', props.user.isRegister)
    console.log(props.user?.countBalance)
  }, [setValue])

  useEffect(() => {
    setRegisterUser(watchRegisterUser)
    setCountBalance(watchCountBalance)

    !watchRegisterUser && resetField('login')
    !watchRegisterUser && resetField('password')
  }, [watchRegisterUser, watchCountBalance])

  const onSubmit = (data => {
    props.detail ? editUserLocal(data) : addUserLocal(data);
    console.log(data)
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
              {...register('description')}
            ></textarea>
            {errors.description && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.description.message}</div>}
          </div>
          {
            registerUser &&
            <div className={!errors.login
              ? classNames('popupInputBox', styles.inputBox)
              : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <input
                className={!errors.login
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
                type='text'
                name='login'
                autoComplete="new-password"
                defaultValue={(props.detail && props.user.isRegister) ? props.user.username : ''}
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
          }
          {
            (((props.detail && !props.user.isRegister) || (!props.detail && registerUser)) && registerUser) &&
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
                autoComplete='new-password'
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
            </div>
          }

          <div className={!errors.type
            ? classNames('flex', 'popupInputBox')
            : classNames('flex', 'popupInputBox', 'popupBoxError')}>
            <label className={classNames('popupLabel')}>Тип пользователя</label>
            <Controller
              control={control}
              name='type'
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable={true}
                  isSearchable={false}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsTypes}
                  value={value ? optionsTypes.find((с) => с.value === value) : ''}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
              rules={{ required: 'Выберите тип' }}
            />
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
            (me.is_superuser && countBalance && watchType === 's') &&
            <div className={!errors.start_balance
              ? classNames('flex', 'popupInputBox', styles.inputBox)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
              <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="start_balance">Стартовый баланс</label>
              <input
                id='start_balance'
                className={!errors.start_balance
                  ? classNames('popupInput', styles.inputHalf, styles.input)
                  : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
                type='number'
                step='0.01'
                name='start_balance'
                defaultValue={props.detail && props.user.start_balance}
                placeholder='0 &#8381;'
                {...register('start_balance',
                  {
                    pattern: {
                      value: /^[-]?[0]{1}$|^[-]?[0]{1}[.]([0-9]{0,2})$|^[-]?[1-9]([0-9])*?[.]?([0-9]{0,2})$/,
                      message: 'Неверный ввод'
                    },
                  })
                }
              />
              {errors.start_balance && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.start_balance.message}</div>}
            </div>
          }

          <div className={classNames('flex', styles.inputBox, styles.inputBoxMargBot)}>
            <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="registerUser">Регистрировать</label>
            <div className={styles.checkWrapper}>
              <input
                className={classNames(styles.inputCheck)}
                type='checkbox'
                name='registerUser'
                id='registerUser'
                defaultChecked={true}
                {...register('registerUser')}
              />
            </div>
          </div>

          {
            (me.is_superuser && watchType === 's') &&
            <div className={classNames('flex', styles.inputBox, styles.inputBoxMargBot)}>
              <label className={classNames('popupLabel', styles.staffLabel)} htmlFor="countBalance">Считать баланс</label>
              <div className={styles.checkWrapper}>
                <input
                  className={classNames(styles.inputCheck)}
                  type='checkbox'
                  name='countBalance'
                  id='countBalance'
                  defaultChecked={props.detail && props.user.countBalance}
                  {...register('countBalance')}
                />
              </div>
            </div>
          }

          {
            me.is_superuser && watchType === 's' && registerUser &&
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
