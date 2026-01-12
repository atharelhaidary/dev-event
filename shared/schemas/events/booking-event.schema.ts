import { z } from 'zod';

export const bookingEventSchema = z.object({
  eventId:
    z.number("Event ID is required")
    .superRefine((val, ctx) => {
      if (val === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Event ID cannot be zero"
        });
      }
    }),
  
    email: z.string("Email is required")
    .superRefine((val, ctx)=>{
      if (!val) {
        ctx.addIssue({
          code: "custom",
          message: "Email is required"
        });
      }
    })
    .transform((email) => email?.trim()?.toLowerCase())
});

export type BookingInput = z.infer<typeof bookingEventSchema>;