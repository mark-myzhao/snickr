// manage the localstorage used in the project
// import axios from 'axios'

export default {
  userInfo: {
    uemail: 'abc',
    uname: 'aaa',
    nickname: '233'
  },
  hasLogin: () => {
    return this.userInfo == null
  }
}
