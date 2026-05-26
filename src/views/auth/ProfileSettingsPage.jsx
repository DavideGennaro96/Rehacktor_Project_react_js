import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import routes from "../../router/routes";

export default function ProfileSettingsPage() {
    const { updateProfile } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        updateProfile(data);
        navigate(routes.profile);
    };
    return (
        <main className="h-screen flex justify-center items-center">
            <form
                className="p-10 bg-nav-gray w-1/2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type="text"
                    placeholder="Name"
                    className="input input-lg mb-5 w-full"
                    {...register("first_name", { required: "This field is required" })}
                />

                {errors.first_ && (
                    <p role="alert" className="text-red-500 mb-6">
                        {errors.first_.message}
                    </p>
                )}
                
                <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-lg mb-5 w-full"
                    {...register("last_name", { required: "This field is required" })}
                />
                {errors.last_name && (
                    <p role="alert" className="text-red-500 mb-6">
                        {errors.last_name.message}
                    </p>
                )}

                
                <input
                    type="text"
                    placeholder="Username"
                    className="input input-lg mb-5 w-full"
                    {...register("username", { required: "This field is required" })}
                />
                {errors.username && (
                    <p role="alert" className="text-red-500 mb-6">
                        {errors.username.message}
                    </p>
                )}

                <button className="btn btn-neutral p-5">Edit</button>
            </form>
        </main>
    );
}
