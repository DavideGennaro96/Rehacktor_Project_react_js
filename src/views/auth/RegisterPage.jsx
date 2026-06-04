import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { supabase } from "../../database/supabase";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export default function RegisterPage() {

    const {
        register,
        handleSubmit,
        setError, 
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            remember_me: false
        }
    });

    const { signUp } = useContext(UserContext);
    const navigate = useNavigate();

   
    const onSubmit = (user_data) => {
        signUp({
            email: user_data.email,
            password: user_data.password,
            options: {
                data: {
                    first_name: user_data.first_name,
                    last_name: user_data.last_name,
                    username: user_data.username
                }
            }
        })
        .then(() => {
            navigate('/');
        })
        .catch((error) => {
            console.error(error);
            
            
            if (error.message?.includes("already registered") || error.code === "23505") {
                setError("root.serverError", {
                    type: "manual",
                    message: "Questo utente o questa email risultano già registrati."
                });
            } else {
                setError("root.serverError", {
                    type: "manual",
                    message: "Impossibile completare la registrazione. Controlla i requisiti dei campi."
                });
            }
        });
    };

    return (
        <main className="register-container">
            <div className="register-wrapper">
                
                <h2 className="register-title">
                    Crea un Account
                </h2>

                <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    
                    
                    {errors.root?.serverError && (
                        <div className="register-form-alert" role="alert">
                            {errors.root.serverError.message}
                        </div>
                    )}
                    
                    {/* CAMPO NOME */}
                    <label className="form-control w-full mb-2">
                        <div className="label py-1">
                            <span className="register-label-text">Nome</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered register-input"
                            {...register("first_name", { required: "Questo campo è richiesto" })}
                        />
                        {errors.first_name && (
                            <p role="alert" className="register-error-message">
                                {errors.first_name.message}
                            </p>
                        )}
                    </label>

                    {/* CAMPO COGNOME */}
                    <label className="form-control w-full mb-2">
                        <div className="label py-1">
                            <span className="register-label-text">Cognome</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="input input-bordered register-input"
                            {...register("last_name", { required: "Questo campo è richiesto" })}
                        />
                        {errors.last_name && (
                            <p role="alert" className="register-error-message">
                                {errors.last_name.message}
                            </p>
                        )}
                    </label>

                    {/* CAMPO USERNAME */}
                    <label className="form-control w-full mb-2">
                        <div className="label py-1">
                            <span className="register-label-text">Username</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered register-input"
                            {...register("username", { required: "Questo campo è richiesto" })}
                        />
                        {errors.username && (
                            <p role="alert" className="register-error-message">
                                {errors.username.message}
                            </p>
                        )}
                    </label>

                    {/* CAMPO EMAIL */}
                    <label className="form-control w-full mb-2">
                        <div className="label py-1">
                            <span className="register-label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered register-input"
                            {...register("email", { 
                                required: "Questo campo è richiesto",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Inserisci un indirizzo email valido"
                                }
                            })}
                        />
                        {errors.email && (
                            <p role="alert" className="register-error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </label>

                    {/* CAMPO PASSWORD */}
                    <label className="form-control w-full mb-4">
                        <div className="label py-1">
                            <span className="register-label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered register-input"
                            {...register("password", {
                                required: "Questo campo è richiesto",
                                minLength: { value: 8, message: "La password deve contenere almeno 8 caratteri" }
                            })}
                        />
                        {errors.password && (
                            <p role="alert" className="register-error-message">
                                {errors.password.message}
                            </p>
                        )}
                    </label>

                    {/* TASTO RICORDAMI */}
                    <div className="form-control mb-6">
                        <label className="label cursor-pointer register-checkbox-container">
                            <input
                                type="checkbox"
                                className="checkbox register-checkbox"
                                {...register("remember_me")}
                            />
                            <span className="register-label-text font-medium selection:bg-transparent">
                                Ricordami su questo dispositivo
                            </span>
                        </label>
                    </div>

                    {/* BOTTONE REGISTRATI */}
                    <button type="submit" className="btn register-submit-btn">
                        Sign Up
                    </button>
                </form>
            </div>
        </main>
    );
}