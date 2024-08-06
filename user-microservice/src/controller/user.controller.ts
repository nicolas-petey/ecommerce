import type { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import type { UpdateUserDto } from '../dto/userDto';

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { idUser } = req.params;

    try {
        const user = await userService.getUserById(idUser);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur.' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { idUser } = req.params;
    const data: UpdateUserDto = req.body;

    try {
        const updatedUser = await userService.updateUser(idUser, data);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur.' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { idUser } = req.params;

    try {
        await userService.deleteUser(idUser);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur.' });
    }
}
