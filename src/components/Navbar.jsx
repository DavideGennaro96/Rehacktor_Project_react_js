import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import routes from '../routing/routes';
import { UserContext } from '../context/UserContext';


export default function Navbar() {
    const [slug, setSlug] = useState();

    const handleChange = (e) => {
        setSlug(e.target.value);
    };

    const navigate = useNavigate();
    const { user, signOut } = useContext(UserContext);

    const handleLogout = async () => {
        
        await signOut();
        navigate('/');
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to={routes.home}>Reactor </Link>
            </div>

            
            {!user && (
                <div>
                    <ul className="flex gap-4 mr-4">
                        <li>
                            <Link to={routes.register}>Register</Link>
                        </li>
                        <li>
                            <Link to={routes.login}>Login</Link>
                        </li>
                    </ul>
                </div>
            )}

            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" onChange={handleChange} />
                <Link className='btn btn-square' to={`/search/${slug}`}>
                    <FaSearch />
                </Link>

                
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to ={routes.profile}>Profile</Link>
                        </li>

                        <li onClick={handleLogout}><p>Logout</p></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}