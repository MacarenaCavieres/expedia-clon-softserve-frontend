type Props = {
    text: string;
    bgColor: string;
    isValid: boolean;
    onClick: (e: string) => void;
};

function ProfileButton({ text, bgColor, isValid, onClick }: Props) {
    const effectiveColor = isValid ? bgColor : "bg-slate-400";

    return (
        <button
            className={`
                ${effectiveColor} 
                text-white 
                text-xs 
                font-black 
                uppercase 
                tracking-tight
                px-6 
                h-11 
                rounded-xl
                transition-all
                duration-200
                whitespace-nowrap
                flex 
                items-center 
                justify-center
                min-w-fit
                ${
                    isValid
                        ? "hover:cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
                        : "cursor-not-allowed opacity-50"
                }
            `}
            onClick={() => onClick(text)}
            disabled={!isValid}
        >
            {text}
        </button>
    );
}
export default ProfileButton;
