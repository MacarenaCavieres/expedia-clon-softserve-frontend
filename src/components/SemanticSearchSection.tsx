import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { LucideSparkles, LucideSearch } from "lucide-react";
import HotelCard from "@/components/bookings/HotelCard";
import Loader from "@/components/Loader";
import { SEMANTIC_SEARCH_QUERY } from "@/services/semanticSearchAPI";
import type { SemanticSearchQueryResponse, SemanticSearchHotel } from "@/types/index";
import type { HotelData } from "@/schemas/hotelSchemas";

function mapSemanticHotelToHotelData(hotel: SemanticSearchHotel): HotelData {
    return {
        id: String(hotel.id),
        name: hotel.name,
        city: hotel.city,
        mainImage: hotel.mainImage,
        pricePerNight: hotel.pricePerNight,
        rating: hotel.rating,
        comment: hotel.comment,
    };
}

type Props = {
    onHotelClick: (id: string) => void;
};

function SemanticSearchSection({ onHotelClick }: Props) {
    const [query, setQuery] = useState("");

    const [runSemanticSearch, { data, loading, error }] = useLazyQuery<SemanticSearchQueryResponse>(
        SEMANTIC_SEARCH_QUERY,
        {
            fetchPolicy: "network-only",
        }
    );

    const handleSemanticSearch = async () => {
        if (!query.trim()) return;

        runSemanticSearch({
            variables: {
                query,
                limit: 4,
            },
        });
    };

    return (
        <section className="my-20 p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <LucideSparkles size={28} color="#2563eb" />
                    Search with AI
                </h2>
                <p className="text-slate-500 mt-2">Describe what you’re looking for in your own words</p>
            </div>

            <div className="flex gap-3 mb-8 flex-wrap">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cheap hotel with a pool close to the sea"
                    className="flex-1 bg-white border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    onClick={handleSemanticSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 hover:cursor-pointer md:w-auto w-full justify-center"
                >
                    <LucideSearch size={18} />
                    Search
                </button>
            </div>

            {loading && <Loader />}

            {error && <p className="text-red-500">Something went wrong while searching.</p>}

            {!loading && data?.semanticSearch.length === 0 && query && (
                <p className="text-slate-500">No hotels matched your description.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.semanticSearch.map((hotel) => {
                    const mappedHotel = mapSemanticHotelToHotelData(hotel);
                    return <HotelCard key={mappedHotel.id} item={mappedHotel} handleClick={onHotelClick} />;
                })}
            </div>
        </section>
    );
}

export default SemanticSearchSection;
