type Props = {
    text: string;
    bgColor: string;
};
function ProfileButton({ text, bgColor }: Props) {
    return (
        <button
            className={`border w-full md:w-1/5 rounded-lg ${bgColor} uppercase text-slate-100 px-2 h-10 hover:cursor-pointer font-semibold disabled:bg-slate-600 disabled:cursor-default`}
        >
            {text}
        </button>
    );
}
export default ProfileButton;
