import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

interface ITopping {
    id: string;
    name: string;
}

interface ICookie {
    id: string;
    title: string;
    description?: string;
    toppingIds: string[];
    price: number;
    rating: number;
}

interface ICookieWithToppings extends ICookie {
    toppings: ITopping[];
}

enum SortType {
    NONE = 'NONE',
    PRICE = 'PRICE',
    RATING = 'RATING'
}

enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

interface IFilter {
    term?: string;
    selectedToppings: string[];
    sortType: SortType;
    sortOrder: SortOrder;
    priceRange?: {
        from?: number;
        to?: number;
    };
}

const typeDefs = `#graphql
  type Topping {
    id: ID!
    name: String
  }

  type Cookie {
    id: ID!
    title: String!
    description: String
    toppingIds: [ID!]
    toppings: [Topping!]
    price: Int!
    rating: Float
  }

  input PriceRange {
    from: Int
    to: Int
  }

  enum SortOrder {
    ASC
    DESC
  }

  enum SortType {
    NONE
    PRICE
    RATING
  }

  input Filter {
    term: String
    selectedToppings: [ID!]
    sortType: SortType
    sortOrder: SortOrder
    range: PriceRange
  }

  type Query {
    toppings: [Topping]
    cookies(filter: Filter!): [Cookie]
  }
`;

const toppings: ITopping[] = [
    {
        "id": '1',
        "name": "Chocolate"
    },
    {
        "id": '2',
        "name": "Strawberry"
    },
    {
        "id": '3',
        "name": "Coconut"
    },
    {
        "id": '4',
        "name": "Marshmallows"
    },
    {
        "id": '5',
        "name": "Raspberry"
    }
];

const cookies: ICookie[] = [
    {
        "id": '1',
        "title": "Chocolate cookie",
        "description": "Wonderful crispy cookie!",
        "toppingIds": ['1'],
        "price": 100,
        "rating": 4.5
    },
    {
        "id": '2',
        "title": "Nuts cookie",
        "toppingIds": [],
        "price": 120,
        "rating": 5
    },
    {
        "id": '3',
        "title": "Berries cookie",
        "toppingIds": ['2', '5'],
        "price": 150,
        "rating": 5
    },
    {
        "id": '4',
        "title": "Coconut cookie",
        "description": "Tasty and sweet",
        "toppingIds": ['3'],
        "price": 100,
        "rating": 4.8
    },
    {
        "id": '5',
        "title": "Chocolate-marshmallow",
        "description": "Incredibly tasty!",
        "toppingIds": ['1', '4'],
        "price": 160,
        "rating": 3.6
    },
    {
        "id": '6',
        "title": "MM's cookie",
        "toppingIds": [],
        "price": 90,
        "rating": 4.3
    }
];

const compareFunction = (desc: boolean) => (aProp: number, bProp: number) => {
    return desc ? (bProp - aProp) : (aProp - bProp);
};

const resolvers = {
    Query: {
        toppings: (): ITopping[] => toppings,
        cookies: (_, { filter }: { filter: IFilter; }): ICookieWithToppings[] => {
            const {
                term, sortOrder,
                sortType, selectedToppings,
                priceRange
            } = filter;

            let result = [...cookies];

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
                    const lowerBound = cookie.price >= priceRange.from ?? 0;
                    const topBound = lowerBound && (cookie.price <= priceRange.to ?? Infinity);

                    return lowerBound && topBound;
                });
            }

            if (sortType !== SortType.NONE) {
                const comparator = compareFunction(sortOrder === SortOrder.DESC);

                result = result.sort((a: ICookie, b: ICookie) => {
                    return comparator(a[sortOrder], b[sortOrder]);
                });
            }

            return result.map((cookie: ICookie): ICookieWithToppings => {
                const t = toppings.filter((t: ITopping) => cookie.toppingIds.includes(t.id));
                return { ...cookie, toppings: t };
            });
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);