import React, { useState } from 'react';
import styles from './pagecontrols.module.css';
import classNames from 'classnames';

export default function PageControls(props) {

  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  return (
    <div className={classNames('flex', styles.pageControls)}>
      <div className={classNames(styles.pageControlItem, styles.findBlock)}>
        <input className={
          isVisible
            ? classNames(styles.searchInput, styles.searchVisible)
            : styles.searchInput}
          placeholder='Введите запрос'></input>
        <button className={classNames(styles.searchBtn)} onClick={handleClick}>
          Искать
        </button>
      </div>
      <div className={classNames(styles.pageControlItem, styles.settingsBlock)}>
        <button className={classNames(styles.settingsBtn)}>
          Настройки
        </button>
      </div>
      {props.detail &&
        <div className={classNames(styles.pageControlItem, styles.deleteBlock)}>
          <button className={classNames('btn', 'btnTransparent', styles.deleteBtn)}>
            Удалить
          </button>
        </div>
      }
      <div className={classNames(styles.pageControlItem, styles.addBlock)}>
        <button
          className={classNames('btn', styles.addBtn)}
          onClick = {props.handleClickAdd}
        >
          {props.addBtnText}
        </button>
      </div>
    </div>
  );
}
