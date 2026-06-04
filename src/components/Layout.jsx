import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function Layout() {
    const genres = useLoaderData();
   
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

           
            <div className="lg:hidden bg-[var(--color-cream-light)] p-3 border-b border-[var(--color-hazelnut)] flex flex-col items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="btn btn-sm w-full max-w-xs font-bold uppercase tracking-wider"
                    style={{
                        backgroundColor: 'var(--color-hazelnut)',
                        color: 'var(--color-dark-wood)',
                        border: '1px solid var(--color-dark-wood)'
                    }}
                >
                    {isMobileMenuOpen ? "Chiudi Generi ▲" : "Scegli Genere ▼"}
                </button>

                
                {isMobileMenuOpen && (
                    <div className="w-full max-w-xs mt-2 animate-fadeIn">
                        <Sidebar genres={genres} isMobile={true} setIsOpen={setIsMobileMenuOpen} />
                    </div>
                )}
            </div>

            
            <section className="grid grid-cols-1 lg:grid-cols-7 gap-4 grow">

              
                <div className="hidden lg:block lg:col-span-1">
                    <Sidebar genres={genres} isMobile={false} />
                </div>

                
                <div className="col-span-1 lg:col-span-6">
                    <Outlet />
                </div>

            </section>

            <Footer />
        </div>
    );
}