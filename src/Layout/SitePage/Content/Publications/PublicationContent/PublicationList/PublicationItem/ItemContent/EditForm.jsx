import React, { useState } from 'react';
import styles from './itemcontent.module.css';
import classNames from 'classnames';
import { editName } from '../../../../../../../../utils/nameEditor';
import { editDate, editTime } from '../../../../../../../../utils/dateEditor';
import { useDispatch, useSelector } from 'react-redux';
import { editPublication } from '../../../../../../../../redux/publicationsReducer';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import LoadingIcon from '../../../../../../../../svgIcons/loading';
import { selectProjects } from '../../../../../../../../redux/projectsSelector';
import { editFileName, editFileNameFull } from '../../../../../../../../utils/fileNameEditor';

export default function EditForm(props) {

  const dispatch = useDispatch()

  const {
    clearErrors,
    setError,
    register,
    getValues,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const [filesList, setFilesList] = useState(props.item.files?.slice());

  console.log(filesList)

  const projectsList = useSelector(selectProjects);

  let optionsProjects = [];
  projectsList?.map((item) => {
    optionsProjects.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  const handleDeleteFile = (arr, item) => {
    const filtered = arr.filter((el) => el.id !== item.id)
    setFilesList(filtered);
  }

  function arrayFiles(list) {
    const arr = [];
    for (let key in list) {
      arr.push(list[key])
    }
    return arr.slice(0, -2);
  }

  useEffect(() => {
    setValue('author', props.item.author?.id);
    setValue('project', String(props.item?.project?.id))
  }, [dispatch, setValue, props.item])

  const editItem = (data) => {
    dispatch(editPublication(
      {
        id: props.item.id,
        author: Number(data.author),
        project: (data.project === undefined || data.project === 'undefined') ? '' : Number(data.project),
        text: data.text,
        files: arrayFiles(data.files).concat(filesList),
      }
    ))
      .then(() => {
        props.setIsEdit(false)
        console.log(data);
      })
  }

  const onSubmit = (data => {
    editItem(data)
  })

  return (
    <form
      className={styles.editForm}
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        clearErrors('serverError');
      }}
    >
      <input
        {...register('author')}
        type="hidden"
      />
      <div className={styles.pubItem}>
        <div className={classNames('flex', styles.pubHeader)}>
          <p>Автор:&nbsp;{props.item.author.last_name} {editName(props.item.author.first_name)} {editName(props.item.author.father_name)}</p>
          <h3>Публикация&nbsp; №&nbsp;{Number(props.item.id) + 10000}</h3>
        </div>
        <div className={classNames('flex', styles.pubProject)}>
          <p>Проект:</p>
          <div className={styles.pubProjectInputBox}>
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
          </div>
        </div>
        <div className={styles.pubTextBox}>
          <div className={!errors.text
            ? classNames('popupInputBox', styles.inputBox, styles.inputBoxStatic)
            : classNames('popupInputBox', 'popupBoxError', styles.inputBox, styles.boxError, styles.inputBoxStatic)}>
            <textarea
              className={!errors.text
                ? classNames('popupInput', 'popupTextarea', styles.input)
                : classNames('popupInput', 'popupError', 'popupTextarea', styles.input, styles.error)}
              type={'text'}
              name='text'
              defaultValue={props.item.text}
              placeholder='Комментарий'
              {...register('text')}
            ></textarea>
            {errors.text && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.text.message}</div>}
          </div>
        </div>
        <div className={styles.pubFilesBox}>
          <div>
            <label
              className={classNames('flex', styles.fileLabel)}
              htmlFor={`files${props.item.id}`}>
              <div className={classNames('flex', styles.inputFile)}>Добавить файл <LoadingIcon /></div>
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
              id={`files${props.item.id}`}
              type='file'
              multiple
              accept=".pdf, .jpg, .jpeg, .png"
              name='files'
              {...register('files')}
            />
            {errors.files && <div className={classNames('popupErrorMessage', styles.errorMessage)}>{errors.files.message}</div>}
          </div>
          <div className={classNames('flex', styles.pubFiles)}>
            {
              filesList.filter(item => editFileName(item.file) === '.pdf').map((item) =>
                <div
                  key={item.id}
                  className={classNames('flex', styles.file)}
                >
                  <a
                    href={item.file}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className={styles.attachmentFieldDocument}>
                    {editFileNameFull(item.file)}
                  </a>
                  <button
                    onClick={() => handleDeleteFile(filesList, item)}
                    type="button"
                    className={classNames('flex', styles.deleteFileBtn)}
                  >
                    <span className={classNames(styles.horLine, styles.line)}></span>
                    <span className={classNames(styles.verLine, styles.line)}></span>
                  </button>
                </div>
              )
            }
          </div>
          <div className={classNames('flex', styles.pubFiles, styles.images)}>
            {
              filesList.filter(item => editFileName(item.file) !== '.pdf').map((item) =>
                <div
                  key={item.id}>
                  <div
                    className={classNames('flex', 'imageBox', styles.image)}
                  >
                    <img src={item.file} />
                  </div>
                  <button
                    onClick={() => handleDeleteFile(filesList, item)}
                    type="button"
                    className={classNames('flex', styles.deleteFileBtn)}
                  >
                    <span className={classNames(styles.horLine, styles.line)}></span>
                    <span className={classNames(styles.verLine, styles.line)}></span>
                  </button>
                </div>
              )
            }
          </div>
        </div>

        <div className={classNames('flex', styles.pubBottom)}>
          <div className={classNames('flex', styles.btnBox)}>
            <button
              className={styles.editBtns}
              type='button'
              onClick={() => {
                props.setIsEdit(false)
              }}
            >
              Отмена
            </button>
            <button
              className={styles.editBtns}
              type='submit'
            >
              Готово
            </button>
          </div>
          <div className={classNames('flex', styles.pubDate)}>
            <p>
              {editDate(props.item.datetime)}
            </p>
            <p>
              {editTime(props.item.datetime)}
            </p>
          </div>
        </div>
      </div>
    </form >
  );
}
