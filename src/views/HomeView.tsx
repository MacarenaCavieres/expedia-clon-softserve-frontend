import { useEffect, useState } from "react";
import HotelCard from "@/components/bookings/HotelCard";
import { getSearchedHotels } from "@/services/HotelAPI";
import hotelData from "@/static/hotels.json";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { SearchHotel } from "../types";
import Errors from "@/components/bookings/Errors";

function HomeView() {
    const [searchParams, setSearchParams] = useState<SearchHotel | null>(null);

    const initialValues: SearchHotel = {
        destination: "",
        arrivalDate: "",
        exitDate: "",
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
        enabled: false,
    });

    const arrivalDate = watch("arrivalDate");

    useEffect(() => {
        if (arrivalDate) {
            const currentDeparture = watch("exitDate");
            if (!currentDeparture) {
                setValue("exitDate", arrivalDate);
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
    }, [searchParams]);

    return (
        <>
            <form
                className="flex items-center max-w-5xl mx-auto flex-wrap md:flex-nowrap gap-2"
                onSubmit={handleSubmit(handleSearch)}
            >
                <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="destination" className="font-semibold">
                        Destination
                    </label>

                    <input
                        type="text"
                        id="destination"
                        placeholder="Enter a destination"
                        className="border rounded-lg p-2"
                        {...register("destination", {
                            required: "Destination is required",
                            pattern: {
                                value: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ@.]*$/,
                                message: "Special characters are not accepted",
                            },
                        })}
                    />

                    <Errors>{errors.destination?.message}</Errors>
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
                                    selectedDate >= today || "The arrival date cannot be earlier than today."
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
                                    departure >= arrival ||
                                    "Departure date cannot be earlier than arrival date."
                                );
                            },
                        })}
                    />
                </div>

                <input
                    type="submit"
                    value={isFetching ? "Searching..." : "Search"}
                    className="border w-full md:w-1/5 rounded-lg bg-blue-800 hover:bg-blue-900 uppercase text-slate-100 px-2 h-10 hover:cursor-pointer font-semibold mt-6 disabled:bg-slate-600 disabled:cursor-default"
                    disabled={!isValid || isFetching}
                />
            </form>

            {data?.length && (
                <section className="mb-28">
                    <h2 className="text-3xl font-bold mb-5 mt-10">
                        Search results for "{searchParams?.destination}"
                    </h2>
                    <div className="flex gap-4 justify-around max-w-5xl mx-auto flex-wrap md:flex-nowrap">
                        {data.map((item) => (
                            <HotelCard item={item} key={item.id} />
                        ))}
                    </div>
                </section>
            )}

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-1">Recommended stays for you</h2>
                <p className="mb-5 text-sm">
                    Showing deals for: <span className="font-bold">Oct 31 - Nov 2</span>
                </p>
                <div className="flex gap-5 flex-wrap lg:flex-nowrap justify-center">
                    {hotelData.map((item) => (
                        <HotelCard item={item} key={item.id} />
                    ))}
                </div>
            </section>
        </>
    );
}
export default HomeView;
