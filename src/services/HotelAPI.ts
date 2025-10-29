import { gql } from "@apollo/client";

export const SEARCH_HOTELS_QUERY = gql`
    query SearchHotels($city: String!, $passengerCount: Int!) {
        searchHotels(city: $city, passengerCount: $passengerCount) {
            id
            name
            city
            rating
            comment
            mainImage
            pricePerNight
        }
    }
`;

export const HOTEL_DETAILS_QUERY = gql`
    query GetHotelDetails($id: ID!) {
        hotelDetailsById(id: $id) {
            id
            name
            address
            city
            description
            latitude
            longitude
            images
            rating
            comment
            rooms {
                id
                name
                capacity
                bedType
                pricePerNight
                imageUrl
                description
            }
        }
    }
`;
