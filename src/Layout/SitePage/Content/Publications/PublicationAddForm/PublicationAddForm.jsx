import React, { useEffect, useState } from 'react';
import styles from './publicationaddform.module.css';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../../../../redux/projectsSelector';
import { selectMe } from '../../../../../redux/authSelectors';
import { getProjects } from '../../../../../redux/projectsReducer';
import classNames from "classnames";
import Select from 'react-select';
import { editDateForInput, editToUTC } from '../../../../../utils/dateEditor';
import LoadingIcon from '../../../../../svgIcons/loading';
import { addPublication, getPublications } from '../../../../../redux/publicationsReducer';

export default function PublicationAddForm(props) {

  const {
    clearErrors,
    setError,
    register,
    getValues,
    setValue,
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const projectsList = useSelector(selectProjects);

  let optionsProjects = [];
  projectsList?.map((item) => {
    optionsProjects.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  useEffect(() => {
    setValue('author', me.id);

    dispatch(getProjects())
  }, [dispatch, setValue, me])

  function arrayFiles(list) {
    const arr = [];
    for (let key in list) {
      arr.push(list[key])
    }
    return arr.slice(0, -2);
  }

  const addItem = (data) => {
    console.log(data)
    dispatch(addPublication(
      {
        author: Number(data.author),
        project: data.project || null,
        text: data.text,
        files: arrayFiles(data.files),
        date: (data.date || data.time) && editToUTC(data.date, data.time),
      }
    ))
      .then(() => {
        reset()
        setValue('showTime', false)
        dispatch(getPublications())
      })
  }

  const onSubmit = (data => {
    addItem(data)
  })

  return (
    <div className={classNames(styles.popupStaticWindow)}>
      <h3 className={classNames('popupHeader', styles.popupHeaderStatic)}>Добавить публикацию</h3>
      <form
        className={classNames('flex', 'popupform', styles.projectForm)}
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          clearErrors('serverError');
        }}
      >
        <input
          {...register('author')}
          type="hidden"
        />
        <div className={!errors.project
          ? classNames('flex', 'popupInputBox', styles.inputBoxStatic)
          : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBoxStatic)}>
          <label className={classNames('popupLabel')}>Проект</label>
          <Controller
            control={control}
            name='project'
            render={({ field: { value, onChange } }) => (
              <Select
                isClearable={true}
                placeholder='Выбрать'
                classNamePrefix="react-select"
                className={classNames('react-select-container')}
                options={optionsProjects}
                value={value ? optionsProjects.find((с) => с.value === value) : ''}
                onChange={(val) => onChange(val?.value)}
              />
            )}
          />
          {errors.project && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.project.message}</div>}
        </div>
        <div className={!errors.text
          ? classNames('popupInputBox', styles.inputBox, styles.inputBoxStatic)
          : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError, styles.inputBoxStatic)}>
          <textarea
            className={!errors.text
              ? classNames('popupInput', 'popupTextarea', styles.input)
              : classNames('popupInput', 'popupError', 'popupTextarea', styles.input, styles.error)}
            type={'text'}
            name='text'
            defaultValue={props.detail && props.invoice.comment}
            placeholder='Комментарий'
            {...register('text', {
              required: 'Введите текст',
            })}
          ></textarea>
          {errors.text && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.text.message}</div>}
        </div>
        <div className={!errors.files
          ? classNames('flex', 'popupInputBox', styles.scansBox, styles.inputBoxStatic)
          : classNames('flex', 'popupInputBox', 'popupBoxError', styles.boxError, styles.scansBox, styles.inputBoxStatic)}>
          <label
            className={classNames('flex', styles.fileLabel)}
            htmlFor="files">
            <p className={styles.labelText}>Прирепить файл</p>
            <div className={classNames('flex', 'popupInput', styles.inputHalf, styles.inputFile)}>Добавить файл <LoadingIcon /></div>

            {arrayFiles(getValues('files')).length ?
              <span className={styles.fileName}>
                {
                  arrayFiles(getValues('files')).length === 1 ?
                    arrayFiles(getValues('files'))[0].name :
                    `Загружено файлов: ${arrayFiles(getValues('files')).length}`
                }
              </span>
              :
              <span className={styles.fileName}>

              </span>
            }
          </label>
          <input
            id='files'
            className={!errors.files
              ? classNames('popupInput', styles.input)
              : classNames('popupInput', 'popupError', styles.input, styles.error)}
            type='file'
            multiple
            accept=".pdf, .jpg, .jpeg, .png"
            name='files'
            {...register('files')}
          />
          {errors.files && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.files.message}</div>}
        </div>

        <div className={classNames('flex', styles.inputCheckBox)}>
          <label className={classNames('popupLabel', styles.checkLabel)} htmlFor="time">Отложить время публикации</label>
          <div className={classNames('flex', styles.checkWrapper)}>
            <input
              className={classNames(styles.inputCheck)}
              type='checkbox'
              name='time'
              id='time'
              {...register('showTime')}
            />
          </div>
        </div>

        {getValues('showTime') &&
          <div>
            <div className={!errors.date
              ? classNames('flex', 'popupInputBox', styles.inputBox, styles.inputBoxStatic)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError, styles.inputBoxStatic)}>
              <label className={classNames('popupLabel', styles.projectLabel)}>Дата публикации</label>
              <input
                className={!errors.date
                  ? classNames('popupInput', styles.inputHalf, styles.input)
                  : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
                type='date'
                name='date'
                {...register('date',
                  {
                    min: {
                      value: new Date(),
                      message: 'Больше Max'
                    }
                  })
                }
              />
              {errors.date && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.date.message}</div>}
            </div>
            <div className={!errors.time
              ? classNames('flex', 'popupInputBox', styles.inputBox, styles.inputBoxStatic)
              : classNames('flex', 'popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError, styles.inputBoxStatic)}>
              <label className={classNames('popupLabel', styles.projectLabel)}>Время публикации</label>
              <input
                className={!errors.time
                  ? classNames('popupInput', styles.inputHalf, styles.input)
                  : classNames('popupInput', 'popupError', styles.inputHalf, styles.input, styles.error)}
                type='time'
                name='date'
                {...register('time')}
              />
              {errors.time && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.time.message}</div>}
            </div>
          </div>
        }
        <div className={classNames('popupBtnsWrapper', styles.btnsWrapper)}>
          <button
            className={classNames('btn', 'btnTransparent')}
            onClick={() => {
              reset()
              setValue('showTime', false)
            }}
            type="button"
          >
            Очистить
          </button>
          <button
            className={'btn'}
            type='submit'
            disabled={!isValid}
          >
            Опубликовать
          </button>
        </div>
      </form>
      {errors.serverError && <div className={'errorForm'}>{errors.serverError.message}</div>}
    </div>
  );
}
