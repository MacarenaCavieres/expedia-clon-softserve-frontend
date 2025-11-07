function ProfileForm() {
    return (
        <form className="grid grid-cols-2 items-center max-w-4xl mx-auto flex-wrap md:flex-nowrap gap-5">
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="username" className="font-semibold">
                    Name
                </label>
                <input id="username" type="text" placeholder="userName" className="border-2 rounded-lg p-2" />
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
                />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="email" className="font-semibold">
                    Email
                </label>
                <input id="email" type="email" placeholder="userEmail" className="border-2 rounded-lg p-2" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="phone" className="font-semibold">
                    Phone
                </label>
                <input id="phone" type="text" placeholder="userPhone" className="border-2 rounded-lg p-2" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="creationDate" className="font-semibold">
                    Creation Date
                </label>
                <input
                    id="creationDate"
                    type="text"
                    placeholder="userCreationDate"
                    className="border-2 rounded-lg p-2"
                />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="modificationDate" className="font-semibold">
                    Modification Date
                </label>
                <input
                    id="modificationDate"
                    type="text"
                    placeholder="userModificationDate"
                    className="border-2 rounded-lg p-2"
                />
            </div>
        </form>
    );
}
export default ProfileForm;
