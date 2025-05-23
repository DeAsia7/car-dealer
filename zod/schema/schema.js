import { mysqlTable, int, varchar, decimals, tinyint} from 'drizzle-orm/mysql-core';

export const cars = mysqlTable('cars', {
    id: int('int').primaryKey().autoincrement(),
    make: varchar('make', { length: 255 }),
    model: varchar('model', { length: 255 }),
    year: int('year').notNull(),
    price: decimals('price', { precision: 10, scale: 2 }),
    color: varchar('color', { length: 255 }),
})

export const clients = mysqlTable('clients', {
    id: ('int').primaryKey().autoincrement(),
    first_name: varchar('first_name', { length: 255 }),
    last_name: varchar('last_name', { length: 255 }),
    age: int('age'),
    is_premium: tinyint('is_premium'),
})

export const sales = mysqlTable('sales', {
    id: int('id').primaryKey().autoincrement(),
    car_id: int('car_id'),
    client_id: int('client_id'),
    sale_date: datetime('sale_date', { length: 255 }),
    
})

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    username: varchar('username', { length: 255 }),
    password: varchar('password', { length: 255 }),
})