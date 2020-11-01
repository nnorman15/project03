import gql from 'graphql-tag';

export const QUERY_CARDS = gql`
  query cards($email: String, $cardSubject: String) {
      cards(email: $email, cardSubject: $cardSubject) {
          _id
          cardTitle
          cardBody
          cardSubject
          createdAt
          email
      }
  }
`;

export const QUERY_CARD = gql`
  query card($id: ID!) {
    card(_id: $id) {
      _id
      cardTitle
      cardBody
      cardSubject
      createdAt
      email
    }
  }
`;

export const QUERY_USERS = gql`
  {
    user {
      _id
      username
      email
      cards {
        _id
        cardTitle
        cardBody
        cardSubject
        createdAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      username
      cards {
        _id
        cardTitle
        cardBody
        cardSubject
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      cards {
        _id
        cardTitle
        cardBody
        cardSubject
        createdAt
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;