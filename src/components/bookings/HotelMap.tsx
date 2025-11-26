import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Props = {
    address: string;
};

export default function HotelMap({ address }: Props) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
        libraries: ["places"],
    });

    // Default fallback location (just in case geocoding fails)
    const defaultCenter = { lat: 35.6804, lng: 139.7690 };

    const geocodeAddress = async (): Promise<google.maps.LatLngLiteral> => {
        const geocoder = new window.google.maps.Geocoder();
        return new Promise((resolve) => {
            geocoder.geocode({ address }, (results, status) => {
                if (status === "OK" && results[0].geometry.location) {
                    resolve({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    });
                } else {
                    resolve(defaultCenter);
                }
            });
        });
    };

    const mapContainerStyle = {
        width: "100%",
        height: "350px",
        borderRadius: "16px",
    };

    const [center, setCenter] = useState(defaultCenter);

    useEffect(() => {
        if (isLoaded) {
            geocodeAddress().then((coords) => setCenter(coords));
        }
    }, [isLoaded, address]);

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
            }}
        >
            {/* Marker */}
            <Marker position={center} />
        </GoogleMap>
    );
}
