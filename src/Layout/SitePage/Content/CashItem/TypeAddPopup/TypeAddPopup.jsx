import classNames from "classnames";
import React from "react";
import styles from './typeaddpopup.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { selectIsFetchingCash } from "../../../../../redux/cashItemSelector";
import Select from 'react-select';
import { useEffect } from "react";
import { useState } from "react";
import { addType, deleteType, editType, getItems } from "../../../../../redux/cashItemReducer";

export default function TypeAddPopup(props) {

  const dispatch = useDispatch()

  const isFetching = useSelector(selectIsFetchingCash);

  const paymentsTypes = props.paymentsTypes;
  let optionsTypes = [];
  paymentsTypes?.map((item) => {
    optionsTypes.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  const [actionType, setActionType] = useState('add');

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
    dispatch(
      actionType === 'add' ?
        addType(data.name)
        :
        actionType === 'delete' ?
          deleteType(data.type)
          :
          editType(data.type, data.name))
      .then(() => {
        dispatch(getItems())
        reset()
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
    addCashItem(data)
  })

  return (
    <div className={classNames('flex', props.isStatic ? styles.cashAddPopupStatic : 'popup')}>
      <div className={classNames(props.isStatic ? styles.cashPopupStaticWindow : 'popupWindow', styles.visible)}>
        <div className={classNames(props.isStatic ? styles.popupHeaderStatic : 'popupHeader', 'flex', styles.btnWrap)}>
          <button
            className={classNames('btn', actionType !== 'add' && 'btnTransparent', styles.typeBtn)}
            onClick={() => {
              setActionType('add')
              reset()
            }}
          >
            Добавить
          </button>
          {
            paymentsTypes.length > 0 &&
            <button
              onClick={() => {
                setActionType('delete')
                reset()
              }}
              className={classNames('btn', actionType !== 'delete' && 'btnTransparent', styles.typeBtn)}
            >
              Удалить
            </button>
          }
          {
            paymentsTypes.length > 0 &&
            <button
              onClick={() => {
                setActionType('edit')
                reset()
              }}
              className={classNames('btn', actionType !== 'edit' && 'btnTransparent', styles.typeBtn)}
            >
              Редактировать
            </button>
          }
        </div>
        <form
          className={classNames('flex', 'popupform', styles.staffForm)}
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            clearErrors('serverError');
          }
          }
        >
          {
            actionType !== 'add' &&
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
                    isSearchable={true}
                    maxMenuHeight={180}
                    menuPlacement={'auto'}
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
          }
          {
            actionType !== 'delete' &&
            <div className={!errors.name
              ? classNames(props.isStatic && styles.inputBoxStatic, 'popupInputBox')
              : classNames(props.isStatic && styles.inputBoxStatic, 'popupInputBox', 'popupBoxError', styles.boxError)}>
              <input
                className={!errors.name
                  ? classNames('popupInput', styles.input)
                  : classNames('popupInput', 'popupError', styles.input, styles.error)}
                type='text'
                name='name'
                placeholder={actionType === 'add' ? 'Название типа статьи' : 'Новое название типа статьи'}
                {...register('name',
                  {
                    required: 'Введите название',
                  })}
              />
              {errors.name && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.name.message}</div>}
            </div>
          }



          <div className={classNames('popupBtnsWrapper', styles.btnsWrapper)}>
            <button
              className={isFetching ? classNames('btn', 'progress') : 'btn'}
              type='submit'
              disabled={!isValid}
            >
              {isFetching ?
                'Загрузка...' :
                actionType === 'add' ?
                  'Добавить' : actionType === 'delete'
                    ? 'Удалить' : 'Подтвердить'}
            </button>
          </div>
          {errors.serverError && <div className={'errorForm'}>{errors.serverError.message}</div>}
        </form>
      </div>
    </div>
  )
}
