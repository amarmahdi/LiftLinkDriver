import { gql } from "graphql-tag";

export const Login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      payload
      refreshExpiresIn
      token
      user {
        userId
        username
        email
        accountType
        firstName
        lastName
        phoneNumber
        dateJoined
        lastLogin
        isActive
        isStaff
        isSuperuser
      }
    }
  }
`;

export const Logout = gql`
mutation logout {
  logout {
    deleted
  }
}`;
