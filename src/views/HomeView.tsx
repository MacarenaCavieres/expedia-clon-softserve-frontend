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
        <>
            <form
                className="flex items-center max-w-5xl mx-auto flex-wrap md:flex-nowrap gap-2"
                onSubmit={handleSubmit(handleSearch)}
            >
                <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="city" className="font-semibold">
                        City
                    </label>

                    <select
                        id="city"
                        className="border rounded-lg p-2"
                        {...register("city", {
                            required: "City is required",
                        })}
                    >
                        <option value="">Select a city</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    <Errors>{errors.city?.message}</Errors>
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="arrivalDate" className="font-semibold">
                        Arrival date
                    </label>

                    <input
                        type="date"
                        id="arrivalDate"
                        className="border rounded-lg p-2"
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
                    />
                    <Errors>{errors.arrivalDate?.message}</Errors>
                </div>
                <div className="flex flex-col flex-1">
                    <label htmlFor="exitDate" className="font-semibold">
                        Exit date
                    </label>
                    <input
                        type="date"
                        id="exitDate"
                        placeholder="Enter a destination"
                        className="border rounded-lg p-2"
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
                    />
                    <Errors>{errors.exitDate?.message}</Errors>
                </div>
                <div className="flex flex-col flex-1 gap-1 md:col-span-1">
                    <label htmlFor="passengerCount" className="font-semibold">
                        Passengers
                    </label>
                    <input
                        type="number"
                        id="passengerCount"
                        min={1}
                        className="border rounded-lg p-2"
                        {...register("passengerCount", {
                            required: "Number of guests is required",
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Must be at least 1 guest",
                            },
                        })}
                    />
                    <Errors>{errors.passengerCount?.message}</Errors>
                </div>
                <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="flex items-center justify-center gap-2 border w-full md:w-1/5 rounded-lg bg-blue-800 hover:bg-blue-900 uppercase text-slate-100 
                    px-2 h-10 cursor-pointer font-semibold mt-6 disabled:bg-slate-600 disabled:cursor-default"
                >
                    {isLoading ? (
                        "Searching..."
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5 text-slate-100"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            Search
                        </>
                    )}
                </button>
            </form>

            {searchParams &&
                (isLoading ? (
                    <p className="text-3xl font-bold mb-5 mt-10">Searching...</p>
                ) : data?.searchHotels.length ? (
                    <section className="mb-28">
                        <h2 className="text-3xl font-bold mb-5 mt-10">
                            Search results for "{searchParams?.city}"
                        </h2>
                        <div className="grid gap-5 sm: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
                            {data.searchHotels.map((item) => (
                                <HotelCard item={item} key={item.id} handleClick={handleClick} />
                            ))}
                        </div>
                    </section>
                ) : (
                    <p className="text-3xl font-bold mb-5 mt-10">
                        No results were found for the search: {searchParams?.city}
                    </p>
                ))}

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-1">Recommended stays for you</h2>
                <p className="mb-5 text-sm">
                    Showing deals for: <span className="font-bold">Dec 03 - Dec 10</span>
                </p>
                <div className="grid gap-5 sm: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
                    {staticHotels.map((item) => (
                        <HotelCard item={item} key={item.id} handleClick={handleClick} />
                    ))}
                </div>
            </section>
        </>
    );
}
export default HomeView;
