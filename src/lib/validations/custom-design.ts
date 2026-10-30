import { z } from "zod";

export const customDesignSchema = z.object({
  pieceType: z.string().min(1, "Please select a piece type"),
  intendedWearer: z.string().optional(),
  occasion: z.string().optional(),
  styleNotes: z.string().min(10, "Please provide at least a brief description (10+ characters) of your idea"),
  mustHaveDetails: z.string().optional(),
  exclusions: z.string().optional(),
  preferredMetal: z.string().optional(),
  preferredGemstone: z.string().optional(),
  ringOrWristSize: z.string().optional(),
  budgetRange: z.string().min(1, "Please select a budget range"),
  needAstrologyConsultation: z.boolean().default(false),
  targetDate: z.string().optional(),
  customerName: z.string().min(2, "Please enter your name"),
  customerContactMethod: z.enum(["phone", "whatsapp", "email"]),
  customerContactValue: z.string().min(5, "Please enter valid contact information"),
  preferredContactTime: z.string().optional(),
  city: z.string().optional(),
  marketingOptIn: z.boolean().default(false),
  privacyAcknowledged: z.literal(true, {
    message: "You must acknowledge the privacy notice to proceed",
  }),
});

export type CustomDesignInput = z.infer<typeof customDesignSchema>;
