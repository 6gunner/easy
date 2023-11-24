interface ApiPath {
  [key: string]: string
}

const BASE_URL = '/api';

const urls: ApiPath = {
  getPost: `${BASE_URL}/posts`,
}

export default urls;