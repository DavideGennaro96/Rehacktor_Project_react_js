import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";
import Homepage from "../views/Homepage";
import routes from "./routes";
import { getAllGamesLoader } from "./loaders";

const router = createBrowserRouter([
    {
        path: routes.home,
        Component: Layout,
        children: [
            {
                path: routes.home,
                Component: Homepage,
                loader: getAllGamesLoader
            }
        ]
    }
]);

export default router;