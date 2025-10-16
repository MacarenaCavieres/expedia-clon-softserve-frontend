import RoomCard from "@/components/bookings/RoomCard";
import { getHotelById } from "@/services/HotelAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function HotelDetailView() {
    const { hotelId } = useParams();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["hotel", hotelId],
        queryFn: () => getHotelById(+hotelId!),
        retry: false,
    });

    if (isLoading) return "Loading...";
    if (isError) return "Error loading hotel";
    if (data)
        return (
            <div className="md:max-w-6xl mx-auto p-4">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-80 mb-10">
                    <div className="col-span-1 h-80">
                        <img
                            src={data.images[0]}
                            alt="Main hotel photo"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80">
                        {data.images.slice(1, 5).map((item) => (
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
                    <h6 className="text-4xl font-semibold">{data.name}</h6>
                    <p className="text-sm font-medium mt-2">{data.address}</p>
                    <p className="my-4">
                        <span className="border rounded-lg p-2 text-xs font-bold bg-green-700 text-slate-100">
                            {data.rating}
                        </span>
                        <span className="text-sm font-semibold">{data.comment}</span>
                    </p>
                    <p className="text-sm font-semibold">{data.description}</p>
                </div>

                <h4 className="text-3xl font-bold ml-8">Choose your room</h4>
                <div className="flex gap-3 mt-5 flex-wrap md:flex-nowrap">
                    {data.rooms.map((item) => (
                        <RoomCard item={item} key={item.id} />
                    ))}
                </div>
            </div>
        );
}
export default HotelDetailView;
