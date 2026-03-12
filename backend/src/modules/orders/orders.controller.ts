import { Request, Response } from "express";
import { prisma } from "../../config/db.js";

export const createOrder = async (req: Request, res: Response) => {
  const order = await prisma.order.create({
    data: {
      buyerId: req.body.buyerId,
      status: "PLACED",
      totalAmount: req.body.totalAmount,
      items: {
        create: req.body.items
      }
    },
    include: { items: true }
  });

  return res.status(201).json(order);
};

export const trackOrder = async (req: Request, res: Response) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: true }
  });
  if (!order) return res.status(404).json({ message: "Order not found" });
  return res.json(order);
};
