import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import HotelCard from "@/components/bookings/HotelCard";
import initialData from "@/static/hotels.json";
import type { HotelData, SearchHotel, SetBookingDatesPayload } from "@/types/index";
import Errors from "@/components/bookings/Errors";
import { useBookingActions } from "@/hooks/useBookingActions";
import { getSearchedHotels } from "@/services/hotelAPI";

function HomeView() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState<SearchHotel | null>(null);
    const { setBookingDatesStore } = useBookingActions();

    // --- VALORES INICIALES ACTUALIZADOS ---
    const initialValues: SearchHotel = {
        city: "", // Considera renombrar a 'city' aquí y en el register
        arrivalDate: "",
        exitDate: "",
        passengerCount: 1, // Valor inicial para pasajeros
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({ defaultValues: initialValues, mode: "onChange" });

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["searchHotels", searchParams],
        queryFn: () => getSearchedHotels(searchParams!),
        enabled: !!searchParams, // Habilitado solo cuando searchParams no es null
        retry: false, // Evita reintentos automáticos en caso de error
    });

    const arrivalDate = watch("arrivalDate");

    useEffect(() => {
        if (arrivalDate) {
            const currentDeparture = watch("exitDate");
            const checkInDate = new Date(arrivalDate);
            // Asegurarse de que la fecha sea válida antes de operar
            if (!isNaN(checkInDate.getTime())) {
                checkInDate.setDate(checkInDate.getDate() + 1);
                const nextDay = checkInDate.toISOString().split("T")[0];
                // Solo setear si no hay fecha de salida o si es anterior/igual a la de llegada + 1
                const departureDate = currentDeparture ? new Date(currentDeparture) : null;
                if (!departureDate || departureDate <= checkInDate) {
                    setValue("exitDate", nextDay);
                }
            }
        }
    }, [arrivalDate, setValue, watch]);

    const handleSearch = async (formData: SearchHotel) => {
        setSearchParams(formData);
    };

    useEffect(() => {
        if (searchParams) {
            refetch();
        }
    }, [searchParams, refetch]);

    const handleClick = (id: HotelData["id"]) => {
        if (!searchParams) return; // Asegurar que searchParams exista
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

                    <input
                        type="text"
                        id="city"
                        placeholder="Enter a destination"
                        className="border rounded-lg p-2"
                        {...register("city", {
                            required: "City is required",
                            pattern: {
                                value: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ@.]*$/,
                                message: "Special characters are not accepted",
                            },
                        })}
                    />

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

                {/* --- NUEVO INPUT: PASSENGER COUNT --- */}
                <div className="flex flex-col flex-1 gap-1 md:col-span-1">
                    <label htmlFor="passengerCount" className="font-semibold">
                        Passengers
                    </label>
                    <input
                        type="number"
                        id="passengerCount"
                        min={1} // Mínimo 1 pasajero
                        className="border rounded-lg p-2"
                        {...register("passengerCount", {
                            required: "Number of guests is required",
                            valueAsNumber: true, // Importante para que react-hook-form lo trate como número
                            min: {
                                value: 1,
                                message: "Must be at least 1 guest",
                            },
                        })}
                    />
                    <Errors>{errors.passengerCount?.message}</Errors>
                </div>

                <input
                    type="submit"
                    value={isFetching ? "Searching..." : "Search"}
                    className="border w-full md:w-1/5 rounded-lg bg-blue-800 hover:bg-blue-900 uppercase text-slate-100 px-2 h-10 hover:cursor-pointer font-semibold mt-6 disabled:bg-slate-600 disabled:cursor-default"
                    disabled={!isValid || isFetching}
                />
            </form>

            {searchParams &&
                (isFetching ? (
                    <p className="text-3xl font-bold mb-5 mt-10">Searching...</p>
                ) : data?.length ? (
                    <section className="mb-28">
                        <h2 className="text-3xl font-bold mb-5 mt-10">
                            Search results for "{searchParams?.city}"
                        </h2>
                        <div className="flex gap-4 justify-around max-w-5xl mx-auto flex-wrap md:flex-nowrap">
                            {data.map((item) => (
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
                    Showing deals for: <span className="font-bold">Oct 31 - Nov 2</span>
                </p>
                <div className="flex gap-5 flex-wrap xl:flex-nowrap justify-center">
                    {initialData.map((item) => (
                        <HotelCard item={item} key={item.id} handleClick={handleClick} />
                    ))}
                </div>
            </section>
        </>
    );
}
export default HomeView;
