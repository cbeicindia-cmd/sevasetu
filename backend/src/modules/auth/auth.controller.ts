import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { prisma } from "../../config/db.js";
import { env } from "../../config/env.js";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role = "BUYER" } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, passwordHash: hash, role }
  });

  return res.status(201).json({ id: user.id, email: user.email, role: user.role });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ role: user.role }, env.jwtSecret, { subject: user.id, expiresIn: "7d" });

  return res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
};
