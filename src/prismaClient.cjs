const prisma = {
	async $transaction(fn) {
		return fn({
			user: {
				async update() {
					throw new Error('Prisma client not configured for runtime execution');
				},
			},
			transaction: {
				async create() {
					throw new Error('Prisma client not configured for runtime execution');
				},
			},
		});
	},
};

module.exports = prisma;