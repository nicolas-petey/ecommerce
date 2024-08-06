import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { LoginDto, RegisterDto } from '../dto/authDto';


const prisma = new PrismaClient();

export class AuthService {
  async register(registerDto: RegisterDto) {
    const { idUser, username, email, password, name, lastName } = registerDto;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("L'utilisateur existe déjà.");
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

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    const token = jwt.sign({ userId: user.idUser, email: user.email }, process.env.JWT_SECRET || '', {
      expiresIn: "1h",
    });

    return token;
  }
}