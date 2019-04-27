// manage the localstorage used in the project
// import axios from 'axios'

// const userKeys = ['uemail', 'uname', 'nickname']

const setToken = (token) => {
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const setUser = (user) => {
  localStorage.setItem('uemail', user.uemail)
  localStorage.setItem('uname', user.uname)
  localStorage.setItem('nickname', user.nickname)
}

const getUser = () => {
  return {
    uemail: localStorage.getItem('uemail'),
    uname: localStorage.getItem('uname'),
    nickname: localStorage.getItem('nickname')
  }
}

const clearToken = () => {
  localStorage.removeItem('token')
}

const clear = () => {
  localStorage.clear()
}

export default {
  setToken,
  getToken,
  setUser,
  getUser,
  clearToken,
  clear
}
