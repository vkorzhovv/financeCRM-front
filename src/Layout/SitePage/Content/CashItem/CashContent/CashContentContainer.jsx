import React, { useEffect } from 'react';
import { getItems } from '../../../../../redux/cashItemReducer';
import { selectFilteredItems } from '../../../../../redux/cashItemSelector';
import { useDispatch, useSelector } from 'react-redux';
import CashContent from './CashContent';

export default function CashContentContainer(props) {

  const dispatch = useDispatch()
  const items = useSelector(selectFilteredItems)

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  return (
    <CashContent
      items={items}
      isOpenPopup={props.isOpenPopup}
      handleClickClose={props.handleClickClose}
      handleClickOpen={props.handleClickOpen}
    />
  );
}
