import { Link } from "react-router";
import './Sidebar.jsx'; 

export default function Sidebar({ genres }) {
    return (
        <nav className="h-screen w-64 custom-sidebar"> 
            <div className="px-5">
                <h2 className="sidebar-title">Generi</h2>
                
                <ul>
                    {genres.map((genre) => {
                        return (
                            <li className="mb-1" key={genre.id}>
                                <Link 
                                    to={`/genre/${genre.slug}`}
                                    className="sidebar-link"
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