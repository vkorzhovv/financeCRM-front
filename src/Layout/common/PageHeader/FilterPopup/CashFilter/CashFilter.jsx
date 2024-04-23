import classNames from "classnames";
import React, { useEffect } from "react";
import styles from './cashfilter.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import DeleteIcon from "../../../../../svgIcons/delete";
import CheckIcon from "../../../../../svgIcons/check";
import { filterItems, getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectPaymentTypes } from "../../../../../redux/cashItemSelector";

export default function CashFilter(props) {

  const dispatch = useDispatch();
  const paymentsTypes = useSelector(selectPaymentTypes);

  let optionsTypes = [];
  paymentsTypes?.map((item) => {
    optionsTypes.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  const {
    clearErrors,
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const watchTypes = watch('types');

  useEffect(() => {
    dispatch(getPaymentTypes())
      .then(() => {
        const savedTypes = sessionStorage.getItem('filterItemsTypes');
        setValue('types', savedTypes ? optionsTypes.filter(item => savedTypes.includes(+item.value)) : []);
        console.log(optionsTypes, paymentsTypes, savedTypes)
      })
  }, [dispatch, setValue])

  const onSubmit = (data => {
    dispatch(filterItems(
      data.types?.map(item => +item.value) || []
    ))
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        clearErrors('serverError');
      }}
      className={classNames('flex')}
    >
      <div className={classNames('flex', styles.filterTypes)}>
        <div className={classNames('multiNone', styles.typeInputBox)}>
          <Controller
            control={control}
            name='types'
            render={({ field: { value, onChange } }) => (
              <Select
                isMulti={true}
                isSearchable={true}
                isClearable={true}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                maxMenuHeight={180}
                menuPlacement={'auto'}

                placeholder='Выбрать'
                classNamePrefix="react-select"
                className={classNames('react-select-container')}
                options={optionsTypes}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {
            watchTypes?.length > 0 &&
            <div className={'textSelect'}>
              Выбрано {watchTypes?.length}/{optionsTypes.length}
            </div>
          }
        </div>
      </div>
      <div className={classNames('flex')}>
        {/* <button
          onClick={() => setValue('project', [])}
          className={classNames('flex', styles.controlBtn, styles.fillSVG)}
          type="button"
        >
          <DeleteIcon />
        </button> */}
        <button
          className={classNames('flex', styles.controlBtn, styles.fillSVG)}
          type='submit'
        >
          <CheckIcon />
        </button>
      </div>
    </form>
  )
}
