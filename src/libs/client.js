import Axios from 'axios';

export const client = Axios.create({
  baseURL: 'http://178.128.125.242:4043/api'
});
