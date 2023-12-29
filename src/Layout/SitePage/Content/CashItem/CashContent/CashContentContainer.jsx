import React from 'react';
import CashContent from './CashContent';

export default function CashContentContainer(props) {
  return (
    <CashContent isOpenPopup={props.isOpenPopup} handleClickClose={props.handleClickClose} handleClickOpen={props.handleClickOpen}/>
  );
}
