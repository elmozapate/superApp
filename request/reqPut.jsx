import { putMsj } from '../connect/api'

const Putmsj = async (msj) => {
  const req = await putMsj({
    msj,
  })
if (req) {  
  return req
}  
}
export default Putmsj