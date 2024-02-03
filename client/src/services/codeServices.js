import axios from 'axios';
import { API_URL } from '../utils/constants';

export const executeCodeService = async (language, code) => {
	try {
		const response = await axios.post(
			`${API_URL}/code/execute`,
			{ language, code },
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

export const saveCodeService = async (language, code, output) => {
	try {
		const response = await axios.post(
			`${API_URL}/code/save`,
			{ language, code, output },
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

export const getCodeSnippetsService = async () => {
	try {
		const response = await axios.get(`${API_URL}/code/all`, {
			withCredentials: true,
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
		return error.response;
	}
};
