type Props = {
    text: string;
    bgColor: string;
    isValid: boolean;
    onClick: (e: string) => void;
};
function ProfileButton({ text, bgColor, isValid, onClick }: Props) {
    const effectiveColor = isValid ? bgColor : "bg-slate-600";
    return (
        <button
            className={`border w-full md:w-1/5 rounded-lg ${effectiveColor} uppercase text-slate-100 px-2 h-10 font-semibold ${
                isValid ? "hover:cursor-pointer hover:opacity-90" : "cursor-not-allowed opacity-60"
            }`}
            onClick={() => onClick(text)}
            disabled={!isValid}
        >
            {text}
        </button>
    );
}
export default ProfileButton;
