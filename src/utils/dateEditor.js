export function editDate(key) {
  const date = new Date(key)

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`
}


export function editDateForInput(key) {

  const date = new Date(key)

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = key.getFullYear();

  return `${year}-${month}-${day}`
}

export function editTime(key) {
  return key.substring(0, 5)
}
