import _axios from 'axios';
import { submitTicketArgsType, submitTicketReturnType } from './misc/types';

const axios = _axios.create({ baseURL: 'http://localhost:5000' });

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status !== 555) return Promise.reject(err);
  return axios.request(err.config);
});

export const API = {
  async submitTicket({ selectedNumber }: submitTicketArgsType) {
    try {
      const res = await axios.post<submitTicketReturnType>('ticket', {
        selectedNumber,
      });
      return res.data;
    } catch (error: any) {
      throw error?.response?.data?.error || 'Проверьте подключение к интернету';
    }
  },
};
