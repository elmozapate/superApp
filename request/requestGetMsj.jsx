import { getMsj } from '../connect/api'

const RequestGetMsj = async () => {
  const req = await getMsj({
  })
if (req) {  
  return req
}  
}
export default RequestGetMsj
