import { Request, Response } from "express";
import { prisma } from "../../config/db.js";

export const listProducts = async (req: Request, res: Response) => {
  const { query, categoryId } = req.query;
  const products = await prisma.product.findMany({
    where: {
      approved: true,
      name: query ? { contains: String(query), mode: "insensitive" } : undefined,
      categoryId: categoryId ? String(categoryId) : undefined
    },
    include: { category: true, seller: true }
  });

  return res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({ data: req.body });
  return res.status(201).json(product);
};
