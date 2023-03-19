import { Get } from '../server'

export function getUserInfo (id) {
  return Get('/user/info', { id })
}

const userApi = {
  getUserInfo
}
export default userApi
