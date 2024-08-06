import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthRepository {
  async findUserById(idUser: number) {
    return prisma.user.findUnique({
      where: { idUser },
    });
  }

  async createUser(data: any) {
    return prisma.user.create({
      data,
    });
  }
}