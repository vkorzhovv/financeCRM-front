import React, { useState } from 'react';
import EditForm from './ItemContent/EditForm';
import ItemContent from './ItemContent/ItemContent';

export default function PublicationItem(props) {

  const [isEdit, setIsEdit] = useState(false);

  return (
    !isEdit
      ?
      <ItemContent
        setIsEdit={setIsEdit}
        item={props.item}
      />
      :
      <EditForm
        setIsEdit={setIsEdit}
        item={props.item}
      />
  );
}
