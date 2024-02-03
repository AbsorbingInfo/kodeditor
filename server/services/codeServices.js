const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const saveCodeService = async (language, code, output, user, name) => {
	await prisma.code.create({
		data: {
			content: code,
			runtime: language,
			output,
			userId: user.id,
		},
	});
};

const getCodeSnippets = async (user) => {
	const snippets = await prisma.code.findMany({
		where: {
			userId: user.id,
		},
	});
	return snippets;
};

module.exports = {
	saveCodeService,
	getCodeSnippets,
};
