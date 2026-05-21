import { useLoaderData, useParams } from "react-router";
import GameList from "../components/GameList";

export default function SearchPage() {
    const games = useLoaderData();
    const { slug } = useParams();
    // console.log(games);

    return (
        <>
            <h1 className="text-center text-3xl mt-10 mb-10">Search by slug: {slug}</h1>
            <GameList>
                {games.map((game) => {
                    return (
                        <GameList.Card key={game.id} game={game} />
                    )

                })}
            </GameList>
        </>
    )
}