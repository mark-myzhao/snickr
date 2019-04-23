// manage the localstorage used in the project
// import axios from 'axios'

const userKeys = ['uemail', 'uname', 'nickname']

export default {
  setUserInfo: (userInfo) => {
    localStorage.setItem(userKeys[0], userInfo.uemail)
    localStorage.setItem(userKeys[1], userInfo.uname)
    localStorage.setItem(userKeys[2], userInfo.nickname)
  },
  clearUserInfo: () => {
    for (let key of userKeys) {
      localStorage.removeItem(key)
    }
  },
  setToken: (token) => {
    localStorage.setItem('token', token)
  },
  clearToken: () => {
    localStorage.removeItem('token')
  }
}
