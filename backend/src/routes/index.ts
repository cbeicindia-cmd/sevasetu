import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.js";
import { Role } from "../utils/roles.js";
import { login, signup } from "../modules/auth/auth.controller.js";
import { createProduct, listProducts } from "../modules/marketplace/marketplace.controller.js";
import { createOrder, trackOrder } from "../modules/orders/orders.controller.js";
import { applyScheme, listSchemes } from "../modules/schemes/schemes.controller.js";
import { forecastDemand, generateCaption, generateDescription, suggestPricing } from "../modules/ai/ai.controller.js";
import { awardPoints } from "../modules/incentives/incentives.controller.js";
import { analytics, approveProduct, approveSeller } from "../modules/admin/admin.controller.js";

export const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);

router.get("/marketplace/products", listProducts);
router.post("/marketplace/products", authenticate, authorize(Role.SELLER), createProduct);

router.post("/orders", authenticate, createOrder);
router.get("/orders/:id", authenticate, trackOrder);

router.get("/schemes", listSchemes);
router.post("/schemes/apply", authenticate, applyScheme);

router.post("/ai/description", authenticate, authorize(Role.SELLER), generateDescription);
router.post("/ai/pricing", authenticate, authorize(Role.SELLER), suggestPricing);
router.post("/ai/demand", authenticate, authorize(Role.SELLER), forecastDemand);
router.post("/ai/caption", authenticate, authorize(Role.SELLER), generateCaption);

router.post("/incentives/award", authenticate, awardPoints);

router.patch("/admin/sellers/:sellerId/approve", authenticate, authorize(Role.SUPER_ADMIN, Role.DISTRICT_COORDINATOR), approveSeller);
router.patch("/admin/products/:productId/approve", authenticate, authorize(Role.SUPER_ADMIN, Role.MARKETPLACE_MANAGER), approveProduct);
router.get("/admin/analytics", authenticate, authorize(Role.SUPER_ADMIN, Role.GOVERNMENT_OFFICER, Role.MARKETPLACE_MANAGER), analytics);
