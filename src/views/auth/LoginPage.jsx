import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";

export default function LoginPage() {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const onSubmit = async (user_data) => {
        await login ({
            email:user_data.email,
            password: user_data.password,
        });
        navigate('/');
    };
    return (
        <main className="h-screen flex justify-center items-center">
            <form
                className="p-10 bg-nav-gray w-1/2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-lg mb-5 w-full"
                    {...register("email", { required: "This field is required" })}
                />

                {errors.email && (
                    <p role="alert" className="text-red-500 mb-6">
                        {errors.email.message}
                    </p>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-lg mb-5 w-full"
                    {...register("password", {
                        required: "This field is required",
                       minLength: { value: 8, message: "Password must be at least 8 characters" }
                    })}
                />

                {errors.password && (
                    <p role="alert" className="text-red-500 mb-6">
                        {errors.password.message}
                    </p>
                )}

                <button className="btn btn-neutral p-5">Sign in</button>
            </form>
        </main>
    );


}