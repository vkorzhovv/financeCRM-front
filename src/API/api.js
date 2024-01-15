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
  addUser(
    name,
    surname,
    patronymic,
    login,
    password,
    type,
    phone,
    finance,
    descr
  ) {
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

export const projectsAPI = {
  getProjects() {
    return instance.get('/api/projects/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  addProject(
    name,
    description,
    start,
    end,
    price,
    active,
    manager,
    client,
    foreman
  ) {
    return instance.post('/api/projects/',
      {
        name: name,
        description: description,
        start_date: start,
        end_date: end,
        price: price,
        active: active,
        project_manager: manager,
        client: client,
        foreman: foreman
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
  },
  editProject(
    projectId,
    name,
    description,
    start,
    end,
    price,
    active,
    manager,
    client,
    foreman
  ) {
    return instance.patch(`/api/projects/${projectId}/`,
      {
        name: name,
        description: description,
        start_date: start,
        end_date: end,
        price: price,
        active: active,
        project_manager: manager,
        client: client,
        foreman: foreman
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
  },
  getProjectItem(projectId) {
    return instance.get(`/api/projects/${projectId}/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  deleteProject(projectId) {
    return instance.delete(`/api/projects/${projectId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  }
}

export const cashItemAPI = {
  getItems() {
    return instance.get('/api/items/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  addItem(type, name) {
    return instance.post('/api/items/',
      {
        item_type: type,
        name: name,
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
  },
  editItem(itemId, type, name) {
    return instance.patch(`/api/items/${itemId}/`,
      {
        item_type: type,
        name: name,
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
  },
  deleteItem(itemId) {
    return instance.delete(`/api/items/${itemId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  }
}

export const invoicesAPI = {
  getInvoices() {
    return instance.get('/api/invoices/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getUnpaidInvoices() {
    return instance.get('/api/unpaid_invoices/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getDebInvoices() {
    return instance.get('/api/deb_invoices/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  getUnapprovedInvoices() {
    return instance.get('/api/unapproved_invoices/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  addInvoice(
    comment,
    approved,
    type,
    subtype,
    payer,
    receiver,
    project,
    amount,
    date,
  ) {
    return instance.post('/api/invoices/',
      {
        comment: comment,
        approved: approved,
        payment_type: type,
        subtype: subtype,
        payer: payer,
        receiver: receiver,
        project: project,
        amount: amount,
        date: date,
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
  },
  editInvoice(
    invoiceId,
    comment,
    approved,
    type,
    subtype,
    payer,
    receiver,
    project,
    amount,
    date,
  ) {
    return instance.patch(`/api/invoices/${invoiceId}/`,
      {
        comment: comment,
        approved: approved,
        payment_type: type,
        subtype: subtype,
        payer: payer,
        receiver: receiver,
        project: project,
        amount: amount,
        date: date,
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      })
  },
  getInvoiceItem(invoiceId) {
    return instance.get(`/api/invoices/${invoiceId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  deleteInvoice(invoiceId) {
    return instance.delete(`/api/invoices/${invoiceId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  getTypes() {
    return instance.get(`/api/types/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  getSubtypes(typeId) {
    return instance.get(`/api/subtypes/${typeId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
}

export const paymentsAPI = {
  getPayments() {
    return instance.get('/api/payments/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  },
  addPayment(
    date,
    total,
    approved,
    invoice,
    comment,
    scans,
  ) {
    return instance.post('/api/add_payment/',
      {
        date: date,
        total: total,
        approved: approved,
        invoice: invoice,
        comment: comment,
        scans: scans
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
  },
  editPayment(
    paymentId,
    date,
    total,
    approved,
    invoice,
    comment,
  ) {
    return instance.patch(`/api/change_payment/${paymentId}/`,
      {
        date: date,
        total: total,
        approved: approved,
        invoice: invoice,
        comment: comment,
      },
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
  },
  getPaymentItem(paymentId) {
    return instance.get(`/api/payments/${paymentId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  deletePayment(paymentId) {
    return instance.delete(`/api/payments/${paymentId}/`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      }
    )
  },
  getPaymentsInInvoice(invoiceId) {
    return instance.get(`/api/invoice_payments/${invoiceId}/`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
  }
}
