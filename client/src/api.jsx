// client/src/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  
});

export default instance;

export const fetchJobs = () => instance.get('/jobs');
export const fetchJobById = (id) => instance.get(`/jobs/${id}`);
export const addJob = (data) => instance.post('/jobs', data);

