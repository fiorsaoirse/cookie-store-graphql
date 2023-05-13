import { RESTDataSource } from '@apollo/datasource-rest';
import { ITopping } from '.././types/toppings';
import { TOPPINGS } from './data';

export class ToppingsDataSource extends RESTDataSource {

    getToppings(): ITopping[] {
        return TOPPINGS;
    }

    getToppingById(id: string): ITopping | null {
        return TOPPINGS.find(({ id: toppingId }) => id === toppingId) ?? null;
    }
}
