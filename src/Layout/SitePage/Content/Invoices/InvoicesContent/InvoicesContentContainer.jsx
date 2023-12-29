import React from 'react';
import InvoicesContent from './InvoicesContent';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

export default function InvoicesContentContainer(props) {

  // const dispatch = useDispatch()
  // const projects = useSelector(selectProjects)

  // useEffect(() => {
  //   dispatch(getProjects())
  // }, [dispatch])

  const invoices = [
    {
      id: 5,
      name: 'Счет1',
      project: 'Проект1',
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
      summ: '100000',
      receipt: '50000',
    },
    {
      id: 5,
      name: 'Счет1',
      project: 'Проект1',
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
      summ: '200000',
      receipt: '80000',
    },
    {
      id: 5,
      name: 'Счет1',
      project: 'Проект5',
      recipient: {
        first_name: 'Даниил',
        last_name: 'Даниилов',
        father_name: 'Васильевич'
      },
      payer: {
        first_name: 'Виталий',
        last_name: 'Виталя',
        father_name: 'Коля'
      },
      date: new Date(),
      status: true,
      summ: '1000000',
      receipt: '500000',
    },
  ]

  return (
    <InvoicesContent
      invoices={invoices}
    />
  );
}
