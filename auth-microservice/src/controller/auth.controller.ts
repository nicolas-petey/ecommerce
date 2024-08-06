import type { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import type { LoginDto, RegisterDto } from '../dto/authDto';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const registerDto: RegisterDto = req.body;

  try {
    const user = await authService.register(registerDto);
    res.status(201).json({ message: "Utilisateur créé avec succès.", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const loginDto: LoginDto = req.body;

  try {
    const token = await authService.login(loginDto);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};