import ProfileButton from "@/components/auth/ProfileButton";
import ProfileForm from "@/components/auth/ProfileForm";
import ProfileInfo from "@/components/auth/ProfileInfo";
import type { UserInfo, UserInfoForm } from "@/schemas/userSchemas";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_USER_INFO, UPDATE_USER_INFO } from "@/services/authAPI";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

function ProfileView() {
    const [isEditing, setIsEditing] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);

    const { loading: isLoading, error: isError, data } = useQuery<UserInfo>(GET_USER_INFO);
    const [updateUserInfo, { loading }] = useMutation(UPDATE_USER_INFO, {
        refetchQueries: [{ query: GET_USER_INFO }],
        onCompleted: () => {
            toast.success("User information successfully updated");
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    const handleClick = (text: string) => {
        if (text === "Edit") {
            setIsEditing(true);
        } else if (text === "Save") {
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

    if (isLoading) return "Loading...";
    if (isError) return "Error loading user information";
    if (loading) return "Loading...";

    return (
        <>
            <div className="flex justify-end items-start align-top">
                {isEditing ? (
                    <ProfileButton
                        text="Save"
                        bgColor="bg-[#227950] hover:bg-green-800"
                        isValid={isValid}
                        onClick={handleClick}
                    />
                ) : (
                    <ProfileButton
                        text="Edit"
                        bgColor="bg-blue-800 hover:bg-blue-900"
                        isValid={true}
                        onClick={handleClick}
                    />
                )}
            </div>
            <h5 className="text-center text-5xl font-bold">Profile Information</h5>
            <div>
                <div className="flex justify-center my-10">
                    <img
                        src={`https://robohash.org/${data?.getUserInfo.name}${data?.getUserInfo.lastname}.png`}
                        alt={`User ${data?.getUserInfo.name} ${data?.getUserInfo.lastname}`}
                        className="border-6 rounded-full w-72"
                    />
                </div>
                {isEditing ? (
                    <ProfileForm
                        userInfo={data?.getUserInfo}
                        formRef={formRef}
                        handleForm={handleForm}
                        onSuccessfulSubmit={handleSuccessfulSubmit}
                    />
                ) : (
                    <ProfileInfo userInfo={data?.getUserInfo} />
                )}
            </div>
        </>
    );
}
export default ProfileView;
