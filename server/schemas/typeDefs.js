// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
//this was the starter typeDefs to test that it was working before adding specific typeDefs for the app
//const typeDefs = gql`
//   type Query {
//     helloWorld: String
//   }
// `;

//the square brackets used around [Card] in the thoughts query below indicates an array

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
        username: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        cards(username: String): [Card]
        card(_id: ID!): Card
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addCard(cardSubject: String!, cardTitle: String!, cardBody: String!): Card
    }

`;

// export the typeDefs
module.exports = typeDefs;