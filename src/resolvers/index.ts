import { ApolloContext } from '..';
import { ICookie, IFilter } from '../types/cookies';
import { ITopping } from '../types/toppings';

const resolvers = {
    Query: {
        toppings: (_: unknown, __: unknown, { dataSources: { ToppingsDataSource } }: ApolloContext): Array<ITopping> => {
            return ToppingsDataSource.getToppings();
        },
        cookies: (_: unknown, { filter }: { filter: IFilter; }, { dataSources: { CookiesDataSource } }: ApolloContext): Array<ICookie> => {
            return CookiesDataSource.getCookies(filter);
        }
    },
    Cookie: {
        toppings: (parent: ICookie) => {
            return parent.toppingIds;
        }
    },
    Topping: {
        name: (parent: string, __: unknown, { dataSources: { ToppingsDataSource } }: ApolloContext): string | null => {
            const topping = ToppingsDataSource.getToppingById(parent);
            return topping?.name ?? null;
        }
    }
};

export default resolvers;