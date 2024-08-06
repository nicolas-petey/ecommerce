import type { Request, Response } from 'express';
import { AddressService } from '../service/address.service';
import type { UpdateUserDto } from '../dto/userDto';
import type { CreateAddressDto, UpdateAddressDto } from '../dto/addressDto';

const addressService = new AddressService();

export const getAllAddresses = async (req: Request, res: Response) => {
    try {
        const addresses = await addressService.getAllAddresses();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des adresses." });
    }
};

export const getAddressById = async (req: Request, res: Response) => {
    const { idAddress } = req.params;

        try {
            const address = await addressService.getAddressById(idAddress);
            if (address) {
                res.status(200).json(address);
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l’adresse.' });
    }
};

export const createAddress = async (req: Request, res: Response) => {
    const data: CreateAddressDto = req.body;

    try {
        const newAddress = await addressService.createAddress(data);
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'adresse" });
    }
}

export const updateAddress = async (req: Request, res: Response) => {
    const { idAddress } = req.params;
        const data: UpdateAddressDto = req.body;

        try {
            const updatedAddress = await addressService.updateAddress(idAddress, data);
            if (updatedAddress) {
                res.status(200).json(updatedAddress);
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l’adresse.' });
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    const { idAddress } = req.params;

    try {
        await addressService.deleteAddress(idAddress);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l’adresse.' });
    }
}
