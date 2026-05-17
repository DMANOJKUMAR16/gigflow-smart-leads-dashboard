import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Lead } from "../models/lead.model";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiError } from "../utils/ApiError";

export const createLead = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res
      .status(StatusCodes.CREATED)
      .json(
        apiResponse(true, "Lead created successfully", lead)
      );
  }
);

export const getLeads = asyncHandler(
  async (_req: Request, res: Response) => {
    const leads = await Lead.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res
      .status(StatusCodes.OK)
      .json(apiResponse(true, "Leads fetched", leads));
  }
);

export const getLeadById = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!lead) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "Lead not found"
      );
    }

    res
      .status(StatusCodes.OK)
      .json(apiResponse(true, "Lead fetched", lead));
  }
);

export const updateLead = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!lead) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "Lead not found"
      );
    }

    res
      .status(StatusCodes.OK)
      .json(apiResponse(true, "Lead updated", lead));
  }
);

export const deleteLead = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "Lead not found"
      );
    }

    res
      .status(StatusCodes.OK)
      .json(apiResponse(true, "Lead deleted"));
  }
);