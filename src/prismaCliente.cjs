// src/prismaCliente.cjs
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = prisma;