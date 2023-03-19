import { Get } from '../server'

export function getRecommend () {
  return Get('/api/getRecommend')
}

export function getAlbum (album) {
  return Get('/api/getAlbum', {
    id: album.id
  })
}

const recommendApi = {
  getRecommend,
  getAlbum
}
export default recommendApi
