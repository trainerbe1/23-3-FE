import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import AuthView from "../views/AuthView";
import Home from "../views/Home";

const router = createBrowserRouter([
    {
        path: routes.main,
        element: <AuthView />
    },
    {
        path: routes.home,
        element: <Home />
    },
]);

export default router;