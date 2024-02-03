const { registerService, loginService } = require('../services/userServices');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username) {
			res.status(401).json({ message: 'username requied' });
		}
		if (!password) {
			res.status(401).json({ message: 'password requied' });
		}
		await registerService({ username, password });

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const loginController = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username) {
			res.status(401).json({ message: 'username requied' });
		}
		if (!password) {
			res.status(401).json({ message: 'password requied' });
		}
		const user = await loginService({ username, password });

		const tokenPayload = {
			id: user.id,
			username: user.username,
		};
		const token = jwt.sign(tokenPayload, process.env.SECRET_TOKEN, {
			expiresIn: '6h',
		});

		res.cookie('token', token, {
			domain: 'https://kodeditor-sigma.vercel.app',
			httpOnly: true,
			path: '/',
			sameSite: false,
		});
		res.status(200).json({ message: 'User logged in successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	registerController,
	loginController,
};
