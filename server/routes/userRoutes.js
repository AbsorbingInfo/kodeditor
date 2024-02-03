const express = require('express');
const {
	registerController,
	loginController,
} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/verifyAuth');
const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/verify', verifyToken, (req, res) => {
	try {
		res.status(200).json({ message: 'User verified' });
	} catch (error) {
		res.status(404).json({ message: 'Invalid token' });
	}
});

module.exports = router;
