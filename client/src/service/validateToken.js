export const checkTokenExpire = (token) => {
  try {
    const decode = JSON.parse(window.atob(token.split('.')[1]))
    const { exp } = decode
    if (Date.now() /1000 > exp) {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}


