import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Homepage from "../views/Homepage";
import routes from "./routes";
import { getAllGamesLoader, getAllGenres, getSearchedGames } from "./loaders";
import SearchPage from "../views/SearchPage";

const router = createBrowserRouter([
    {
        path: routes.home,
        Component: Layout,
        loader: getAllGenres,
        children: [
            {
                path: routes.home,
                Component: Homepage,
                loader: getAllGamesLoader
            },

            {
                path: routes.search,
                Component: SearchPage,
                loader: getSearchedGames
            }
        ]
    }
]);

export default router;