import { useContext, useEffect, useState } from "react";
import Ryu from "../../assets/ryu.png";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router";
import routes from "../../routing/routes";
import { supabase } from "../../database/supabase";

export default function ProfilePage() {
    const { user, profile } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState();
    const [userFavourites, setUserFavourites] = useState();

    const dowload_avatar = async () => {
        if (profile) {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(profile.avatar_url);
            if (data) {
                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            }
        }
    };

    const get_favourites = async () => {
        if (profile) {
            let { data: favourites, error } = await supabase
                .from("favourites")
                .select("*")
                .eq("profile_id", profile.id);
            setUserFavourites(favourites);
        }
    };

    useEffect(() => {
        dowload_avatar();
        get_favourites();
    }, [profile]);

    return (
        
        <main className="min-h-screen bg-[#F9F5F0] py-10 px-4 sm:px-8 md:px-16 lg:px-24">
            {user && profile && (
                <div className="max-w-6xl mx-auto space-y-10">

                    
                    <article className="flex flex-col items-center text-center">
                        <div className="p-1 rounded-full border-2 border-[#B87355] shadow-sm">
                            <img
                                src={avatarUrl ?? Ryu}
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover bg-[#2C1E1A]"
                                alt="Profile Image"
                            />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-[#2C1E1A]">
                            Ciao, {profile.first_name}!
                        </h2>
                    </article>

                    
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="hidden md:block"></div> 

                        <article className="bg-[#F9F5F0] border-2 border-[#D5B99A] text-[#2C1E1A] rounded-xl p-6 sm:p-8 shadow-sm">
                            <h3 className="font-bold text-lg border-b-2 border-[#D5B99A] pb-2 mb-4 text-[#B87355] uppercase tracking-wider text-center md:text-left">
                                I tuoi Dati
                            </h3>
                            <div className="space-y-2 text-sm sm:text-base">
                                <p><span className="font-semibold text-[#B87355]">Nome:</span> {profile.first_name} {profile.last_name}</p>
                                <p><span className="font-semibold text-[#B87355]">Username:</span> @{profile.username}</p>
                                <p className="break-all"><span className="font-semibold text-[#B87355]">Email:</span> {user.email}</p>
                            </div>

                            <div className="mt-6 flex justify-center md:justify-start">
                                <Link
                                    className="btn btn-sm sm:btn-md font-bold uppercase tracking-wider border transition-all duration-200"
                                    style={{
                                        backgroundColor: 'var(--color-cream-light)',
                                        color: 'var(--color-dark-wood)',
                                        borderColor: 'var(--color-dark-wood)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'var(--color-hazelnut)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'var(--color-cream-light)';
                                    }}
                                    to={routes.profile_settings}
                                >
                                    Impostazioni
                                </Link>
                            </div>
                        </article>

                        <div className="hidden md:block"></div> 
                    </section>

                    
                    <section className="space-y-4">
                        <h3 className="font-bold text-xl text-[#2C1E1A] text-center md:text-left border-b border-[#D5B99A] pb-2">
                            I tuoi preferiti ({userFavourites?.length ?? 0})
                        </h3>

                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {userFavourites && userFavourites.length > 0 ? (
                                userFavourites.map((game) => {
                                    return (
                                        <div
                                            className="w-full flex flex-col bg-[#F9F5F0] border border-[#D5B99A] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                                            key={game.id}
                                        >
                                            
                                            <div className="p-4 flex-grow flex items-center justify-center text-center h-24 bg-[#F9F5F0]">
                                                <h2 className="text-[#2C1E1A] font-semibold text-sm sm:text-base line-clamp-2">
                                                    {game.game_name}
                                                </h2>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="col-span-full text-center text-gray-500 italic py-6">
                                    Non hai ancora aggiunto nessun gioco ai preferiti.
                                </p>
                            )}
                        </div>
                    </section>

                </div>
            )}
        </main>
    );
}