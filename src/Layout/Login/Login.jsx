import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './login.module.css';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { login } from '../../redux/authReducer';
import Logo from '../common/Logo/Logo';
import hideImg from '../../assets/images/hidePass.png'
import showImg from '../../assets/images/showPass.png'

export default function Login(props) {

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const {
    clearErrors,
    setError,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data => {
    dispatch(login(data.username, data.password, setError));
  })

  return (
    <div className={styles.loginPage}>
      <div className={classNames('flex', styles.loginTop)}>
        <Logo />
      </div>
      <div className={classNames('flex', styles.formBox)}>
        <div className={classNames('flex', styles.formWrapper)}>
          <h1 className={styles.formName}>Вход</h1>
          <form
            className={classNames('flex', styles.form)}
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => {
              clearErrors('serverError');
            }
            }
          >
            <div className={!errors.username
              ? styles.inputBox
              : classNames(styles.inputBox, styles.boxError)}>
              <input
                className={!errors.username
                  ? styles.input
                  : classNames(styles.input, styles.error)}
                type='text'
                name='username'
                autoComplete='new-password'
                placeholder='Логин'
                {...register('username',
                  {
                    required: 'Введите логин',
                  })}
              />
              {errors.username && <div className={styles.errorMessage}>{errors.username.message}</div>}
            </div>
            <div className={!errors.password
              ? styles.inputBox
              : classNames(styles.inputBox, styles.boxError)}>
              <input
                className={!errors.password
                  ? styles.input
                  : classNames(styles.input, styles.error)}
                type={visible ? 'text' : 'password'}
                name='password'
                placeholder='Пароль'
                autoComplete='new-password'
                {...register('password',
                  {
                    required: 'Введите пароль',
                  })}
              />
              <button
                className={classNames('imageBox', styles.passBtn)}
                type='button'
                onClick={() => {
                  visible ? setVisible(false) : setVisible(true)
                }}>
                <img src={visible ? hideImg : showImg} alt="icon" />
              </button>
              {errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
            </div>
            <div>
              <input
                className={classNames('btn', 'logBtn', styles.btnSubmit)}
                type='submit'
                value='Войти'
                disabled={!isValid}
              />
            </div>
          </form>
          {errors.serverError && <div className={styles.errorForm}>{errors.serverError.message}</div>}
        </div>
      </div>
    </div >
  );
}
