import type { UserInformation } from "@/types/index";

type Props = {
    userInfo: UserInformation;
};
function ProfileInfo({ userInfo }: Props) {
    return (
        <div className="grid grid-cols-2 items-center max-w-4xl mx-auto flex-wrap md:flex-nowrap gap-5">
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Name</p>
                <p className="font-semibold text-xl">{userInfo.name}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Lastname</p>
                <p className="font-semibold text-xl">{userInfo.lastname}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Email</p>
                <p className="font-semibold text-xl">{userInfo.email}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Phone</p>
                <p className="font-semibold text-xl">{userInfo.phone}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Creation Date</p>
                <p className="font-semibold text-xl">{userInfo.creationDate}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Modification Date</p>
                <p className="font-semibold text-xl">{userInfo.modificationDate}</p>
            </div>
        </div>
    );
}
export default ProfileInfo;
