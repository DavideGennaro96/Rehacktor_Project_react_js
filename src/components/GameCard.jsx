import { Link } from "react-router";
import './GameCard.jsx'; 

export default function GameCard({ game }) {
    return (
        <div className="custom-game-card h-full">
            
            <div className="card-image-wrapper">
                <Link to={`/detail/${game.id}`}>
                    <img
                        src={game.background_image}
                        className="w-full h-full"
                        alt={game.name}
                        loading="lazy" 
                    />
                </Link>
            </div>
            
            
            <div className="card-body-custom">
                <Link to={`/detail/${game.id}`} className="w-full">
                    <p className="card-title-custom text-sm md:text-base line-clamp-2">
                        {game.name}
                    </p>
                </Link>
            </div>
        </div>
    );
}