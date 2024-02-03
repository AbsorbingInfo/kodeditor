const axios = require('axios');
const {
	saveCodeService,
	getCodeSnippets,
} = require('../services/codeServices');

const AWS_URL =
	'https://rkkgr2l17i.execute-api.ap-south-1.amazonaws.com/default/code-runner-nodejs';

const executeCodeController = async (req, res) => {
	try {
		const { language, code } = req.body;
		if (!language) {
			res.status(400).json({ message: 'Language required' });
		}
		if (!code) {
			res.status(400).json({ message: 'code required' });
		}
		const encoder = new TextEncoder();
		const binaryData = encoder.encode(code);
		const binaryArray = Array.from(binaryData);
		let response;
		if (language === 'Javascript') {
			response = await axios.post(
				AWS_URL,
				{ code: binaryArray },
				{
					headers: {
						'x-api-key': process.env.AWS_API_KEY,
					},
				},
			);
		}

		res.status(200).json({ output: response.data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const saveCodeController = async (req, res) => {
	try {
		const { language, code, output } = req.body;
		if (!language) {
			res.status(400).json({ message: 'Language required' });
		}
		if (!code) {
			res.status(400).json({ message: 'code required' });
		}
		if (!output instanceof Array) {
			res.status(400).json({ message: 'output required' });
		}
		await saveCodeService(language, code, output, req.user);
		res.status(200).json({ message: 'Snippet saved successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getCodeSnippetsController = async (req, res) => {
	try {
		const snippets = await getCodeSnippets(req.user);
		res.status(200).json({ snippets });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	executeCodeController,
	saveCodeController,
	getCodeSnippetsController,
};
