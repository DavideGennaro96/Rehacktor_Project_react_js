import { Link } from "react-router";

export default function Sidebar({ genres, isMobile = false, setIsOpen }) {
    
    const handleLinkClick = () => {
        if (isMobile && setIsOpen) {
            setIsOpen(false);
        }
    };

    return (
        
        <nav className={`custom-sidebar w-full lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto ${isMobile ? 'sidebar-dropdown-mode' : 'sidebar-desktop-mode'}`}> 
            <div className="px-5 py-4">
                
                
                {!isMobile && <h2 className="sidebar-title">Generi</h2>}
                
                <ul>
                    {genres.map((genre) => {
                        return (
                            <li className="mb-1" key={genre.id}>
                                <Link 
                                    to={`/genre/${genre.slug}`}
                                    className="sidebar-link"
                                    onClick={handleLinkClick}
                                > 
                                    {genre.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}