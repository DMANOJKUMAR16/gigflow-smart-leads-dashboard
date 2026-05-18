import { Router } from "express";

import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  getLeadStats,
  updateLead,
  updateLeadStatus,
  
} from "../controllers/lead.controller";

import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.use(protect);

router.get("/", getLeads);

router.get("/stats/overview", getLeadStats);

router.get("/:id", getLeadById);

router.post(
  "/",
  authorizeRoles("admin"),
  createLead
);

router.put(
  "/:id",
  authorizeRoles("admin"),
  updateLead
);

router.delete(
  "/:id",
  authorizeRoles("admin"),
  deleteLead
);

router.patch(
  "/:id",
  protect,
  updateLeadStatus
);
router.delete(
  "/:id",
  protect,
  deleteLead
);

export default router;