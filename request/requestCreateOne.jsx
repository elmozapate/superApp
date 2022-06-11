import { createPage } from '../connect/api'

const RequestCreateOne = async (texto, arrayInWait) => {
  console.log(arrayInWait);
  const req = await createPage({
    name: texto.name,
    color: texto.color,
    password: texto.password,
    sections: arrayInWait,
    logoSrc: texto.logo
  })
  if (req) {
    return req
  }
}
export default RequestCreateOne