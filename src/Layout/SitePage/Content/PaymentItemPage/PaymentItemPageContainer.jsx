import React from 'react';
import PaymentItemPage from './PaymentItemPage';

export default function PaymentItemPageContainer(props) {

  // const dispatch = useDispatch();
  // const project = useSelector(selectProjectItem);
  // const allProjects = useSelector(selectProjects)

  // let { invoicesId } = useParams();

  // useEffect(() => {
  //   dispatch(getProjectItem(projectId))
  //   dispatch(getProjects())
  // }, [dispatch, projectId])

  const payment = {
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
    description: 'Комментарий'
  }


  const allPayment = [
    { name: 'Не кликабельно' },
    { name: 'Не кликабельно' },
    { name: 'Не кликабельно' },
  ]

  return (
    <PaymentItemPage payment={payment} allPayment={allPayment} />
  );
}
