enum SortType {
    NONE = 'none',
    PRICE = 'price',
    RATING = 'rating'
}

enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

interface ICookie {
    id: string;
    title: string;
    description?: string;
    toppingIds: string[];
    price: number;
    rating: number;
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

export { type ICookie, type IFilter, SortOrder, SortType };

