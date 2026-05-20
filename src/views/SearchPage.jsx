import { useLoaderData } from "react-router";

export default function SearchPage() {
    const games =useLoaderData();
    console.log(games);

    return (
        <>
            <h1>Search</h1>
        </>
    )
}