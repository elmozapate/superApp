import { getCompanies } from '../connect/api'
const reqGetCompanies = async () => {
    const req = await getCompanies({
    })
  if (req) {  
    return req
  }  
  }
  export default reqGetCompanies