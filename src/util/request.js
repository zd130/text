import axios from 'axios'

let request = axios.create({
  baseURL:"http://139.9.169.87:9002/"
  // headers:{

  //   'token':sessionStorage.getItem('set_token')
  // }
})
export default request