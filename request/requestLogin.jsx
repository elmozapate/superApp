import { login } from '../connect/api'

const RequestLogin = async (msj) => {
  const req = await login({
    'user': msj.user,
    'password': msj.password
  })
  if (req) {
    return req
  }
}
export default RequestLogin
