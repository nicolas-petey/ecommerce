import type { Request, Response } from 'express';
import { UserService } from '../service/user.service';

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
    const user = await userService.getUserById(Number(idUser));

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l’utilisateur.' });
  }
};