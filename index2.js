import express from 'express';
import carRoutes from './routes/cars.js';
import clientRoutes from './routes/clients.js';
import salesRoutes from './routes/sales.js';

const app = express();
const PORT = 3000

app.use(carRoutes)
app.use(clientRoutes)
app.use(salesRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})