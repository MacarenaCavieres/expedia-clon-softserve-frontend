import RoomCard from "@/components/bookings/RoomCard";
import { HOTEL_DETAILS_QUERY } from "@/services/HotelAPI";
import type { HotelDetail } from "@/schemas/hotelSchemas";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";

function HotelDetailView() {
    const { hotelId } = useParams();
    const {
        loading: isLoading,
        error: isError,
        data,
    } = useQuery<HotelDetail>(HOTEL_DETAILS_QUERY, {
        variables: { id: hotelId },
        fetchPolicy: "network-only",
    });

    if (isLoading) return "Loading...";
    if (isError) return "Error loading hotel";
    if (data)
        return (
            <div className="md:max-w-6xl mx-auto p-4">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-80 mb-10">
                    <div className="col-span-1 h-80">
                        <img
                            src={data.hotelDetailsById.images[0]}
                            alt="Main hotel photo"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80">
                        {data.hotelDetailsById.images.slice(1, 5).map((item) => (
                            <img
                                src={item}
                                alt="Hotel photos"
                                key={item}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        ))}
                    </div>
                </section>

                <div className="bg-amber-100 rounded-2xl p-8 mb-8">
                    <h6 className="text-4xl font-semibold">{data.hotelDetailsById.name}</h6>
                    <p className="text-sm font-medium mt-2">{data.hotelDetailsById.address}</p>
                    <p className="my-4">
                        <span className="border rounded-lg p-2 text-xs font-bold bg-green-700 text-slate-100">
                            {data.hotelDetailsById.rating}
                        </span>
                        <span className="text-sm font-semibold">{data.hotelDetailsById.comment}</span>
                    </p>
                    <p className="text-sm font-semibold">{data.hotelDetailsById.description}</p>
                </div>

                <h4 className="text-3xl font-bold ml-8">Choose your room</h4>
                <div className="flex gap-3 mt-5 flex-wrap md:flex-nowrap">
                    {data.hotelDetailsById.rooms.map((item) => (
                        <RoomCard item={item} key={item.id} />
                    ))}
                </div>
            </div>
        );
}
export default HotelDetailView;
