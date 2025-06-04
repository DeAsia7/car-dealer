import express from 'express';
import carRoutes from './routes/cars.js';
import clientRoutes from './routes/clients.js';
import salesRoutes from './routes/sales.js';
import authRoutes from './routes/auth.js';
import {logger} from './middlewares/logger.js';
import {verifyToken } from './middlewares/token.js';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = 3000

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());
app.use(logger);

app.use(authRoutes);

app.use('/cars', verifyToken, carRoutes);
app.use('/' , verifyToken, clientRoutes);
app.use('/', verifyToken, salesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


 