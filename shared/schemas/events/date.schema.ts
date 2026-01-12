
import { z } from 'zod';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


export const dateSchema = 
  z.string()
  .nonempty("Date is required")
  .transform((inputDate, ctx) => {
    const supportedFormats = [
      'YYYY-M-D',
      'YYYY-MM-DD',
      'D-M-YYYY',
      'DD-MM-YYYY',
      'D/M/YYYY',
      'DD/MM/YYYY',
      'YYYY/MM/DD',
      'YYYY-MM-DDTHH:mm:ss.SSSZ',
      'YYYY-MM-DDTHH:mm:ssZ', 
      'YYYY-MM-DDTHH:mm:ss', 
      'YYYY-MM-DDTHH:mm', 
    ];

    let parsedDate;
    for (const format of supportedFormats) {
      parsedDate = dayjs(inputDate, format, true); 
      if (parsedDate.isValid()) {
        break;
      }
    }

    if (!parsedDate || !parsedDate.isValid()) {
      parsedDate = dayjs(inputDate);
    }

    if (!parsedDate.isValid()) {
      ctx.addIssue({
        code: "custom",
        message: `Invalid date format: "${inputDate}"`,
      });
      return z.NEVER;
    }

    return inputDate 
});




