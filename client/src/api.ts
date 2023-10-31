import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	// baseURL: 'https://k9c203.p.ssafy.io/api/v1',
	withCredentials: true,
});

export default api;
