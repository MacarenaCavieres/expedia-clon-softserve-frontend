import type { AlertProps } from "@/types/index";
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from "@heroicons/react/24/solid";

const PaymentStatusAlert: React.FC<AlertProps> = ({ message, status }) => {
    let icon;
    let colorClass;
    let title;

    switch (status) {
        case "SUCCESS":
            icon = <CheckCircleIcon className="h-6 w-6 text-green-600" />;
            colorClass = "bg-green-50 border-green-200";
            title = "Payment Successful!";
            break;
        case "CONFIRMING":
            icon = <ClockIcon className="h-6 w-6 text-blue-600 animate-pulse" />;
            colorClass = "bg-blue-50 border-blue-200";
            title = "Processing Confirmation...";
            break;
        case "WARNING":
            icon = <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />;
            colorClass = "bg-yellow-50 border-yellow-200";
            title = "Attention";
            break;
        default:
            icon = <CheckCircleIcon className="h-6 w-6 text-gray-600" />;
            colorClass = "bg-gray-50 border-gray-200";
            title = "Notification";
    }

    return (
        <div
            role="alert"
            className={`flex items-start p-4 rounded-lg shadow-lg mb-6 transition-all duration-300 transform scale-100 opacity-100 ${colorClass} border`}
        >
            <div className="flex-shrink-0 mr-3 mt-0.5">{icon}</div>
            <div>
                <h4 className="text-md font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-700">{message}</p>
            </div>
        </div>
    );
};

export default PaymentStatusAlert;
