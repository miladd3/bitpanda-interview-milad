import { AxiosInstance } from 'axios';
import qs from 'query-string';

const todo = ($axios: AxiosInstance) => ({
  getTodo(params: {limit?: number; offset?: number}) {
    if (!params) return $axios.get('todo');

    return $axios.get(`todo?${qs.stringify(params)}`);
  },
});

export default todo;
