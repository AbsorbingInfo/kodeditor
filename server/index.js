const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const port = 8000;
const app = express();
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
	console.log(`Server is running on port:${port}`);
});
