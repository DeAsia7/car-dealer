const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let cars =[
 { id: 1, brand: "Toyota", model: "Corolla", year: 2020, color: "Red" },
    { id: 2, brand: "Honda", model: "Civic", year: 2019, color: "Blue" },
];

//list all cars 
app.get('/cars', (req, res) => {
    res.json(cars);
})

//adding a new car 
app.post('/cars', (req, res) => {
    const newCar = req.body;

    const newId = req.body.id;
    const exists = cars.some(car => car.id === newId);
    if (!newId) {
        return res.status(400).json({ error: `car with Id ${newcar} already exists` });
    }
    cars.push(newCar);
    res.status(201).json(newCar);
})

//delete a car 
app.delete('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id);
    const carIndex = cars.findIndex(car => car.id === carId);

    if (carIndex === -1) {
        return res.status(404).json({ error: `Car with id ${carId} not found` });
    }

    cars = cars.filter(car => car.id !== carId);
    res.send(`Car with id ${carId} deleted successfully`);
})

//get car by brand
app.get(`/cars/brand/:brand`, (req, res) => {
    const brand = req.params.brand;
    const result = cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());

    res.json(result);
})

//challenge: update color
app.patch('/cars/:id/color', (req, res) => {
    const Id = parseInt(req.params.id);
    const [color] = req.body;
    const cars = cars.find(cars => cars.id === Id);

    if (!cars) {
        return res.status(404).json({ error: `cars with ID ${Id} not found.` });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

