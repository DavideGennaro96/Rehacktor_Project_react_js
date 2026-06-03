export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        
        <footer className="bg-nav-gray text-white py-10 mt-24 border-t border-gray-700">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Sezione Brand / Info */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold tracking-wider text-neutral-content">
                        DASHBOARD
                    </h2>
                    <p className="text-sm text-gray-400 max-w-xs">
                        Pannello di controllo utente per la gestione del profilo, aggiornamento dei dati e personalizzazione delle impostazioni di sicurezza.
                    </p>
                </div>

                {/* Sezione Stato Sistema */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Stato della Piattaforma
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        Tutti i sistemi sono operativi
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Database e Storage sincronizzati correttamente con Supabase.
                    </p>
                </div>

                {/* Sezione Info Sessione */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        Sicurezza
                    </h3>
                    <p className="text-sm text-gray-400">
                        I dati del profilo e l'avatar caricato sono protetti tramite politiche di sicurezza RLS (Row Level Security).
                    </p>
                </div>

            </div>

            {/* Barra dei Copyright inferiore */}
            <div className="border-t border-gray-800 mt-10 pt-5 text-center text-xs text-gray-500">
                <p>&copy; {currentYear} Area Riservata. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}