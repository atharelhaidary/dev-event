import { z } from "zod";
import dayjs from "dayjs";
import { agendaSchema, dateSchema, tagsSchema} from ".";
export const eventSchema = z.object({
      title: z.string().nonempty("Title is required"),
      description: z.string().nonempty("Description is required"),
      overview: z.string().nonempty("Overview is required").max(500, "Overview cannot exceed 500 characters"),
      venue: z.string().nonempty("Venue is required"),
      location: z.string().nonempty("Location is required"),
      mode: z.enum(["online", "offline", "hybrid"], { message: "Mode must be erither online or offline or hybrid" }),
      startDate: dateSchema,
      endDate: dateSchema,
      organizer: z.string().nonempty("Organizer is required"),
      tags: tagsSchema,
  
      agenda: agendaSchema,
      //    z.string()
      //       .transform((str, ctx) => {
      //       try {
      //       return JSON.parse(str);
      //       } catch {
      //       ctx.addIssue({
      //             code: "custom",
      //             message: "Invalid agenda format",
      //       });
      //       return z.NEVER;
      //       }
      //       })
      //       .pipe(agendaSchema),
      // image : ImgItemSchema.nullable().optional(),
      // attachments : z.array(ImgItemSchema).nullable().optional()  

}).refine((data) => {
  const start = dayjs(data.startDate);
  const end = dayjs(data.endDate);
  if (!start.isValid() || !end.isValid()) return true; 
  return !end.isBefore(start, 'day');
}, {
  message: "End date cannot be before start date",
  path: ["endDate"]
})
export type EventSchemaType= z.infer<typeof eventSchema>;
















    


