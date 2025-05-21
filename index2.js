import express from 'express';
import carRoutes from '../zod/routes/cars.js';
import clientRoutes from '../zod/routes/clients.js';
import salesRoutes from '../zod/routes/sales.js';
import authRoutes from '../zod/routes/auth.JS';
import {logger} from './middleware/logger.js';
import {verifyToken } from './middleware/token.js';

const app = express();
const PORT = 3000

app.use(express.json());
app.use(logger);

app.use(authRoutes);

app.use(carRoutes, verifyToken, '/cars')
app.use(clientRoutes, verifyToken, '/')
app.use(salesRoutes, verifyToken, '/')

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})