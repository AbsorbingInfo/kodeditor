const express = require('express');
const userRoutes = require('./userRoutes');
const codeRoutes = require('./codeRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/code', codeRoutes);

module.exports = router;
