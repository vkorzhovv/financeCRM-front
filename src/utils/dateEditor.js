export function editDate(key) {
  const date = new Date(key)

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`
}

export function editTime(key) {
  const date = new Date(key)

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hours}:${minutes}`
}

export function editToUTC(date, time) {
  const dateArr = date ? date.split('-') : null;
  const timeArr = time ? time.split(':') : null;

  const now = new Date();
  const nowMilisecond = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()).getTime();
  const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
  const diff = (nowUTC - nowMilisecond);

  const resultMilisecond = new Date(
    dateArr ? dateArr[0] : now.getFullYear(),
    dateArr ? dateArr[1] : now.getMonth(),
    dateArr ? dateArr[2] : now.getDate(),
    timeArr ? timeArr[0] : now.getHours(),
    timeArr ? timeArr[1] : now.getMinutes()
  ).getTime();

  const resDate = new Date(resultMilisecond - diff)
  const timeToServer = `${resDate.getFullYear()}-${resDate.getMonth()}-${resDate.getDate()}T${resDate.getHours()}:${resDate.getMinutes()}`

  return timeToServer;
}

export function editDateForInput(key) {

  const date = new Date(key)

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = key.getFullYear();

  return `${year}-${month}-${day}`
}
