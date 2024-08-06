import { PrismaClient } from '@prisma/client';
import type { AddressDto, CreateAddressDto, UpdateAddressDto } from '../dto/addressDto';


const prisma = new PrismaClient();

export class AddressService {
    async getAllAddresses(): Promise<AddressDto[]> {
        return prisma.address.findMany();
    }

    async getAddressById(idAddress: string): Promise<AddressDto | null> {
        try {
            return await prisma.address.findUnique({
                where: { idAddress: idAddress },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async createAddress(data: CreateAddressDto): Promise<AddressDto> {
        try {
            const userExists = await prisma.user.findUnique({
                where: { idUser: data.idUser },
            });

            if (!userExists) {
                throw new Error('User not found');
            }

            return await prisma.address.create({
                data: data,
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async updateAddress(idAddress: string, data: UpdateAddressDto): Promise<AddressDto> {
        try {
            return await prisma.address.update({
                where: { idAddress: idAddress },
                data: data,
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }

    async deleteAddress(idAddress: string): Promise<void> {
        try {
            await prisma.address.delete({
                where: { idAddress: idAddress },
            });
        } catch (error) {
            throw new Error('Internal Server Error');
        }
    }
}