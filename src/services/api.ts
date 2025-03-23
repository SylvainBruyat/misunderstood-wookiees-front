import axios from 'axios';

const API_URL = 'https://misunderstood-wookiees-back.onrender.com/api';

export interface Counter {
  _id: string;
  name: string;
  counterName: string;
  comp: string;
  strategyTips: string;
  noGo: string;
}

export const getCounters = (name?: string) => (name ? axios.get<Counter[]>(`${API_URL}/counters?name=${name}`) : axios.get<Counter[]>(`${API_URL}/counters`));
export const addCounter = (counter: Omit<Counter, '_id'>) => axios.post<Counter>(`${API_URL}/counters`, counter);
export const updateCounter = (id: string, counter: Omit<Counter, '_id'>) => axios.put<Counter>(`${API_URL}/counters/${id}`, counter);
export const deleteCounter = (id: string) => axios.delete(`${API_URL}/counters/${id}`);
export const getCounterById = (id: string) => axios.get<Counter[]>(`${API_URL}/counters/${id}`);
