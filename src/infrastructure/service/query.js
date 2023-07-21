import { gql } from "graphql-tag";

export const GET_ALL_USERS = gql`
  query accounts {
    accounts {
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
`;

export const GET_USER_INFO = gql`
  query account {
    account {
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
`;

export const GET_VALETS = gql`
query paginatedOrders($page: Int!) {
  paginatedOrders(page: $page) {
    orderId
    assignedTo {
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
    customer {
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
    orderAddress {
      addressId
      address
      city
      province
      postalCode
      country
    }
    orderType
    orderStatus
    valetServiceDate
  }
}`;