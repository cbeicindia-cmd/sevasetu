import { Request, Response } from "express";
import { prisma } from "../../config/db.js";

export const approveSeller = async (req: Request, res: Response) => {
  const seller = await prisma.seller.update({
    where: { id: req.params.sellerId },
    data: { approved: true }
  });
  return res.json(seller);
};

export const approveProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: { id: req.params.productId },
    data: { approved: true }
  });
  return res.json(product);
};

export const analytics = async (_req: Request, res: Response) => {
  const [users, orders, schemes] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.schemeApplication.count()
  ]);

  return res.json({ users, orders, schemeApplications: schemes });
};
