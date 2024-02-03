const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const registerService = async ({ username, password }) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: {
			username,
			password: hashedPassword,
		},
	});
	return user;
};

const loginService = async ({ username, password }) => {
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});
	if (!user) {
		throw new Error('User not found');
	}

	bcrypt.compare(user.password, password);
	return user;
};

module.exports = {
	registerService,
	loginService,
};
