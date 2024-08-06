import { PrismaClient } from '@prisma/client';
import type { UpdateUserDto, UserDto } from '../dto/userDto';

const prisma = new PrismaClient();

export class UserService {
    async getAllUsers(): Promise<UserDto[]> {
        return prisma.user.findMany();
    }

    async getUserById(idUser: string): Promise<UserDto | null> {
        try {
            return await prisma.user.findUnique({
                where: { idUser: idUser },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async updateUser(idUser: string, data: UpdateUserDto): Promise<UserDto | null> {
        try {
            return await prisma.user.update({
                where: { idUser: idUser },
                data: data,
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async deleteUser(idUser: string): Promise<void> {
        try {
            await prisma.user.delete({
                where: { idUser: idUser },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
}