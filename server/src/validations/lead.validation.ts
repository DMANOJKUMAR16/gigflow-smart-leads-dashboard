import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2),

  email: z.string().email(),

  company: z.string().min(2),

  status: z
    .enum([
      "new",
      "contacted",
      "qualified",
      "proposal",
      "won",
      "lost",
    ])
    .optional(),

  assignedTo: z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial();