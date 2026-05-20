import { useLoaderData } from "react-router"
import GameList from "../components/GameList";

export default function Homepage () {
    const games =useLoaderData();
    // console.log(games);
    return (
        <>
            {/* <h1 className="text-3xl text-center font-bold">
                Homepage
            </h1> */}
            <GameList>
                {games.map((game)=>{
                    return (
                        <GameList.Card key= {game.id} game={game} />
                    )
                
            })}
            </GameList>
        </>
    )
}