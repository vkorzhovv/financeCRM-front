import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './projectaddpopup.module.css';
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

export default function ProjectAddPopup(props) {

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
    <div className={classNames('flex', 'popup', styles.projectAddPopup)}>
      <div className={classNames('popupWindow', styles.projectPopupWindow)}>
        <h3 className={classNames('popupHeader')}>Добавить проект</h3>
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
              placeholder='Название'
              {...register('name',
                {
                  required: 'Введите название проекта',
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
          <div className={!errors.manager
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="type">Менеджер</label>
            <input
              className={!errors.manager
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='manager'
              placeholder='Выбрать'
              {...register('type',
                {
                  required: 'Выбурите менеджера',
                })
              }
            />
            {errors.manager && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.manager.message}</div>}
          </div>
          <div className={!errors.client
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="type">Клиент</label>
            <input
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
            />
            {errors.client && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.client.message}</div>}
          </div>
          <div className={!errors.foreman
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="foreman">Прораб</label>
            <input
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
            />
            {errors.foreman && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.foreman.message}</div>}
          </div>
          <div className={!errors.status
            ? classNames('flex', 'popupInputBox', styles.inputBox)
            : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError)}>
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="status">Статус</label>
            <input
              className={!errors.status
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='status'
              placeholder='Выбрать'
              {...register('status',
                {
                  required: 'Выбурите статус',
                })
              }
            />
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
              name='start'
              // placeholder='дд.мм.гггг'
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
              name='end'
              // placeholder='дд.мм.гггг'
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
            <label className={classNames('popupLabel', styles.projectLabel)} htmlFor="summ">Окончание проекта</label>
            <input
              className={!errors.summ
                ? classNames('popupInput', styles.inputHalf, styles.input)
                : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
              type='text'
              name='summ'
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
              value='Добавить'
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  ), document.getElementById('modal_root'))
}
