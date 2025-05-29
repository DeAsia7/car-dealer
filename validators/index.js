import { z } from 'zod';

//building schemsd for each body 

//login schema 
export const loginSchema = z.object({
    username: z.string().min(1), 
    password: z.string().min(6)
});


//client schema
export const clientSchema = z.object({
   first_name: z.string().min(2),
    last_name: z.string().min(2),
    age: z.number().int(18),
    is_premium: z.boolean(),
});

//sales schema 
export const salesSchema = z.object({
    client_id: z.number().int(),
    car_id: z.number().int(), 
});
 
