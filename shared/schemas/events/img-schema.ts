import { z } from 'zod';

const FileSchema = z.custom<File>((val) => {
  return val instanceof File;
}, {
  message: "Image Must be a valid File object"
});




export const ImgItemSchema =  z.object({
    url : z.union([
      FileSchema,
      z.string().refine(val => 
        val === '' || val.startsWith('http') , 
        { message: "Image URL Must be a valid URL starting with http:// or https://" }
      )
    ]).nullable().optional(),  
    action : z.enum(['delete', 'replace', 'keep','add'],{ message:"Image Action must be 'delete', 'replace', 'add' or 'keep'"}).nullable().optional() 
})