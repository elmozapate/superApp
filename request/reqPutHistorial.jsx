import { putHistorial } from '../connect/api'

const PutHistorial = async (msj) => {
  const req = await putHistorial({
    msj,
  })
if (req) {  
  return req
}  
}
export default PutHistorial