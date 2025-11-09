import { gql } from "@apollo/client";

export const ALL_BOOKINGS_QUERY = gql`
    query AllBookingsByUserId {
        allBookingsByUserId {
            id
            checkInDate
            checkOutDate
            passengerCount
            guestNames
            totalPrice
            status
            hotelName
            hotelCity
            hotelImage
            roomId
        }
    }
`;

export const BOOKING_BY_ID_QUERY = gql`
    query BookingById($id: ID!) {
        bookingById(id: $id) {
            id
            checkInDate
            checkOutDate
            passengerCount
            guestNames
            totalPrice
            status
            hotelName
            hotelCity
            hotelImage
            roomId
        }
    }
`;

export const CREATE_BOOKING_MUTATION = gql`
    mutation CreateBooking($input: BookingInput!) {
        createBooking(input: $input) {
            checkInDate
            checkOutDate
            guestNames
            passengerCount
            roomId
        }
    }
`;

export const UPDATE_BOOKING_MUTATION = gql`
    mutation UpdateBooking($id: ID!, $input: BookingInput!) {
        updateBooking(id: $id, input: $input) {
            id
            checkInDate
            checkOutDate
            guestNames
            passengerCount
            roomId
        }
    }
`;

export const CANCEL_TRIP_MUTATION = gql`
    mutation UpdateBookingStatus($bookingId: ID!, $status: BookingStatus!) {
        updateBookingStatus(input: { bookingId: $bookingId, status: $status }) {
            id
            status
        }
    }
`;

export const DELETE_TRIP_MUTATION = gql`
    mutation DeleteBooking($id: ID!) {
        deleteBooking(id: $id)
    }
`;
