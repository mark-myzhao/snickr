// manage the localstorage used in the project

// const userKeys = ['uemail', 'uname', 'nickname']

const setToken = (token) => {
  localStorage.setItem('token', token)
}

const getToken = () => {
  return localStorage.getItem('token')
}

const clearToken = () => {
  localStorage.removeItem('token')
}

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return token !== null && token !== undefined
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

const getUserName = () => {
  return getUser().nickname ? getUser().nickname : 'Guest'
}

const clearUser = () => {
  localStorage.removeItem('uemail')
  localStorage.removeItem('uname')
  localStorage.removeItem('nickname')
}

const clear = () => {
  localStorage.clear()
}

export default {
  setToken,
  getToken,
  clearToken,
  isAuthenticated,
  setUser,
  getUser,
  getUserName,
  clearUser,
  clear
}
