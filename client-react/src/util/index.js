// generate error messages, if any
const validate = (uemail, username, nickname, password, passwordRepeat) => {
  let uemailErrorMessage = null
  let unameErrorMessage = null
  let nicknameErrorMessage = null
  let passwordErrorMessage = null
  let passwordConfirmErrorMessage = null

  // eslint-disable-next-line no-useless-escape
  const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const nameFormat = /^[a-zA-Z0-9_]+$/

  if (!emailFormat.test(uemail)) {
    uemailErrorMessage = 'please provide a valid email address'
  }
  if (!nameFormat.test(username)) {
    unameErrorMessage = 'username can only contain letters, numbers and underline'
  }
  if (!nameFormat.test(nickname)) {
    nicknameErrorMessage = 'nickname can only contain letters, numbers and underline'
  }
  if (!nameFormat.test(password)) {
    passwordErrorMessage = 'password can only contain letters, numbers and underline'
  }

  if (password !== passwordRepeat) {
    passwordConfirmErrorMessage = 'passwords do not match'
  }

  return {
    uemailErrorMessage,
    unameErrorMessage,
    nicknameErrorMessage,
    passwordErrorMessage,
    passwordConfirmErrorMessage
  }
}

export {
  validate
}
