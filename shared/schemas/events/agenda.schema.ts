import { z } from "zod";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(customParseFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


// ---------------- ZOD SCHEMA ----------------
const agendaItemSchema = z.object({
  "sessionSpeaker": z.string().nonempty("session speaker is required"),
  "sessionTitle": z.string().nonempty("session title is required"),
  "startTime": z
    .string()
    .regex(
        /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)?$/,
        "start time must be in HH:MM format (e.g., 09:00, 2:30 PM)"
    ),
  "endTime": z
    .string()
    .regex(
        /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)?$/,
        "end time must be in HH:MM format (e.g., 14:30, 5:45 pm)"
    )
})
.superRefine((data, ctx) => {
  if (data.startTime && data.endTime) {
    function parseTime(timeStr: string) {
      const formats = ['h:mm A', 'h:mmA', 'HH:mm', 'h:mm'];
      for (const format of formats) {
        const parsed = dayjs(timeStr, format);
        if (parsed.isValid()) return parsed;
      }
      return null;
    }
    //  startTime user / endTime user 
    const start = parseTime(data.startTime);
    const end = parseTime(data.endTime);
    
    if (start && end) {
      //  startTime event / endTime event 
      const minTime = dayjs('7:00 AM', 'h:mm A');
      const maxTime = dayjs('7:00 PM', 'h:mm A');
      
      if (!start.isSameOrAfter(minTime) || !start.isSameOrBefore(maxTime)) {
        ctx.addIssue({
          code: "custom",
          path: ["startTime"],
          message: "Start time must be between 7:00 AM and 7:00 PM",
        });
      }
      
      if (!end.isSameOrAfter(minTime) || !end.isSameOrBefore(maxTime)) {
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "End time must be between 7:00 AM and 7:00 PM",
        });
      }
      
      if (!end.isAfter(start)) {
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "End time must be after start time",
        });
      }
      
    
      const twoHoursLater = start.add(2, 'hour');
      if (!end.isSameOrBefore(twoHoursLater)) {
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "Session duration cannot exceed 2 hours",
        });
      }
    }
  }
});


export const agendaSchema = z.array(agendaItemSchema).min(1, "Agenda must contain at least 1 item").max(20, "Agenda cannot exceed 20 items");


export type AgendaItemType = z.infer<typeof agendaItemSchema>;
export type AgendaType = z.infer<typeof agendaSchema>