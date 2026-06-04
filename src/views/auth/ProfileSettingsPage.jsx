import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import routes from "../../routing/routes";
import { supabase } from "../../database/supabase";

export default function ProfileSettingsPage() {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const { profile, getUser, updateProfile } = useContext(UserContext);

    const handleChange = (e) => {
        setFile(() => e.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(() => imageUrl);
        }
    }, [file]);

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;
        const fileExt = file.name.split(".").pop();
        const fileName = `${profile.id}${Math.random()}.${fileExt}`;
        await supabase.storage.from("avatars").upload(fileName, file);
        await supabase
            .from("profiles")
            .upsert({ id: profile.id, avatar_url: fileName })
            .select();
        await getUser();
    };

    const {
        register,
        handleSubmit,
        setError, // <--- Unico inserimento necessario per attivare la scritta rossa
        formState: { errors },
    } = useForm({

        defaultValues: {
            first_name: profile?.first_name || "",
            last_name: profile?.last_name || "",
            username: profile?.username || ""
        }
    });

    const navigate = useNavigate();

    
    const onSubmit = (data) => {
        updateProfile(data)
            .then(() => {
                navigate(routes.profile);
            })
            .catch((error) => {
                console.error(error);
                setError("username", {
                    type: "manual",
                    message: "Questo username è già in uso da un altro utente."
                });
            });
    };

    return (

        <main className="min-h-screen bg-[#F9F5F0] py-10 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center">

            <div className="w-full max-w-5xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2C1E1A] mb-8 text-center uppercase tracking-wider">
                    Modifica Profilo
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">


                    <form
                        className="p-6 sm:p-8 bg-[#F9F5F0] border-2 border-[#D5B99A] rounded-xl shadow-sm flex flex-col"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className="font-bold text-lg text-[#B87355] mb-6 border-b border-[#D5B99A] pb-2 uppercase tracking-wide">
                            Dati Personali
                        </h3>

                        <label className="form-control w-full mb-4">
                            <div className="label py-1">
                                <span className="label-text text-[#2C1E1A] font-medium">Nome</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered w-full bg-white text-[#2C1E1A] border-[#D5B99A] focus:border-[#B87355] focus:outline-none"
                                {...register("first_name", { required: "Questo campo è richiesto" })}
                            />
                            {errors.first_name && (
                                <p role="alert" className="text-[#B87355] text-xs mt-1 font-medium">
                                    {errors.first_name.message}
                                </p>
                            )}
                        </label>

                        <label className="form-control w-full mb-4">
                            <div className="label py-1">
                                <span className="label-text text-[#2C1E1A] font-medium">Cognome</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input input-bordered w-full bg-white text-[#2C1E1A] border-[#D5B99A] focus:border-[#B87355] focus:outline-none"
                                {...register("last_name", { required: "Questo campo è richiesto" })}
                            />
                            {errors.last_name && (
                                <p role="alert" className="text-[#B87355] text-xs mt-1 font-medium">
                                    {errors.last_name.message}
                                </p>
                            )}
                        </label>

                        <label className="form-control w-full mb-6">
                            <div className="label py-1">
                                <span className="label-text text-[#2C1E1A] font-medium">Username</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="input input-bordered w-full bg-white text-[#2C1E1A] border-[#D5B99A] focus:border-[#B87355] focus:outline-none"
                                {...register("username", { required: "Questo campo è richiesto" })}
                            />
                            {errors.username && (
                                <p role="alert" className="text-[#B87355] text-xs mt-1 font-medium">
                                    {errors.username.message}
                                </p>
                            )}
                        </label>

                        <button
                            type="submit"
                            className="btn font-bold uppercase tracking-wider w-full transition-all duration-200"
                            style={{
                                backgroundColor: 'var(--color-dark-wood)',
                                color: 'var(--color-cream-light)',
                                border: 'none'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-terracotta)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-dark-wood)'}
                        >
                            Salva Modifiche
                        </button>
                    </form>


                    <div className="space-y-6">
                        <form
                            className="p-6 sm:p-8 bg-[#F9F5F0] border-2 border-[#D5B99A] rounded-xl shadow-sm flex flex-col"
                            onSubmit={handleAvatarSubmit}
                        >
                            <h3 className="font-bold text-lg text-[#B87355] mb-6 border-b border-[#D5B99A] pb-2 uppercase tracking-wide">
                                Immagine Profilo
                            </h3>

                            <label className="form-control w-full mb-6">
                                <div className="label py-1">
                                    <span className="label-text text-[#2C1E1A] font-medium">Seleziona file</span>
                                </div>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full bg-white text-[#2C1E1A] border-[#D5B99A] focus:outline-none file:bg-[#D5B99A] file:text-[#2C1E1A] file:border-0"
                                    onChange={handleChange}
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={!file}
                                className="btn font-bold uppercase tracking-wider w-full transition-all duration-200 disabled:opacity-50"
                                style={{
                                    backgroundColor: 'var(--color-hazelnut)',
                                    color: 'var(--color-dark-wood)',
                                    border: '1px solid var(--color-dark-wood)'
                                }}
                                onMouseEnter={(e) => { if (file) e.target.style.backgroundColor = 'var(--color-hazelnut-hover)'; }}
                                onMouseLeave={(e) => { if (file) e.target.style.backgroundColor = 'var(--color-hazelnut)'; }}
                            >
                                Aggiorna Avatar
                            </button>
                        </form>


                        {preview && (
                            <article className="p-6 bg-[#F9F5F0] border-2 border-[#D5B99A] rounded-xl flex flex-col items-center text-center shadow-sm animate-fadeIn">
                                <h4 className="text-xs font-bold text-[#B87355] uppercase tracking-wider mb-3">Anteprima Nuovo Avatar</h4>
                                <img
                                    src={preview}
                                    alt="Avatar Preview"
                                    className="w-28 h-28 rounded-full object-cover border-2 border-[#B87355] shadow-inner bg-[#2C1E1A]"
                                />
                            </article>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}