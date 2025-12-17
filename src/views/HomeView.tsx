import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client/react";
import HotelCard from "@/components/bookings/HotelCard";
import staticHotels from "@/static/hotels.json";
import type { HotelData, SearchHotel, SearchHotelsQueryResponse } from "@/schemas/hotelSchemas";
import type { SetBookingDatesPayload } from "@/schemas/bookingSchemas";
import Errors from "@/components/Errors";
import { useBookingActions } from "@/hooks/useBookingActions";
import { SEARCH_HOTELS_QUERY } from "@/services/HotelAPI";
import {
    LucideMapPin,
    LucideCalendar,
    LucideUsers,
    LucideSearch,
    LucideTriangleAlert,
    LucideHotel,
} from "lucide-react";

const initialData = [
    "London",
    "Maldives",
    "New York",
    "Paris",
    "Punta Cana",
    "Rio de Janeiro",
    "Rome",
    "Tokyo",
];

function HomeView() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState<SearchHotel | null>(null);
    const { setBookingDatesStore } = useBookingActions();

    const cities = [...new Set(initialData.map((hotel) => hotel))];

    const initialValues: SearchHotel = {
        city: "",
        arrivalDate: "",
        exitDate: "",
        passengerCount: 1,
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({ defaultValues: initialValues, mode: "onChange" });

    const [searchHotels, { loading: isLoading, data }] = useLazyQuery<SearchHotelsQueryResponse>(
        SEARCH_HOTELS_QUERY,
        {
            fetchPolicy: "network-only",
        }
    );

    const arrivalDate = watch("arrivalDate");

    useEffect(() => {
        if (arrivalDate) {
            const currentDeparture = watch("exitDate");
            const checkInDate = new Date(arrivalDate);
            if (!isNaN(checkInDate.getTime())) {
                checkInDate.setDate(checkInDate.getDate() + 1);
                const nextDay = checkInDate.toISOString().split("T")[0];
                const departureDate = currentDeparture ? new Date(currentDeparture) : null;
                if (!departureDate || departureDate <= checkInDate) {
                    setValue("exitDate", nextDay);
                }
            }
        }
    }, [arrivalDate, setValue, watch]);

    const handleSearch = async (formData: SearchHotel) => {
        setSearchParams(formData);
        searchHotels({
            variables: {
                city: formData.city,
                passengerCount: formData.passengerCount,
            },
        });
    };

    const handleClick = (id: HotelData["id"]) => {
        if (!searchParams) return;
        const bookingDates: SetBookingDatesPayload = {
            checkInDate: searchParams!.arrivalDate,
            checkOutDate: searchParams!.exitDate,
        };
        setBookingDatesStore(bookingDates);
        navigate(`/${id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[400px] w-full flex flex-col items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://forever.travel-assets.com/flex/flexmanager/images/2025/07/31/RF_Stocksy_txpa3c2656czKY300_OriginalDelivery_3153535avif1920x390.avif?impolicy=fcrop&w=1920&h=390&q=mediumHigh"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                </div>

                <div className="relative z-10 text-center px-4 mb-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                        Find your next adventure
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100">
                        Discover amazing hotels at the best prices around the world.
                    </p>
                </div>

                {/* --- FLOATING SEARCH FORM --- */}
                <div className="relative z-20 w-full max-w-6xl px-4 -mb-32 md:-mb-20">
                    <form
                        onSubmit={handleSubmit(handleSearch)}
                        className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-4"
                    >
                        {/* Ciudad */}
                        <div className="md:col-span-3 space-y-2">
                            <label
                                className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"
                                htmlFor="city"
                            >
                                <LucideMapPin size={18} strokeWidth={2.5} /> Destination
                            </label>
                            <select
                                {...register("city", { required: "City is required" })}
                                className="w-full border-none bg-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
                            >
                                <option value="">Where are you going?</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Arrival */}
                        <div className="md:col-span-3 space-y-2">
                            <label
                                className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"
                                htmlFor="arrivalDate"
                            >
                                <LucideCalendar size={18} strokeWidth={2.5} /> Check-in
                            </label>
                            <input
                                type="date"
                                {...register("arrivalDate", {
                                    required: "Arrival date is required",
                                    validate: (value) => {
                                        const today = new Date();
                                        const selectedDate = new Date(value);
                                        today.setHours(0, 0, 0, 0);
                                        selectedDate.setHours(0, 0, 0, 0);
                                        return (
                                            selectedDate >= today ||
                                            "The arrival date cannot be earlier or the same than today."
                                        );
                                    },
                                })}
                                className="w-full border-none bg-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                            />
                        </div>

                        {/* Exit */}
                        <div className="md:col-span-3 space-y-2">
                            <label
                                className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"
                                htmlFor="exitDate"
                            >
                                <LucideCalendar size={18} strokeWidth={2.5} /> Check-out
                            </label>
                            <input
                                type="date"
                                {...register("exitDate", {
                                    validate: (value) => {
                                        const arrival = new Date(arrivalDate);
                                        const departure = new Date(value);
                                        arrival.setHours(0, 0, 0, 0);
                                        departure.setHours(0, 0, 0, 0);
                                        return (
                                            departure > arrival ||
                                            "Departure date cannot be earlier or equal than arrival date."
                                        );
                                    },
                                })}
                                className="w-full border-none bg-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                            />
                        </div>

                        {/* Guests */}
                        <div className="md:col-span-1 space-y-2">
                            <label
                                className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"
                                htmlFor="passengerCount"
                            >
                                <LucideUsers size={18} strokeWidth={2.5} /> Guests
                            </label>
                            <input
                                type="number"
                                {...register("passengerCount", {
                                    required: "Number of guests is required",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Must be at least 1 guest",
                                    },
                                })}
                                className="w-full border-none bg-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                            />
                            {/* <Errors>{errors.passengerCount?.message}</Errors> */}
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:bg-slate-300 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    "..."
                                ) : (
                                    <>
                                        <LucideSearch size={20} /> Search
                                    </>
                                )}
                            </button>
                        </div>
                        {/* --- SECCIÓN DE ERRORES --- */}
                        {Object.keys(errors).length > 0 && (
                            <div className="md:col-span-12 mt-2 p-3 bg-red-50 border border-red-100 rounded-xl flex flex-col gap-1">
                                {Object.values(errors).map((error, index) => (
                                    <div className="flex items-center gap-3">
                                        <LucideTriangleAlert size={20} color="red" />
                                        <Errors key={index}>{error?.message as string}</Errors>
                                    </div>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </section>

            {/* --- RESULTS SECTION --- */}
            <div className="max-w-7xl mx-auto px-4 pb-20 md:max-w-7xl md:px-10 mt-10">
                {searchParams && (
                    <div className="mb-16">
                        {isLoading ? (
                            <div className="animate-pulse flex space-x-4 pt-10">Loading...</div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-slate-800 mb-6 pt-10">
                                    <div className="flex items-center gap-3">
                                        <LucideHotel size={30} color="#155dfc" /> Hotels in{" "}
                                        {searchParams.city}
                                    </div>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                                    {data?.searchHotels.map((item) => (
                                        <HotelCard item={item} key={item.id} handleClick={handleClick} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Recommended Stays */}
                <section>
                    <div className="flex items-end justify-between mb-8 pt-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Recommended for you</h2>
                            <p className="text-slate-500">Handpicked properties based on your preferences</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4 gap-5">
                        {staticHotels.map((item) => (
                            <HotelCard item={item} key={item.id} handleClick={handleClick} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
export default HomeView;
