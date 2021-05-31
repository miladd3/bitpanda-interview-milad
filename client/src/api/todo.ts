import { AxiosInstance } from 'axios';
import qs from 'query-string';

import { TodoResponse } from '@/models/TodoResponse';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const todo = ($axios: AxiosInstance) => ({
  get(params: {limit?: number; offset?: number}) {
    if (!params) return $axios.get('todo');

    return $axios.get<TodoResponse>(`todo?${qs.stringify(params)}`);
  },
  create(description: string) {
    return $axios.post('todo', { description });
  },
  delete(id: string) {
    return $axios.delete(`todo/${id}`);
  },
});

export default todo;
