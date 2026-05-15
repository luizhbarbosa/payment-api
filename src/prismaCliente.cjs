const { PrismaClient } = require('@prisma/client');

// Deixe o construtor vazio. O Prisma vai ler o motor do node_modules automaticamente.
const prisma = new PrismaClient();

module.exports = prisma;