import ProfileButton from "@/components/auth/ProfileButton";
import ProfileForm from "@/components/auth/ProfileForm";
import ProfileInfo from "@/components/auth/ProfileInfo";
import type { UserInformation } from "@/types/index";

function ProfileView() {
    const userInfo: UserInformation = {
        name: "Sofía",
        lastname: "Davila",
        email: "ale@mail.com",
        phone: "+5691234323",
        creationDate: "2025-10-22",
        modificationDate: "2025-10-25",
    };

    return (
        <>
            <div className="flex justify-end items-start align-top">
                <ProfileButton text="Save" bgColor="bg-[#227950] hover:bg-green-800" />
                <ProfileButton text="Edit" bgColor="bg-blue-800 hover:bg-blue-900" />
            </div>
            <h5 className="text-center text-5xl font-bold">Profile Information</h5>
            <div>
                <div className="flex justify-center my-10">
                    <img
                        src={`https://robohash.org/${userInfo.name}${userInfo.lastname}.png`}
                        alt={`User ${userInfo.name} ${userInfo.lastname}`}
                        className="border-6 rounded-full w-72"
                    />
                </div>
                {/* <ProfileForm /> */}
                <ProfileInfo userInfo={userInfo} />
            </div>
        </>
    );
}
export default ProfileView;
