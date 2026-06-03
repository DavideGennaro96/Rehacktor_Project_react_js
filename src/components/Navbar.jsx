import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import routes from '../routing/routes';
import { UserContext } from '../context/UserContext';
import './Navbar.jsx';

export default function Navbar() {
    const [slug, setSlug] = useState('');

    const handleChange = (e) => {
        setSlug(e.target.value);
    };

    const navigate = useNavigate();
    const { user, signOut } = useContext(UserContext);

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="navbar shadow-md custom-navbar">
            {/* Logo / Brand */}
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl nav-link" to={routes.home}>
                    Reactor
                </Link>
            </div>

            {/* Guest Menu (Register/Login) */}
            {!user && (
                <div>
                    <ul className="flex gap-4 mr-4">
                        <li>
                            <Link className="nav-link p-2 rounded-lg" to={routes.register}>Register</Link>
                        </li>
                        <li>
                            <Link className="nav-link p-2 rounded-lg" to={routes.login}>Login</Link>
                        </li>
                    </ul>
                </div>
            )}

            {/* Search and User Actions */}
            <div className="flex gap-2">
                <div className="flex items-center gap-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered w-24 md:w-auto search-input"
                        onChange={handleChange}
                    />
                    <Link className='btn btn-square btn-search' to={`/search/${slug}`}>
                        <FaSearch />
                    </Link>
                </div>

                {/* User Dropdown Menu */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full ring ring-offset-2" style={{ borderColor: 'var(--color-dark-wood)' }}>
                            <img
                                alt="User Avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-lg">
                        <li>
                            <Link to={routes.profile}>Profile</Link>
                        </li>
                        <li onClick={handleLogout}>
                            <p>Logout</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}