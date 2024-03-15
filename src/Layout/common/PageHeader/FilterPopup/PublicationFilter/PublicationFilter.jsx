import classNames from "classnames";
import React, { useEffect } from "react";
import styles from './publicationfilter.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from "../../../../../redux/projectsReducer";
import { selectProjects } from "../../../../../redux/projectsSelector";
import Select from 'react-select';
import { filterPublication } from "../../../../../redux/publicationsReducer";

export default function PublicationFilter(props) {

  const dispatch = useDispatch();
  const projectsList = useSelector(selectProjects);

  let optionsProjects = [];
  projectsList?.map((item) => {
    optionsProjects.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  const {
    clearErrors,
    register,
    reset,
    setValue,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    dispatch(getProjects())
      .then(() => {
        const savedProj = sessionStorage.getItem('publicationProject')
        setValue('project', savedProj ? optionsProjects.filter(item => savedProj.includes(+item.value)) : []);
      })
  }, [dispatch, setValue])

  const onSubmit = (data => {
    dispatch(filterPublication(
      data.project.map(item => +item.value)
    ))
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        clearErrors('serverError');
      }}
      className={classNames('filterForm')}
    >
      <div className={classNames('flex', 'filterHeader')}>
        <h3 className={'filterTitle'}>Фильтр</h3>
        <div>
          <button
            onClick={() => setValue('project', [])}
            className={classNames('btn', 'btnTransparent', 'filterBtn')}
            type="button"
          >
            Сбросить
          </button>
          <button
            className={classNames('btn', 'filterBtn')}
            type='submit'
            disabled={!isValid}
          >
            {'Применить'}
          </button>
        </div>
      </div>
      <div className={classNames('flex', 'filterFields')}>
        <div className={classNames('flex', styles.pubProject)}>
          <p>Проект:</p>
          <div className={styles.pubProjectInputBox}>
            <Controller
              control={control}
              name='project'
              render={({ field: { value, onChange } }) => (
                <Select
                  isMulti={true}
                  isClearable={true}
                  placeholder='Выбрать'
                  classNamePrefix="react-select"
                  className={classNames('react-select-container')}
                  options={optionsProjects}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
