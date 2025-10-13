export type HotelData = {
    id: number;
    name: string;
    city: string;
    score: string;
    comment: string;
    price: string;
    src: string;
};

export type BookingData = {
    id: number;
    name: string;
    fromDate: string;
    toDate: string;
    price: string;
    status: string;
    src: string;
};

export type SearchHotel = {
    destination: string;
    arrivalDate: string;
    exitDate: string;
};

export type Room = {
    id: number;
    name: string;
    capacity: number;
    BedType: string;
    pricePerNight: number;
    image: string;
};

export type HotelDetail = {
    id: number;
    name: string;
    city: string;
    score: string;
    comment: string;
    src: string[];
    title: string;
    description: string;
    rooms: Room[];
};
