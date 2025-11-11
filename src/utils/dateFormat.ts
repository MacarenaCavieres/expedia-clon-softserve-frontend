export const formatTimestamp = (timestamp: string | undefined | null) => {
    if (!timestamp) return "N/A";
    const dateObject = new Date(timestamp);

    type DateOptions = Intl.DateTimeFormatOptions;

    const dateOptions: DateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions: DateOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const datePart = dateObject.toLocaleDateString(undefined, dateOptions);
    const timePart = dateObject.toLocaleTimeString(undefined, timeOptions);

    return { date: datePart, time: timePart };
};
