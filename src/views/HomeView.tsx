import HotelCard from "@/components/bookings/HotelCard";
import hotelData from "@/static/hotels.json";

function HomeView() {
    return (
        <>
            <form className="flex gap-2 items-center max-w-4xl mx-auto flex-wrap md:flex-nowrap">
                <div className="flex flex-col w-full md:w-1/2  gap-1">
                    <label htmlFor="destination" className="font-semibold">
                        Destination
                    </label>
                    <input
                        type="text"
                        name="destination"
                        id="destination"
                        placeholder="Enter a destination"
                        className="border rounded-lg p-2"
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/2 gap-1">
                    <label htmlFor="date" className="font-semibold">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Enter a destination"
                        className="border rounded-lg p-2"
                    />
                </div>
                <input
                    type="submit"
                    value="Search"
                    className="border w-full md:w-1/5 rounded-lg bg-blue-800 hover:bg-blue-900 uppercase text-slate-100 px-2 h-10 hover:cursor-pointer font-semibold mt-6"
                />
            </form>
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
