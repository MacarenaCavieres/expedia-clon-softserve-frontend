import RoomCard from "@/components/bookings/RoomCard";
import { HOTEL_DETAILS_QUERY } from "@/services/HotelAPI";
import type { HotelDetail } from "@/schemas/hotelSchemas";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

function HotelDetailView() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { hotelId } = useParams();
    const {
        loading: isLoading,
        error: isError,
        data,
    } = useQuery<HotelDetail>(HOTEL_DETAILS_QUERY, {
        variables: { id: hotelId },
        fetchPolicy: "network-only",
    });

    //Google Maps clickable
    const openInGoogleMaps = (address: string) => {
        const encoded = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, "_blank");
    };

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage message="Error Loading Hotel information" />;
    if (data)
        return (
            <div className="md:max-w-6xl mx-auto p-4 mt-10">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-80 mb-10">
                    <div className="col-span-1 h-80">
                        <img
                            src={data.hotelDetailsById.images[0]}
                            alt="Main hotel photo"
                            className="w-full h-full object-cover rounded-2xl cursor-pointer"
                            onClick={() => setSelectedImage(data.hotelDetailsById.images[0])}
                        />
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-80">
                        {data.hotelDetailsById.images.slice(1, 5).map((item) => (
                            <img
                                src={item}
                                alt="Hotel photos"
                                key={item}
                                className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                onClick={() => setSelectedImage(item)}
                            />
                        ))}
                    </div>
                </section>

                <div className="bg-amber-100 rounded-2xl p-8 mb-8">
                    <h6 className="text-4xl font-semibold">{data.hotelDetailsById.name}</h6>
                    <div className="flex items-center gap-2 mt-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map-pin-icon lucide-map-pin"
                        >
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <p
                            className="text-sm font-medium mt-2 hover: cursor-pointer text-blue-600"
                            onClick={() => openInGoogleMaps(data.hotelDetailsById.address)}
                        >
                            {data.hotelDetailsById.address}
                        </p>
                    </div>
                    <p className="my-4">
                        <span className="border rounded-lg p-2 text-xs font-bold bg-green-700 text-slate-100">
                            {data.hotelDetailsById.rating}
                        </span>
                        <span className="text-sm font-semibold">{data.hotelDetailsById.comment}</span>
                    </p>
                    <p className="text-sm font-semibold">{data.hotelDetailsById.description}</p>
                </div>

                {/* Google Maps Section */}
                <div className="w-full h-80 mb-10 rounded-2xl overflow-hidden shadow">
                    <iframe
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${
                            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                        }&q=${encodeURIComponent(data.hotelDetailsById.address)}&language=en`}
                    ></iframe>
                </div>

                <div className="flex items-center gap-3 ml-8 mb-4">
                    <h4 className="text-3xl font-bold ml-8">Choose your room</h4>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-bed-double-icon lucide-bed-double"
                    >
                        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                        <path d="M12 4v6" />
                        <path d="M2 18h20" />
                    </svg>
                </div>

                <div className="flex gap-3 mt-5 flex-wrap md:flex-nowrap">
                    {data.hotelDetailsById.rooms.map((item) => (
                        <RoomCard item={item} key={item.id} />
                    ))}
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            {/* Close button */}
                            <button
                                className="absolute top-3 right-3 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-black/80 transition cursor-pointer"
                                onClick={() => setSelectedImage(null)}
                            >
                                x
                            </button>

                            <img src={selectedImage} className="max-w-4xl max-h-[90vh] rounded-2xl" />
                        </div>
                    </div>
                )}
            </div>
        );
}
export default HotelDetailView;
