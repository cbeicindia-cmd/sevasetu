import { Request, Response } from "express";
import { prisma } from "../../config/db.js";

const pointsMap: Record<string, number> = {
  REFER_SELLER: 100,
  PURCHASE: 20,
  SHARE_PRODUCT: 10,
  ONBOARD_ARTISAN: 80
};

export const awardPoints = async (req: Request, res: Response) => {
  const points = pointsMap[req.body.event] ?? 0;

  const incentive = await prisma.userIncentive.create({
    data: {
      userId: req.body.userId,
      eventType: req.body.event,
      points,
      rewardType: req.body.rewardType ?? "REWARD_POINTS"
    }
  });

  return res.status(201).json(incentive);
};
