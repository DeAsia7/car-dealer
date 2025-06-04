import express from 'express';
import { db, cars } from '../db/db.js';
import { eq, like, and, gt} from 'drizzle-orm';

const router = express.Router();

// list cars after 2020
router.get('/after-2020', async (req, res) => {
    const result = await db.select().from(cars).where(gt(cars.year,2020));
    res.json(result);
})

//change price of a car
router.put('/update-price', async (req, res) => {
   const result =  await db.update(cars).set({price: 400}).where(eq(cars.id, 1));
    res.json({message: 'Price updated successfully', result});
})


//remove a car
router.delete('/delete', async (req, res) => {
   const result =  await db.delete(cars).where(lte(cars.year, 2008));

    res.json({ message: 'Car deleted successfully', result });
})


//add 3 new cars post is adding
router.post('/add', async (req, res) => {
await db.insert(cars).values([
        { make: 'Toyota', model: 'Camry', year: 1986, price: 13000, color: blue },
        { make: 'Honda', model: 'Accord', year: 2023, price: 20000, color: red },
        { make: 'Ford', model: 'Mustang', year: 2023, price: 30000, color: black },
    ]);
    res.json({ message: 'Cars added successfully' });
})

//cars tht are red and start with m
router.get('/red-m%', async (req, res) => {
    const result = await db.select().from(cars).where(and(eq(cars.color, 'red'), like(cars.make, 'm%')));
    res.json(result);
})

export default router;





/*
GET - Fetch data app.get('/items', handler)
POST -  Add data app.post('/items', handler)
PUT - Update app.put('/items/:id', handler)
Patch - changes specific data app.patch('/items/:id', handler)
DELETE - Remove app.delete('/items/:id', handler)
*/
