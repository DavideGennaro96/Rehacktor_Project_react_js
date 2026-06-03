import './Footer.jsx'; 

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-10 mt-24 custom-footer">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Sezione Brand / Info */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold tracking-wider footer-title-main">
                        DASHBOARD
                    </h2>
                    <p className="text-sm footer-text">
                        Pannello di controllo utente per la gestione del profilo, aggiornamento dei dati e personalizzazione delle impostazioni di sicurezza.
                    </p>
                </div>

                {/* Sezione Stato Sistema */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold uppercase tracking-wider mb-2 footer-title-sub">
                        Stato della Piattaforma
                    </h3>
                    <div className="flex items-center gap-2 text-sm footer-text">
                        
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                        Tutti i sistemi sono operativi
                    </div>
                    <p className="text-xs mt-1 footer-text-muted">
                        Database e Storage sincronizzati correttamente con Supabase.
                    </p>
                </div>

                {/* Sezione Info Sessione */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold uppercase tracking-wider mb-2 footer-title-sub">
                        Sicurezza
                    </h3>
                    <p className="text-sm footer-text">
                        I dati del profilo e l'avatar caricato sono protetti tramite politiche di sicurezza RLS (Row Level Security).
                    </p>
                </div>

            </div>

            {/* Barra dei Copyright inferiore */}
            <div className="mt-10 pt-5 text-center text-xs footer-bottom-bar">
                <p>&copy; {currentYear} Area Riservata. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}