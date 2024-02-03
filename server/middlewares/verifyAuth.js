const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: 'Missing access token' });
		}
		const user = jwt.verify(token, process.env.SECRET_TOKEN);
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(403).json({ message: 'Invalid access token' });
	}
};

module.exports = {
	verifyToken,
};
