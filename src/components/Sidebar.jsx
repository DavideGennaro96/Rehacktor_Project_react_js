

export default function Sidebar({ genres }) {
    return (
        <>
            <nav className="h-screen bg-nav-gray">
                <ul className="px-5">
                    {genres.map((genre) => {
                        return (
                            <li className="mb-2" key={genre.id}>
                                <Link> {genre.name}</Link>
                            </li>
                        );
                    })}
                     
                </ul>
            </nav>
        </>
    );
}
