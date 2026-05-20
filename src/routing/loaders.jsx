export async function getAllGamesLoader() {
    const promise = await fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2026-01-01,2026-12-31`);
    const json = await promise.json();
    return json;
}