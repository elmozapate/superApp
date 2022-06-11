import { getHistorial } from '../connect/api'
const GetHistorial = async () => {
    const req = await getHistorial({
    })
  if (req) {  
    return req
  }  
  }
  export default GetHistorial