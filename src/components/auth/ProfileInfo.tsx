import type { SingleUserInfo } from "@/types/index";
import { formatTimestamp } from "@/utils/dateFormat";

type Props = {
    userInfo: SingleUserInfo | undefined;
};
function ProfileInfo({ userInfo }: Props) {
    const creation = formatTimestamp(userInfo?.createdAt);
    const modification = formatTimestamp(userInfo?.updatedAt);

    return (
        <div className="grid grid-cols-2 items-center max-w-4xl mx-auto flex-wrap md:flex-nowrap gap-5">
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Name</p>
                <p className="font-semibold text-xl">{userInfo?.name}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Lastname</p>
                <p className="font-semibold text-xl">{userInfo?.lastname}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Email</p>
                <p className="font-semibold text-xl">{userInfo?.email}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Phone</p>
                <p className="font-semibold text-xl">{userInfo?.phone}</p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Creation Date</p>
                <p className="font-semibold text-xl">
                    {typeof creation !== "string" ? `${creation.date} (${creation.time})` : creation}
                </p>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold">Modification Date</p>
                <p className="font-semibold text-xl">
                    {typeof modification !== "string"
                        ? `${modification.date} (${modification.time})`
                        : modification}
                </p>
            </div>
        </div>
    );
}
export default ProfileInfo;
