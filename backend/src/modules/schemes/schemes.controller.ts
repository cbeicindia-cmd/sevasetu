import { Request, Response } from "express";
import { prisma } from "../../config/db.js";

export const listSchemes = async (req: Request, res: Response) => {
  const { state, ministry, category, eligibility } = req.query;
  const schemes = await prisma.scheme.findMany({
    where: {
      state: state ? String(state) : undefined,
      ministry: ministry ? String(ministry) : undefined,
      category: category ? String(category) : undefined,
      eligibility: eligibility
        ? { contains: String(eligibility), mode: "insensitive" }
        : undefined
    }
  });

  return res.json(schemes);
};

export const applyScheme = async (req: Request, res: Response) => {
  const application = await prisma.schemeApplication.create({
    data: {
      userId: req.body.userId,
      schemeId: req.body.schemeId,
      status: "SUBMITTED",
      documents: req.body.documents
    }
  });
  return res.status(201).json(application);
};
