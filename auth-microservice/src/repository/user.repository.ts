import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findAllUsers() {
    return prisma.user.findMany();
  }

  async findUserById(idUser: number) {
    return prisma.user.findUnique({
      where: { idUser },
    });
  }
}