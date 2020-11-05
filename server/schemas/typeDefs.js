// import the gql tagged template function
const { gql } = require('apollo-server-express');

//the square brackets used around [Card] in the user query below indicates an array

const typeDefs = gql`

    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID
        username: String
        email: String
        cardCount: Int
        cards: [Card]
    }

    type Card {
        _id: ID
        cardSubject: String
        cardTitle: String
        cardBody: String
        createdAt: String
        email: String
    }

    type Query {
        me: User
        users: [User]
        user(email: String!): User
        cards(email: String, cardSubject: String): [Card]
        card(_id: ID!): Card
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addCard(email: String!, cardSubject: String!, cardTitle: String!, cardBody: String!): Card
        editCard(_id: String!, cardSubject: String!, cardTitle: String!, cardBody: String!): Card
        deleteCard(_id: String!): Card
    }

`;

module.exports = typeDefs;