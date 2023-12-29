import React from 'react';
import InvoicesItemPage from './InvoicesItemPage';

export default function InvoicesItemPageContainer(props) {

  // const dispatch = useDispatch();
  // const project = useSelector(selectProjectItem);
  // const allProjects = useSelector(selectProjects)

  // let { invoicesId } = useParams();

  // useEffect(() => {
  //   dispatch(getProjectItem(projectId))
  //   dispatch(getProjects())
  // }, [dispatch, projectId])

  const invoice = {
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
    description: 'Комментарий'
  }

  const allInvoices = [
    { name: 'Не кликабельно' },
    { name: 'Не кликабельно' },
    { name: 'Не кликабельно' },
  ]

  return (
    <InvoicesItemPage invoice={invoice} allInvoices={allInvoices} />
  );
}
