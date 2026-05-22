import { useForm } from "react-hook-form";

export default function RegisterPage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);
    return (
        <main className="h-screen flex justify-center items-center">

            <form className="p-10 bg-nav-gray w-1/2" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Name"
                    className="input input-lg mb-5 w-full"
                    {...register("first_name", { required: "This field is required" })}
                />

                {errors.first_name && (
                    <p role="alert" className="text-red-500 mb-6">
                        {errors.first_name.message}
                    </p>
                )}
            </form>

        </main>
    )

}