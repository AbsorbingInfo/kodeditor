const express = require('express');
const { verifyToken } = require('../middlewares/verifyAuth');
const {
	executeCodeController,
	saveCodeController,
	getCodeSnippetsController,
} = require('../controllers/codeController');

const router = express.Router();

router.post('/execute', verifyToken, executeCodeController);
router.post('/save', verifyToken, saveCodeController);
router.get('/all', verifyToken, getCodeSnippetsController);

module.exports = router;
