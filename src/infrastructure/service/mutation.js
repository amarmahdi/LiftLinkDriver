import { gql } from "graphql-tag";

export const Login = gql`
  mutation ($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      token
      user {
        accountType
        profilePicture {
          pictureId
          pictureLink
        }
      }
    }
  }
`;

export const Logout = gql`
  mutation logout {
    logout {
      deleted
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation ($pictureLink: String!) {
    uploadProfilePicture(pictureLink: $pictureLink) {
      isCurrent
      createdAt
      pictureId
      pictureLink
    }
  }
`;

export const Add_CAR_INFO = gql`
  mutation ($input: CarInfoInput!) {
    addCarInfo(input: $input) {
      carId
      available
      carColor
      carImage {
        imageId
        imageLink
      }
      carInsurance
      carMake
      carModel
      carName
      carRegistration
      carType
      carVin
      carYear
      mileage
      plateNumber
      status
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation ($input: OrderInput!) {
    createOrder(input: $input) {
      createdDate
      notes
      orderDeliveryDate
      orderId
      serviceType {
        servicePackageName
      }
      pickupLocation
    }
  }
`;

export const ACCEPT_REQUEST = gql`
  mutation ($confirmationId: String!) {
    acceptUserDealership(confirmationId: $confirmationId) {
      dealership {
        dealershipName
        dealershipId
        dealershipCity
        dealershipCountry
        dealershipAddress
        dealershipZipCode
        dealershipState
      }
      confirmationDate
      confirmationId
      confirmationStatus
      updatedAt
    }
  }
`;

export const REJECT_REQUEST = gql`
  mutation ($confirmationId: String!) {
    rejectUserDealership(confirmationId: $confirmationId) {
      dealership {
        dealershipName
        dealershipId
        dealershipCity
        dealershipCountry
        dealershipAddress
        dealershipZipCode
        dealershipState
      }
      confirmationDate
      confirmationId
      confirmationStatus
      createdAt
      updatedAt
    }
  }
`;

export const CONFIRM_ORDER = gql`
  mutation ($assignId: String!) {
    acceptOrder(assignId: $assignId) {
      acceptDate
      assignDate
      assignedById
      assignId
      assignStatus
      customerId
      dealership {
        dealershipName
        dealershipId
      }
      drivers {
        userId
        username
        firstName
        lastName
        phoneNumber
      }
      order {
        orderId
        serviceType {
          servicePackageId
          servicePackageName
        }
        customer {
          userId
          username
          firstName
          lastName
          phoneNumber
        }
        notes
        orderDeliveryDate
        orderId
        orderStatus
        pickupLocation
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      valetVehicle {
        carImage {
          imageId
          imageLink
        }
      }
    }
  }
`;

export const REJECT_ORDER = gql`
  mutation ($assignId: String!) {
    rejectOrder(assignId: $assignId) {
      acceptDate
      assignDate
      assignedById
      assignId
      assignStatus
      customerId
      dealership {
        dealershipName
        dealershipId
      }
      drivers {
        userId
        username
        firstName
        lastName
        phoneNumber
      }
      order {
        orderId
        serviceType {
          servicePackageId
          servicePackageName
        }
        customer {
          userId
          username
          firstName
          lastName
          phoneNumber
        }
        notes
        orderDeliveryDate
        orderId
        orderStatus
        pickupLocation
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      valetVehicle {
        carImage {
          imageId
          imageLink
        }
      }
    }
  }
`;

export const CREATE_VALET = gql`
  mutation ($inputs: ValetInput!) {
    createValet(inputs: $inputs) {
      createdAt
      comments
      customer {
        userId
        accountType
        profilePicture {
          pictureLink
        }
      }
      customerDropOffTime
      customerPickUpTime
      customerVehiclChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
      }
      dealership {
        dealershipId
      }
      updatedAt
      valetDropOffTime
      valetId
      valetPickUpTime
      valetStatus
      valetVehicleChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
        mileage
        rightImage
        vehicleCheckId
      }
      order {
        orderId
        notes
        orderDeliveryDate
        orderStatus
        pickupLocation
        serviceType {
          servicePackageName
          dealershipId
        }
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      dealership {
        active
        dealershipAddress
        dealershipCity
        dealershipCountry
        dealershipId
        dealershipName
        dealershipState
        dealershipZipCode
      }
    }
  }
`;

export const START_VALET = gql`
  mutation ($state: String!, $valetId: String!, $inputs: ValetInput) {
    updateValet(state: $state, valetId: $valetId, inputs: $inputs) {
      createdAt
      comments
      customer {
        accountType
        profilePicture {
          pictureLink
        }
      }
      customerDropOffTime
      customerPickUpTime
      customerVehiclChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
      }
      dealership {
        dealershipId
      }
      updatedAt
      valetDropOffTime
      valetId
      valetPickUpTime
      valetStatus
      valetVehicleChecks {
        backImage
        checkInTime
        checkOutTime
        frontImage
        gasLevel
        leftImage
        mileage
        rightImage
        vehicleCheckId
      }
      order {
        orderId
        notes
        orderDeliveryDate
        orderStatus
        pickupLocation
        serviceType {
          servicePackageName
          dealershipId
        }
        valetVehicleRequest
        vehicle {
          carImage {
            imageId
            imageLink
          }
        }
      }
      dealership {
        active
        dealershipAddress
        dealershipCity
        dealershipCountry
        dealershipId
        dealershipName
        dealershipState
        dealershipZipCode
      }
    }
  }
`;
