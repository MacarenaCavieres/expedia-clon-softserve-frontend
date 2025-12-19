import ProfileButton from "@/components/auth/ProfileButton";
import ProfileForm from "@/components/auth/ProfileForm";
import type { UserInfo, UserInfoForm } from "@/schemas/userSchemas";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_USER_INFO, UPDATE_USER_INFO } from "@/services/authAPI";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import { LucideMail, LucidePhone, LucideCalendar, LucideClock, LucideShieldCheck } from "lucide-react";
import InfoProfileItem from "@/components/auth/InfoProfileItem";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

function ProfileView() {
    const [isEditing, setIsEditing] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    const formatDate = (date?: string) => {
        if (!date) return "---";
        return new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const { loading: isLoading, error: isError, data, refetch } = useQuery<UserInfo>(GET_USER_INFO);
    const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO, {
        refetchQueries: [{ query: GET_USER_INFO }],
        onCompleted: () => {
            toast.success("User updated successfully");
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const handleClick = (text: string) => {
        if (text === "Edit Profile") setIsEditing(true);
        else if (text === "Save Changes") {
            if (formRef.current) {
                formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
            }
        }
    };

    const handleForm = useCallback((isFormValid: boolean) => {
        setIsValid(isFormValid);
    }, []);

    const handleSuccessfulSubmit = async (formData: UserInfoForm) => {
        try {
            await updateUserInfo({
                variables: {
                    input: {
                        email: formData.email,
                        phone: formData.phone,
                        name: formData.name,
                        lastname: formData.lastname,
                    },
                },
            });
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage message="Error Loading User Information" onRetry={() => refetch()} />;
    if (loading) return <Loader />;

    const user = data?.getUserInfo;

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 flex items-center justify-center">
            <div className="max-w-7xl w-full">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row border border-white">
                    {/* IZQUIERDA: Identidad Fija */}
                    <div className="w-full md:w-[35%] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-12 text-white flex flex-col items-center justify-center text-center">
                        <div className="relative mb-8">
                            <div className="p-1 bg-white/20 rounded-full backdrop-blur-md border border-white/30">
                                <img
                                    src={`https://robohash.org/${user?.name}${user?.lastname}.png?set=set4`}
                                    alt="Avatar"
                                    className="w-40 h-40 rounded-full bg-slate-50 object-cover shadow-2xl"
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full border-4 border-indigo-600 shadow-lg">
                                <LucideShieldCheck size={20} />
                            </div>
                        </div>
                        {/* Solo Nombre y Apellido aquí */}
                        <h2 className="text-4xl font-black tracking-tighter leading-tight uppercase">
                            {user?.name} <br /> {user?.lastname}
                        </h2>
                        <div className="mt-6 px-4 py-1.5 bg-black/20 rounded-full text-[10px] font-black tracking-[0.2em] border border-white/10">
                            Verified Account
                        </div>
                    </div>

                    {/* DERECHA: Información y Formulario */}
                    <div className="flex-1 p-8 md:p-14 bg-white">
                        <div className="flex justify-between items-center mb-12">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                                {isEditing ? "Modify Details" : "Contact & Logs"}
                            </h3>
                            <div className="flex items-center gap-3">
                                {isEditing && (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="text-xs font-bold text-slate-400 hover:text-red-500 px-4"
                                    >
                                        Cancel
                                    </button>
                                )}
                                <ProfileButton
                                    text={isEditing ? "Save Changes" : "Edit Profile"}
                                    bgColor={
                                        isEditing
                                            ? "bg-green-600 hover:bg-green-700"
                                            : "bg-slate-900 hover:bg-black"
                                    }
                                    isValid={isValid}
                                    onClick={handleClick}
                                />
                            </div>
                        </div>

                        {isEditing ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <ProfileForm
                                    userInfo={user}
                                    formRef={formRef}
                                    handleForm={handleForm}
                                    onSuccessfulSubmit={handleSuccessfulSubmit}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
                                <InfoProfileItem icon={<LucideMail />} label="Email" value={user?.email} />
                                <InfoProfileItem
                                    icon={<LucidePhone />}
                                    label="Phone"
                                    value={user?.phone || "Not set"}
                                />
                                <InfoProfileItem
                                    icon={<LucideCalendar />}
                                    label="Created At"
                                    value={formatDate(user?.createdAt)}
                                />
                                <InfoProfileItem
                                    icon={<LucideClock />}
                                    label="Last Update"
                                    value={formatDate(user?.updatedAt)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileView;
