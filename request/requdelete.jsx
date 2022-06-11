import { deltMsj } from '../connect/api'

const Rdel = async (msj) => {
  const req = await deltMsj({
    msj,
  })
if (req) {  
  return req
}  
}
export default Rdel
