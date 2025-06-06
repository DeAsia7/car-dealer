import express from 'express';
import { db, sales, cars, clients } from '../db/db.js';
import { eq, sql } from 'drizzle-orm';
  
//use sql when using raw sql ex: concat

const router = express.Router();


//get all sales, including car and client details
router.get('/sales', async (req, res) => {
    const result = await db.select({
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


//get full sales report
router.get('/sales/sales-report', async (req, res) => {
    const result = await db.select({
        client_name: sql `CONCAT(${clients.first_name}, ' ', ${clients.last_name})`.as('client_name'),
        make: cars.make,
        model: cars.model,
        price: cars.price,
        year: cars.year,
        color: cars.color,
        date_of_sale: sales.sale_date,
    }).from(sales)
        .innerJoin(clients, eq(clients.id, sales.client_id))
        .innerJoin(cars, eq(cars.id, sales.car_id));
    res.json(result);

})

//get sales by client id
// the colon is a url path so it goes at the bottom of th router
router.get('/sales/:client_id', async (req, res) => {
    const client_id = parseInt(req.params.client_id);
    const result = await db.select().from(sales).where(eq(sales.client_id, client_id));
    res.json(result);
})


export default router; 

