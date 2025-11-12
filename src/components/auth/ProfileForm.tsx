import { useForm } from "react-hook-form";
import type { SingleUserInfo, UserInfoForm } from "@/schemas/userSchemas";
import { formatTimestamp } from "@/utils/dateFormat";
import Errors from "../Errors";
import { useEffect, type RefObject } from "react";

type Props = {
    userInfo: SingleUserInfo | undefined;
    formRef: RefObject<HTMLFormElement | null>;
    handleForm: (isFormValid: boolean) => void;
    onSuccessfulSubmit: (formData: UserInfoForm) => void;
};
function ProfileForm({ userInfo, formRef, handleForm, onSuccessfulSubmit }: Props) {
    const creation = formatTimestamp(userInfo?.createdAt);
    const modification = formatTimestamp(userInfo?.updatedAt);

    const initialValues: UserInfoForm = {
        name: userInfo?.name,
        lastname: userInfo?.lastname,
        email: userInfo?.email,
        phone: userInfo?.phone,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm<UserInfoForm>({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (!userInfo) return;

        (async () => {
            reset({
                name: userInfo.name ?? "",
                lastname: userInfo.lastname ?? "",
                email: userInfo.email ?? "",
                phone: userInfo.phone ?? "",
            });

            const ok = await trigger();
            handleForm(ok);
        })();
    }, [userInfo, reset, trigger, handleForm]);

    const handleUserForm = (formData: UserInfoForm) => {
        onSuccessfulSubmit(formData);
    };

    return (
        <form
            className="grid grid-cols-2 items-center max-w-4xl mx-auto flex-wrap md:flex-nowrap gap-5"
            ref={formRef}
            onSubmit={handleSubmit(handleUserForm)}
        >
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="username" className="font-semibold">
                    Name
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="userName"
                    className="border-2 rounded-lg p-2"
                    {...register("name", {
                        required: "The name is required",
                        pattern: {
                            value: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ@.]*$/,
                            message: "Special characters are not accepted",
                        },
                    })}
                />
                <Errors>{errors.name?.message}</Errors>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="lastname" className="font-semibold">
                    Lastname
                </label>
                <input
                    id="lastname"
                    type="text"
                    placeholder="userLastname"
                    className="border-2 rounded-lg p-2"
                    {...register("lastname", {
                        required: "Lastname is required",
                        pattern: {
                            value: /^[a-zA-Z0-9 áéíóúÁÉÍÓÚüÜñÑ@.]*$/,
                            message: "Special characters are not accepted",
                        },
                    })}
                />
                <Errors>{errors.lastname?.message}</Errors>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="email" className="font-semibold">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="userEmail"
                    className="border-2 rounded-lg p-2"
                    {...register("email", {
                        required: "The email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "You must enter a valid email address",
                        },
                    })}
                />
                <Errors>{errors.email?.message}</Errors>
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="phone" className="font-semibold">
                    Phone
                </label>
                <input
                    id="phone"
                    type="text"
                    placeholder="userPhone"
                    className="border-2 rounded-lg p-2"
                    {...register("phone", {
                        required: "The phone is required",
                        pattern: {
                            value: /^[0-9+() -]*$/,
                            message: "Special characters are not accepted",
                        },
                    })}
                />
                <Errors>{errors.phone?.message}</Errors>
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
        </form>
    );
}
export default ProfileForm;
