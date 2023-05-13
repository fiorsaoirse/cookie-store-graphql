import gql from "graphql-tag";

export default gql`
    type Topping {
        id: ID!
        name: String
    }
    
    type Cookie {
        id: ID!
        title: String!
        description: String
        toppings: [Topping!]
        price: Int!
        rating: Float
    }

    input PriceRange {
        from: Int
        to: Int
    }

    input Filter {
        term: String
        selectedToppings: [ID!]
        sortType: SortType
        sortOrder: SortOrder
        range: PriceRange
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

    type Query {
        toppings: [Topping]
        cookies(filter: Filter!): [Cookie]
    }
`;
