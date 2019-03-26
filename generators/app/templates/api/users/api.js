import request from 'axiox';
import { url, provider } from './config';

const api = {
    provider,
    fetch: params => request.get(`/api${url}`, { params })
        .then(res => res.data)
        .catch(error => error)
};

export default api;
