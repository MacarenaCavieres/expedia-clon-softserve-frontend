import { useForm } from "react-hook-form";
import type { SingleUserInfo, UserInfoForm } from "@/schemas/userSchemas";
import Errors from "../Errors";
import { useEffect, type RefObject } from "react";
import { LucideUser, LucideAtSign, LucidePhone } from "lucide-react";

type Props = {
    userInfo: SingleUserInfo | undefined;
    formRef: RefObject<HTMLFormElement | null>;
    handleForm: (isFormValid: boolean) => void;
    onSuccessfulSubmit: (formData: UserInfoForm) => void;
};

function ProfileForm({ userInfo, formRef, handleForm, onSuccessfulSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
    } = useForm<UserInfoForm>({
        mode: "onChange",
        defaultValues: userInfo,
    });

    useEffect(() => {
        if (userInfo) {
            reset(userInfo);
            trigger().then(handleForm);
        }
    }, [userInfo, reset, trigger, handleForm]);

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
            ref={formRef}
            onSubmit={handleSubmit(onSuccessfulSubmit)}
        >
            <InputGroup
                label="Name"
                icon={<LucideUser size={16} />}
                register={register("name", { required: "Name is required" })}
                error={errors.name?.message}
            />
            <InputGroup
                label="Lastname"
                icon={<LucideUser size={16} />}
                register={register("lastname", { required: "Lastname is required" })}
                error={errors.lastname?.message}
            />
            <InputGroup
                label="Email"
                icon={<LucideAtSign size={16} />}
                register={register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                error={errors.email?.message}
            />
            <InputGroup
                label="Phone"
                icon={<LucidePhone size={16} />}
                register={register("phone", { required: "Phone is required" })}
                error={errors.phone?.message}
            />
        </form>
    );
}

function InputGroup({ label, icon, register, error }: any) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                {label}
            </label>
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all ${
                    error
                        ? "border-red-100 bg-red-50"
                        : "border-slate-100 bg-slate-50 focus-within:border-blue-200 focus-within:bg-white"
                }`}
            >
                <span className={error ? "text-red-400" : "text-slate-400"}>{icon}</span>
                <input
                    {...register}
                    className="bg-transparent w-full outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300"
                />
            </div>
            {error && <Errors>{error}</Errors>}
        </div>
    );
}

export default ProfileForm;
