import axios from 'axios';

const objectAxios = {
  baseURL: 'http://127.0.0.1:8000/',
}

let instance = axios.create(objectAxios);

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
  me() {
    return instance.get('/api/auth/users/me/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  logout() {
    return instance.post('auth/token/logout/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }
}

export const usersAPI = {
  getAllUsers() {
    return instance.get('/api/auth/users/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getClients() {
    return instance.get('/api/clients/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getEmployees() {
    return instance.get('/api/employees/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getContractors() {
    return instance.get('/api/contractors/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getUserItem(userId) {
    return instance.get(`/api/auth/users/${userId}/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  addUser(name, surname, patronymic, login, password, type, phone, finance, descr) {
    return instance.post('/api/auth/users/', {
      first_name: name,
      last_name: surname,
      father_name: patronymic,
      username: login,
      password: password,
      user_type: type,
      phone: phone,
      financial_accounting: finance,
      description: descr
    },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  editUser(userId, name, surname, patronymic, login, type, phone, finance, descr) {
    return instance.patch(`/api/auth/users/${userId}/`, {
      first_name: name,
      last_name: surname,
      father_name: patronymic,
      username: login,
      user_type: type,
      phone: phone,
      financial_accounting: finance,
      description: descr
    },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  deleteUser(userId) {
    return instance.delete(`/api/delete_user/${userId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  }
}
