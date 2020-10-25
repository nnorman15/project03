import gql from 'graphql-tag';

export const QUERY_CARDS = gql`
    query cards($username: String) {
        cards(username: $username) {
            _id
            cardTitle
            cardBody
            cardSubject
            createdAt
            username
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
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      cards {
        _id
        cardTITLE
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