import axios from 'axios';
import { API_URL } from '../utils/constants';

export const registerService = async (username, password) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/register`,
			{ username, password },
			{
				withCredentials: true,
			},
		);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};

export const loginService = async (username, password) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/login`,
			{ username, password },
			{
				withCredentials: true,
			},
		);
		console.log(response);
		return response;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};

export const verifyToken = async () => {
	try {
		const response = await axios.get(`${API_URL}/user/verify`, {
			withCredentials: true,
		});
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
