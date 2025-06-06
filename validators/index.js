import { z } from 'zod';


//login schema 
export const loginSchema = z.object({
    username: z.string().min(1),
password: z.string().min(6)
});

//clients schema
export const clientSchema = z.object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    age: z.number().int().min(18),
    is_preminum: z.boolean()
});

//sales schema
export const saleSchema = z.object({
    client_id: z.number().int(),
    car_id: z.number().int()
});

//car schema 
export const carSchema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int().gte(1980).lte( new Date().getFullYear() + 1),
    price: z.number().positive(),
    color: z.string().min()
});



