import { PrismaClient } from '@prisma/client';
import type { UserDto } from '../dto/userDto';

const prisma = new PrismaClient();

export class UserService {
    async getAllUsers(): Promise<UserDto[]> {
      return prisma.user.findMany();
    }
  
    async getUserById(idUser: number): Promise<UserDto | null> {
      return prisma.user.findUnique({
        where: { idUser },
      });
    }
  }