import z from "zod";

export const tagsSchema = 
                //    z
                //     .string()
                //     .transform((str, ctx)=>{
                //     try {
                //             return JSON.parse(str);
                //         } catch {
                //         ctx.addIssue({
                //                 code: "custom",
                //                 message: "Invalid tags format",
                //         });
                //         return z.NEVER;
                //         }

                //     })
                //     .pipe(
                        z.array(z.string().nonempty("Tag is required"))
                        .superRefine((arr, ctx) => {
                                    arr.forEach((val, i) => {
                                            if (/^\d+$/.test(val)) {
                                            ctx.addIssue({
                                            code: "custom",
                                            path: [i],
                                            message: "Tags cannot be numbers",
                                            });
                                            }
                            });
                    })
                //     )

export type TagsType = z.infer<typeof tagsSchema>