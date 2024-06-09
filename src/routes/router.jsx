import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import AuthView from "../views/AuthView";
import HomeView from "../views/HomeView";
import ShoppingListView from "../views/ShoppingListView";
import MealPlannerView from "../views/MealPlannerView";
import FavouritesView from "../views/FavouritesView";
import RecipesView from "../views/RecipesView";
import LogoutView from "../views/LogoutView";
import RecipeManagementView from "../views/RecipeManagementView";
import UserManagementView from "../views/UserManagementView";
import AdminHomeView from "../views/AdminHomeView";
import RecipeDetailView from "../views/RecipeDetailView";

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
    {
        path: routes.mealPlanner,
        element: <MealPlannerView />
    },
    {
        path: routes.recipes,
        element: <RecipesView />,
    },
    {
        path: routes.recipeDetail(),
        element: <RecipeDetailView />
    },
    {
        path: routes.favourites,
        element: <FavouritesView />
    },

    {
        path: routes.adminHome,
        element: <AdminHomeView />,
        children: [
            {
                path: routes.userManagement,
                element: <UserManagementView />
            },
            {
                path: routes.recipeManagement,
                element: <RecipeManagementView />
            },
        ]
    },

    {
        path: routes.logout,
        element: <LogoutView />
    },
]);

export default router;