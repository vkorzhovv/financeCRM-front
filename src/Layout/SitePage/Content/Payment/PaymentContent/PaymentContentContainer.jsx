import React from 'react';
import PaymentContent from './PaymentContent';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

export default function PaymentContentContainer(props) {

  // const dispatch = useDispatch()
  // const projects = useSelector(selectProjects)

  // useEffect(() => {
  //   dispatch(getProjects())
  // }, [dispatch])

  const payment = [
    {
      id: 5,
      number_payment: 'Платеж 1',
      number_check: 'Счет 1',
      project: 'Проект 1',
      recipient: {
        first_name: 'Валик',
        last_name: 'Даник',
        father_name: 'Петр'
      },
      payer: {
        first_name: 'Игорь',
        last_name: 'Вова',
        father_name: 'Иннокентий'
      },
      date: new Date(),
      status: true,
      summ_plus: '100000',
      summ_minus: '50000',
    },
    {
      id: 6,
      number_payment: 'Платеж 1',
      number_check: 'Счет 1',
      project: 'Проект 1',
      recipient: {
        first_name: 'Валик',
        last_name: 'Даник',
        father_name: 'Петр'
      },
      payer: {
        first_name: 'Игорь',
        last_name: 'Вова',
        father_name: 'Иннокентий'
      },
      date: new Date(),
      status: false,
      summ_plus: '400000',
      summ_minus: '20000',
    },
    {
      id: 7,
      number_payment: 'Платеж 1',
      number_check: 'Счет 1',
      project: 'Проект 1',
      recipient: {
        first_name: 'Валик',
        last_name: 'Даник',
        father_name: 'Петр'
      },
      payer: {
        first_name: 'Игорь',
        last_name: 'Вова',
        father_name: 'Иннокентий'
      },
      date: new Date(),
      status: true,
      summ_plus: '600000',
      summ_minus: '80000',
    },
  ]

  return (
    <PaymentContent
      payment={payment}
    />
  );
}
