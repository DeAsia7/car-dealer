--learning zod --

Instructions for Students
Before starting:
1.	Visit the official documentation: https://zod.dev/
2.	For each task below, write the Zod schema.
⸻


/////////////////////////////////
----------Classwork 1: Basic Object Validation (Easy)--
Objective:
Validate a user object with required fields.
{
username: "andrea",
password: "supersecret"
}
Requirements:
•	username: must be a non-empty string
•	password: at least 8 characters long

import { z } from 'zod';
export const loginSchema = z.object({
    username: z.string().min(1), 
    password: z.string().min(8, "password must be at least 8 characters long")
});


⸻
------Classwork 2: Type Inference + Optional Fields (Beginner/Medium)--
Objective:
Validate a product object and use Zod’s .infer to define a TypeScript type.
{
name: "iPhone 16",
price: 1199.99,
onSale: true
}
Requirements:
•	name: required string
•	price: required number > 0
•	onSale: optional boolean (default: false)

import { z } from 'zod';
export const productSchema = z.object({
    name: z.string(),
    price: z.number().typeof('number').min(1),
    onSale: z.boolean().optional().default(false)
})
const result = productSchema.safeparse(productData);
if (result.success) {
    const validatedData = result.data;
    console.log("Validated Data:", validatedData);
} else {
    console.error("Validation Errors:", result.error.errors);
}
}


⸻
------Classwork 3: Arrays and Enums (Medium)--
Objective:
Validate a course enrollment form.
{
name: "Sebastian",
courses: ["HTML", "CSS", "React"]
}
Requirements:
•	name: string
•	courses: array of strings, but only allow values from a set: ["HTML", "CSS", "JS", "React", "Node"]
•	Must have at least 1 course and max 5.

import { z } from 'zod';
export const courseSchema = z.object({
    name: z.string(),
    courses: z.array(z.enum(["HTML", "CSS", "React"])).min(1).max(5)
})


/*const course = ["HTML", "CSS", "JS", "React", "Node"] as const

const courseEnum = z.enum(course);
type courseEnum = z.infer<typeof courseEnum>;

const courseEnum = z.enum(["HTML", "CSS", "JS", "React", "Node"]);
courseSchema;

const courseData = {
    name: "Sebastian",
    courses: ["HTML", "CSS", "React"]
};
*/


⸻
------Classwork 4: Nested Object Validation (Medium-Hard)--
Objective:
Validate an order object with a nested client and car object.
{
client: {
id: 22,
name: "Andrea"
},
car: {
make: "Mazda",
year: 2023
}
}
Requirements:
•	client.id: number
•	client.name: string
•	car.make: string
•	car.year: number between 2000 and 2025

import { z } from 'zod';
export const orderSchema = z.object({
    client: z.object({
        id: z.number(),
        name: z.string().min(1)
    }),
    car: z.object({
        make: z.string(),
        year: z.number().min(2000).max(2025)
    })
})

⸻

-----Classwork 5: Custom Error Messages + Refinement (Hard)--
Objective:
Validate a registration form.
{
email: "andrea@gmail.com",
password: "12345678",
confirmPassword: "12345678"
}
Requirements:
•	email: must be a valid email format
•	password: at least 8 characters
•	confirmPassword: must match password
Bonus:
Use .refine() to ensure password === confirmPassword and show a custom error message like:
"Passwords do not match"

import { z } from 'zod';
export const formSchema = z.object({
email: z.string().email("Invalid email format"), 
password: z.number().min(8).refine((val) => val === password, {
    message: "Passwords do not match"
})
})
//this is another example of how to use refine
export const registerSchema = z.object({
    emai: z.string().email("Invalid email format"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]

})








