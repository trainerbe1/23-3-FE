import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import AuthView from "../views/AuthView";
import HomeView from "../views/HomeView";
import ShoppingListView from "../views/ShoppingListView";

const router = createBrowserRouter([
    {
        path: routes.main,
        element: <AuthView />
    },
    {
        path: routes.home,
        element: <HomeView />
    },
    {
        path: routes.shoppingList,
        element: <ShoppingListView />
    },
]);

export default router;