import express from 'express';
import { db, clients } from '../db/db.js';
import { eq } from 'drizzle-orm';
import { validateBody } from '../middlewares/validateBody.js';
import { clientSchema } from '../validators/index.js';



const router = express.Router();

//get all clients
router.get('/clients', async (req, res) => {
    const result = await db.select().from(clients);
    res.json(result);
})

//get single record
router.get('/clients/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await db.select().from(clients).where(eq(clients.id, id));
    res.json(result);
})

//add new client
router.post('/clients', validateBody(clientSchema), async (req, res) => {
    const { first_name, last_name, age, is_premium} = req.body;
    await db.insert(clients).values({ first_name, last_name, age, is_premium});
    res.status(201).json({ message: 'Client added successfully' });
})

//update client
router.put('/clients/:id', validateBody(clientSchema),  async(req, res) => {
    const id = parseInt(req.params.id)
    const { first_name, last_name, age, is_premium} = req.body;
    await db.update(clients).set({first_name, last_name, age, is_premium}).where(eq(clients.id, id));
    res.json({ message: 'Client updated successfully' });
})

//deleter client
router.delete('/clients/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    await db.delete(clients).where(eq(clients.id, id));
    res.json({ message: 'Client deleted successfully' });
})

export default router;