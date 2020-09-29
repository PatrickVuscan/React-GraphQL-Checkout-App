import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
    request: any;
    prisma: PrismaClient;
}

export function createContext(request: any): Context {
    return {
        ...request,
        prisma,
    };
}
