import axios from 'axios';

const objectAxios = {
  baseURL: 'http://127.0.0.1:8000/',
}

let instance;

document.body.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('logBtn')) {

    if (localStorage.getItem('token')) {
      objectAxios.headers = {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    } else {
      objectAxios.headers = {}
    }
    instance = axios.create(objectAxios);
  }
  else {
    return;
  }
})

export const authAPI = {
  login(name, password) {
    return instance.post('auth/token/login/', {
      username: name,
      password: password,
    })
  },
  logout() {
    return instance.post('auth/token/logout/')
  }
}
