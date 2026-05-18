import { Request, Response,NextFunction, } from "express";
import { StatusCodes } from "http-status-codes";

import { Lead, LeadStatus } from "../models/lead.model";
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
  async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const search = (req.query.search as string) || "";

    const status = (req.query.status as string) || "";

    const filter: any = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          company: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(StatusCodes.OK).json(
      apiResponse(true, "Leads fetched", {
        leads,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      })
    );
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

export const getLeadStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: LeadStatus.NEW,
    });

    const contactedLeads = await Lead.countDocuments({
      status: LeadStatus.CONTACTED,
    });

    const qualifiedLeads = await Lead.countDocuments({
      status: LeadStatus.QUALIFIED,
    });

    const wonLeads = await Lead.countDocuments({
      status: LeadStatus.WON,
    });

    const lostLeads = await Lead.countDocuments({
      status: LeadStatus.LOST,
    });

    res.status(StatusCodes.OK).json(
      apiResponse(true, "Lead statistics fetched", {
        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        wonLeads,
        lostLeads,
      })
    );
  }
);

export const updateLeadStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!lead) {
      return next(
        new ApiError(
          StatusCodes.NOT_FOUND,
          "Lead not found"
        )
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Lead status updated",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};
  