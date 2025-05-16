import {relations} from 'drizzle-orm';
import {cars, clients, sales} from './schema.js';

//cars -> sales
export const carRelations = relations(cars, ({many}) => ({
    sales: many(sales),
})); 

//clients -> sales
export const clientRelations = relations(clients, ({many}) => ({
    sales: many(sales),
}));
// sale -> client and car
export const salesRelations = relations(sales, ({one}) => ({
    car: one(cars, {
        fields: [sales.car_id],
        references: [cars.id],
    }),
    client: one(clients, {
        fields: [sales.client_id],
        references: [clients.id],
    }),
}));