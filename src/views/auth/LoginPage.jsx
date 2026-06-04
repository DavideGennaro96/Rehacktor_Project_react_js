import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";


export default function LoginPage() {

    const {
        register,
        handleSubmit,
        setError, 
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            remember_me: false
        }
    });

    const navigate = useNavigate();
    const { login } = useContext(UserContext);

   
    const onSubmit = (user_data) => {
        login({
            email: user_data.email,
            password: user_data.password,
        })
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                
                setError("root.serverError", {
                    type: "manual",
                    message: "Email o password non valide. Riprova."
                });
            });
    };

    return (
        <main className="login-container">
            <div className="login-wrapper">

                <h2 className="login-title">
                    Accedi al tuo Account
                </h2>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

                    
                    {errors.root?.serverError && (
                        <div className="login-form-alert" role="alert">
                            {errors.root.serverError.message}
                        </div>
                    )}

                    {/* CAMPO EMAIL */}
                    <label className="form-control w-full mb-2">
                        <div className="label py-1">
                            <span className="login-label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered login-input"
                            {...register("email", { required: "Questo campo è richiesto" })}
                        />
                        {errors.email && (
                            <p role="alert" className="login-error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </label>

                    {/* CAMPO PASSWORD */}
                    <label className="form-control w-full mb-4">
                        <div className="label py-1">
                            <span className="login-label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered login-input"
                            {...register("password", {
                                required: "Questo campo è richiesto",
                                minLength: { value: 8, message: "La password deve contenere almeno 8 caratteri" }
                            })}
                        />
                        {errors.password && (
                            <p role="alert" className="login-error-message">
                                {errors.password.message}
                            </p>
                        )}
                    </label>

                    {/* TASTO RICORDAMI */}
                    <div className="form-control mb-6">
                        <label className="label cursor-pointer login-checkbox-container">
                            <input
                                type="checkbox"
                                className="checkbox login-checkbox"
                                {...register("remember_me")}
                            />
                            <span className="login-label-text font-medium selection:bg-transparent">
                                Ricordami su questo dispositivo
                            </span>
                        </label>
                    </div>

                    {/* BOTTONE ACCEDI */}
                    <button type="submit" className="btn login-submit-btn">
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}