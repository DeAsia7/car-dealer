import express from 'express';
import { db, sales, cars, clients } from '../db/db.js';
import { eq } from 'drizzle-orm';

const router = express.Router();


//get all sales, including car and client details
router.get('/sales', async (req, res) => {
    const result = await db .select({
        sale_id: sales.id,
        date: sales.sale_date,
        client_name: clients.first_name,
        car_model: cars.model,
        car_make: cars.make,

    }) .from(sales)
        // JOIN clients on clients.id = sales.client_id
        .innerJoin(clients, eq(clients.id, sales.client_id ))

        // JOIN cars on cars.id = sales.car_id
        .innerJoin(cars, eq(cars.id, sales.car_id))
        
    res.json(result);
});

//register a new sale
router.post('/sales', async (req, res) => {
    const {client_id, car_id} = req.body;
    await db.insert(sales).values({client_id, car_id, sale_date: new Date()});
})

//get sales by client id
router.get('/sales/:client_id', async (req, res) => {
    const client_id = parseInt(req.params.client_id);
    const result = await db.select().from(sales).where(eq(sales.client_id, client_id));
    res.json(result);
});