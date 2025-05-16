import {relations} from 'drizzle-orm';
import {cars, clients, sales} from './schema.js';

//cars-> sales
export const carRelations = relations(cars, ({many}) => ({
    sales: many(sales),
})); 