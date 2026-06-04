import GameCard from "./GameCard";

export default function GameList({ children }) {
    return (
        
        <main className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6">
            {children}
        </main>
    );
}

GameList.Card = GameCard;