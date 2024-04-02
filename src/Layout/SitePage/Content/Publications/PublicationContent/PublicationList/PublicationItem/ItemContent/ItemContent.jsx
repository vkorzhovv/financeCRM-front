import React, { useState } from 'react';
import styles from './itemcontent.module.css';
import classNames from 'classnames';
import { editName } from '../../../../../../../../utils/nameEditor';
import { NavLink } from 'react-router-dom';
import { editDate, editTime } from '../../../../../../../../utils/dateEditor';
import DeleteIcon from '../../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../../svgIcons/edit';
import ConfirmDelete from '../../../../../../../common/ConfirmDelete/ConfirmDelete';
import { deletePublication } from '../../../../../../../../redux/publicationsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../../../../../../../../redux/authSelectors';
import { editFileName, editFileNameFull } from '../../../../../../../../utils/fileNameEditor';
import ImgPopup from './ImgPopup/ImgPopup';

export default function ItemContent(props) {

  const dispatch = useDispatch();
  const me = useSelector(selectMe);

  const [filesList, setFilesList] = useState(props.item.files?.slice());
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [fullText, setFullText] = useState(false);

  const [isOpenFullImg, setIsOpenFullImg] = useState(false);
  const handleClickOpenImg = () => {
    setIsOpenFullImg(true)
    document.body.classList.add('modal-show');
  }
  const handleClickCloseImg = (e) => {
    setIsOpenFullImg(false)
    document.body.classList.remove('modal-show');
  }

  const [link, setLink] = useState('')

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

  return (
    <div className={styles.pubItem}>
      <div className={classNames('flex', styles.pubHeader)}>
        <p>Автор:&nbsp;{props.item.author.last_name} {editName(props.item.author.first_name)} {editName(props.item.author.father_name)}</p>
        <h3>Публикация&nbsp; №&nbsp;{Number(props.item.id) + 10000}</h3>
      </div>
      {props.item.project &&
        <div className={classNames('flex', styles.pubProject)}>
          <p>Проект:</p>
          <NavLink
            to={`/projects/${props.item.project.id}`}
          >
            {props.item.project.name}
          </NavLink>
        </div>
      }
      {props.item.text &&
        <div className={styles.pubTextBox}>
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
        </div>
      }
      {filesList.length > 0 &&
        <div className={styles.pubFilesBox}>
          <p>Приложенные документы:</p>
          <div className={classNames('flex', styles.pubFiles, styles.docs)}>
            {
              filesList.filter(item => editFileName(item.file) === '.pdf').map((item) =>
                <div
                  key={item.id}
                  className={classNames('flex', styles.file)}
                >
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.attachmentFieldDocument}>
                    {editFileNameFull(item.file)}
                  </a>
                </div>
              )
            }
          </div>
          <div className={classNames('flex', styles.pubFiles, styles.images)}>
            {
              filesList.filter(item => editFileName(item.file) !== '.pdf').map((item) =>
                <div
                  key={item.id}
                  className={classNames('flex', 'imageBox', styles.image, styles.openImg)}
                  onClick={() => {
                    setLink(item.file)
                    handleClickOpenImg()
                  }}
                >
                  <img
                    src={item.file}
                    className={styles.attachmentFieldDocument} />
                </div>
              )
            }
            {
              isOpenFullImg &&
              <ImgPopup
                file={link}
                handleClickClose={handleClickCloseImg}
              />
            }
          </div>
        </div>
      }
      <div className={classNames('flex', styles.pubBottom)}>
        {
          (props.item.author.id === me.id || me.is_superuser) &&
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
              onClick={() => props.setIsEdit(true)}
              className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
            >
              <EditIcon />
            </button>
          </div>
        }
        <div className={classNames('flex', styles.pubDate)}>
          <p>
            {editDate(props.item.datetime)}
          </p>
          <p>
            {editTime(props.item.datetime)}
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
  );
}
