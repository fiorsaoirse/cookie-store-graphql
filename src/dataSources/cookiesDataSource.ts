import { RESTDataSource } from '@apollo/datasource-rest';
import { ICookie, IFilter, SortOrder, SortType } from '../types/cookies';
import { compareFunction } from '../utils';
import { COOKIES } from './data';

export class CookiesDataSource extends RESTDataSource {

    getCookies(filter: IFilter): ICookie[] {
        const {
            term, sortOrder,
            sortType, selectedToppings,
            priceRange
        } = filter;

        let result = [...COOKIES];

        if (term) {
            const r = new RegExp(term, 'ig');
            result = result.filter((cookie: ICookie) => r.test(cookie.title));
        }

        if (selectedToppings?.length) {
            result = result.filter((cookie: ICookie) => {
                return cookie.toppingIds?.some((tID: string) => selectedToppings.includes(tID)) ?? false;
            });
        }

        if (priceRange) {
            result = result.filter((cookie: ICookie) => {
                const lowerBound = cookie.price >= (priceRange?.from ?? 0);
                const topBound = lowerBound && (cookie.price <= (priceRange?.to ?? Infinity));

                return lowerBound && topBound;
            });
        }

        if (sortType !== SortType.NONE) {
            const comparator = compareFunction(sortOrder === SortOrder.DESC);

            result = result.sort((a: ICookie, b: ICookie) => {
                return comparator(a[sortType], b[sortType]);
            });
        }

        return result;
    }
}
