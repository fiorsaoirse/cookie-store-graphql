import { ICookie } from '../../types/cookies';

const data: ICookie[] = [
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

export default data;