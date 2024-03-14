import React, { useState } from 'react';
import styles from './publicationitem.module.css';
import classNames from 'classnames';
import { editName } from '../../../../../../../utils/nameEditor';
import { NavLink } from 'react-router-dom';
import { editFileName } from '../../../../../../../utils/fileNameEditor';
import { editDate, editTime } from '../../../../../../../utils/dateEditor';
import DeleteIcon from '../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../svgIcons/edit';
import ConfirmDelete from '../../../../../../common/ConfirmDelete/ConfirmDelete';
import { useDispatch, useSelector } from 'react-redux';
import { deletePublication, editPublication } from '../../../../../../../redux/publicationsReducer';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import LoadingIcon from '../../../../../../../svgIcons/loading';
import { selectProjects } from '../../../../../../../redux/projectsSelector';

export default function PublicationItem(props) {

  const dispatch = useDispatch()

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

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [fullText, setFullText] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filesList, setFilesList] = useState(props.item.files?.slice());

  const projectsList = useSelector(selectProjects);

  let optionsProjects = [];
  projectsList?.map((item) => {
    optionsProjects.push({
      value: `${item?.id}`, label: `${item?.name}`
    })
  })

  const handleClickOpenDelete = () => {
    setIsOpenDelete(true)
    document.body.classList.add('modal-show');
  }
  const handleClickCloseDelete = () => {
    setIsOpenDelete(false)
    document.body.classList.remove('modal-show');
  }
  const handleDelete = () => {
    dispatch(deletePublication(props.item.id))
      .then(() => document.body.classList.remove('modal-show'))
  }
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
    setValue('author', props.item.author.id);
    setValue('project', String(props.item?.project?.id))
  }, [dispatch, setValue, props.item])

  const editItem = (data) => {
    dispatch(editPublication(
      {
        id: props.item.id,
        author: Number(data.author),
        project: Number(data.project) || null,
        text: data.text,
        files: arrayFiles(data.files).concat(filesList),
      }
    ))
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
        {(props.item.project || isEdit) &&
          <div className={classNames('flex', styles.pubProject)}>
            <p>Проект:</p>
            {!isEdit
              ?
              <NavLink
                to={`/projects/${props.item.project.id}`}
              >
                {props.item.project.name}
              </NavLink>
              :
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
            }
          </div>
        }
        {(props.item.text || isEdit) &&
          <div className={styles.pubTextBox}>
            {
              !isEdit ?
                <div>
                  <p className={styles.pubText}>
                    {
                      props.item.text.length >= 400 && !fullText
                        ?
                        `${props.item.text.substr(0, 400)}...`
                        :
                        `${props.item.text}`
                    }
                  </p>
                  {
                    (props.item.text.length >= 400 && !fullText) &&
                    <button
                      type='button'
                      className={styles.btnFull}
                      onClick={() => setFullText(true)}
                    >
                      Читать полностью
                    </button>
                  }
                </div>
                :
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
            }
          </div>
        }
        {(filesList.length > 0 || isEdit) &&
          <div className={styles.pubFilesBox}>
            {!isEdit ?
              <p>Приложенные документы:</p>
              :
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
            }
            <div className={classNames('flex', styles.pubFiles)}>
              {
                filesList.map((item) =>
                  <div className={classNames('flex', styles.file)}>
                    <a
                      href={item.file}
                      key={item.id}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className={styles.attachmentFieldDocument}>
                      Файл {item.id}
                    </a>
                    {isEdit &&
                      <button
                        onClick={() => handleDeleteFile(filesList, item)}
                        type="button"
                        className={classNames('flex', styles.deleteFileBtn)}
                      >
                        <span className={classNames(styles.horLine, styles.line)}></span>
                        <span className={classNames(styles.verLine, styles.line)}></span>
                      </button>
                    }
                  </div>
                )
              }
            </div>
          </div>
        }
        <div className={classNames('flex', styles.pubBottom)}>
          {!isEdit ?
            <div className={classNames('flex', styles.btnBox)}>
              <button
                type='button'
                onClick={handleClickOpenDelete}
                className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}
              >
                <DeleteIcon />
              </button>
              <button
                type='button'
                onClick={() => setIsEdit(true)}
                className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
              >
                <EditIcon />
              </button>
            </div>
            :
            <div className={classNames('flex', styles.btnBox)}>
              <button
                type='button'
                onClick={() => {
                  setIsEdit(false)
                  reset()
                  setFilesList(props.item.files?.slice())
                  setValue('project', String(props.item?.project?.id))
                }}
              >
                Отмена
              </button>
              <button
                type='submit'
              >
                Готово
              </button>
            </div>
          }
          <div className={classNames('flex', styles.pubDate)}>
            <p>
              {editDate(props.item.date)}
            </p>
            <p>
              {editTime(props.item.time)}
            </p>
          </div>
        </div>
        {
          isOpenDelete &&
          <div
            onClick={e => {
              e.stopPropagation();
            }}>
            <ConfirmDelete
              onDelete={handleDelete}
              closeDelete={handleClickCloseDelete}
            />
          </div>
        }
      </div>
    </form >
  );
}
