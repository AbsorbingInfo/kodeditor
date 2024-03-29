const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const port = 8000;
const app = express();

app.use(
	cors({
		origin: ['https://kodeditor-sigma.vercel.app'],
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

const routes = require('./routes');

app.use('/api', routes);

app.listen(port, () => {
	console.log(`Server is running on port:${port}`);
});
