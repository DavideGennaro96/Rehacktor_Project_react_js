import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Homepage from "../views/Homepage";
import routes from "./routes";
import { getAllGamesLoader, getAllGenres, getFilteredBuGenreGames, getSearchedGames } from "./loaders";
import SearchPage from "../views/SearchPage";
import GenrePage from "../views/GenrePage"; 
import AuthenticationLayout from "../components/Authentication/AuthenticationLayout";
import RegisterPage from "../views/auth/RegisterPage";
import LoginPage from "../views/auth/LoginPage";
import ProfilePage from "../views/auth/ProfilePage";
// import ProfileSettingsPage from "../views/auth/ProfileSettingsPage";

const router = createBrowserRouter([
    {
        path: routes.home,
        Component: Layout,
        loader: getAllGenres,
        errorElement: <p>Ops! Il server non risponde, riprova più tardi.</p>,
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
            },

            {
                path: routes.genre,
                Component: GenrePage,
                loader: getFilteredBuGenreGames

            }
        ]
    },
    {
        path: '/auth',
        Component: AuthenticationLayout,
        children: [
            {
                path: routes.register,
                Component: RegisterPage
            },
            {
                path: routes.login,
                Component: LoginPage
            },
            {
                path:routes.profile,
                Component: ProfilePage
            },
            // {
            //     path:routes.profile_settings,

            //     Component: ProfileSettingsPage
            // },
        ]
    }
]);

export default router;