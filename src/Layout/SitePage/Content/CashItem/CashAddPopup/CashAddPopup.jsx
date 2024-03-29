import classNames from "classnames";
import React from "react";
import styles from './cashaddpopup.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, getItems } from "../../../../../redux/cashItemReducer";
import { selectIsFetchingCash } from "../../../../../redux/cashItemSelector";
import Select from 'react-select';
import { useEffect } from "react";

export default function CashAddPopup(props) {

  const dispatch = useDispatch();

  const isFetching = useSelector(selectIsFetchingCash);

  const paymentsTypes = props.paymentsTypes;
  let optionsTypes = [];
  paymentsTypes?.map((item) => {
    optionsTypes.push({
      value: `${item?.type}`, label: `${item?.name}`
    })
  })

  const {
    clearErrors,
    setError,
    setValue,
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const addCashItem = (data) => {
    dispatch(addItem(data.type, data.name))
      .then(() => {
        dispatch(getItems())
        reset()
      }
      )
      .catch(err => {
        if (err.response.data) {
          setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
        } else {
          console.log(err.message)
        }
      })
  }

  const editCashItem = (data) => {
    dispatch(editItem(props.id, data.type, data.name))
      .then(() => {
        props.close(false)
        document.body.classList.remove('modal-show');
        dispatch(getItems())
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
    props.detail ? editCashItem(data) : addCashItem(data)
  })

  useEffect(() => {
    props.detail && setValue('type', props.type)
  }, [setValue])

  return (
    <div className={classNames('flex', props.isStatic ? styles.cashAddPopupStatic : 'popup')}>
      <div className={classNames(props.isStatic ? styles.cashPopupStaticWindow : 'popupWindow', styles.visible)}>
        <h3 className={classNames(props.isStatic ? styles.popupHeaderStatic : 'popupHeader')}>{props.popupHeader}</h3>
        <form
          className={classNames('flex', 'popupform', styles.staffForm)}
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            clearErrors('serverError');
          }
          }
        >
          <div className={!errors.type
            ? classNames('flex', props.isStatic && styles.inputBoxStatic, 'popupInputBox')
            : classNames('flex', props.isStatic && styles.inputBoxStatic, 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <label className={classNames('popupLabel', styles.cashLabel)} htmlFor="type">Тип статьи</label>
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
                  onChange={(val) => onChange(val?.value)} />
              )}
              rules={{ required: 'Выберите тип' }}
            />

            {errors.type && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.type.message}</div>}
          </div>
          <div className={!errors.name
            ? classNames(props.isStatic && styles.inputBoxStatic, 'popupInputBox')
            : classNames(props.isStatic && styles.inputBoxStatic, 'popupInputBox', 'popupBoxError', styles.boxError)}>
            <input
              className={!errors.name
                ? classNames('popupInput', styles.input)
                : classNames('popupInput', 'popupError', styles.input, styles.error)}
              type='text'
              name='name'
              defaultValue={props.detail && props.name}
              placeholder='Название статьи'
              {...register('name',
                {
                  required: 'Введите название',
                })}
            />
            {errors.name && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.name.message}</div>}
          </div>
          <div className={classNames('popupBtnsWrapper', styles.btnsWrapper)}>
            {
              props.handleClickClose &&
              <button
                className={classNames('btn', 'btnTransparent')}
                onClick={props.handleClickClose}
                type="button"
              >
                Отменить
              </button>
            }
            <button
              className={isFetching ? classNames('btn', 'progress') : 'btn'}
              type='submit'
              disabled={!isValid}
            >
              {isFetching ? 'Загрузка...' : props.submitText}
            </button>
          </div>
          {errors.serverError && <div className={'errorForm'}>{errors.serverError.message}</div>}
        </form>
      </div>
    </div>
  )
}
