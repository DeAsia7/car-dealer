/*

--1.cars:
-most expensive cars
max or order by + limit

select max(price) from cars

await db.select({value: max(price) }).from(cars)

router.get('/most-expensive', async (req, res) => {
const result = await db.select({value: max(price) }).from(cars)
res.json(result)
})

--2. clients
-all clients tht have bought cars. full name in a single record,,concat
 
select concat(first_name,' ', last_name) from clients
join sales on client_id = sales.client_id

await db.select(value: concat(first_name,' ', last_name) ).from(clients)
.join(sales, eq('client_id', 'sales.client_id'))

router.get('/bought-cars', async (req, res) => {
const result = await db.select({full_name: sql.`CONCAT(${clients.first_name},'', ${clients.last_name})`.as('full_name') })
.from(sales)
.innerJoin(clients, eq(sales.client_id, clients.id))
res.json(result)




3.sales
--create another sale report including name, car make model price year and color
date of sale

 router.get('/sales-report', async (req, res) => {
    const result = await db.select()
    client_name: sql`CONCAT(${clients.first_name}, ' ', ${clients.last_name})`,
    make: cars.make,
    model: cars.model,
    price: cars.price,
    year: cars.year,
    color: cars.color,
    date_of_sale: sales.sale_date
    })
    .from(sales)
    .innerJoin(clients, eq(sales.client_id, clients.id))
    .innerJoin(cars, eq?(cars.id, sales.car_id))

select 

INSERT INTO cars (make, model, year,price) VALUES('Toyota', 'Camry', 2025, 30000.21),
('Nissan', 'Versa', 2016, 10000), ('Chevrolet', 'Impala', 1967, 15000);

--------------------------------------------------------

*/
