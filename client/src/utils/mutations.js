import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($email: String!, $cardSubject: String!, $cardTitle: String!, $cardBody: String!) {
    addCard(email: $email, cardSubject: $cardSubject, cardTitle: $cardTitle, cardBody: $cardBody) {
      _id
      cardTitle
      cardBody
      cardSubject
      createdAt
      email
    }
  }
`;

export const EDIT_CARD = gql`
  mutation editCard($_id: String!, $cardSubject: String!, $cardTitle: String!, $cardBody: String!) {
    editCard(_id: $_id, cardSubject: $cardSubject, cardTitle: $cardTitle, cardBody: $cardBody) {
      _id
      cardSubject
      cardTitle
      cardBody
    }
  }
`;

export const DELETE_CARD = gql`
  mutation deleteCard($_id: String!) {
    deleteCard(_id: $_id) {
      _id
    }
  }
`;