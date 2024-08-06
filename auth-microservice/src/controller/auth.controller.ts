import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { idUser, username, email, password, name, lastName } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { idUser },
    });

    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        idUser,
        username,
        email,
        password: hashedPassword,
        name,
        lastName,
      },
    });

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

export const login = async (req: Request, res: Response) => {
    const { idUser, password } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { idUser },
      });
  
      if (!user) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect." });
      }
  
      const token = jwt.sign({ userId: user.idUser }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion." });
    }
  };