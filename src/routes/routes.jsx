import app from "../common/app";

const routes = {
    main: app.baseUrl,
    home: "/home",
    shoppingList: "/shopping-list",
    mealPlanner: "/meal-planner",
    favourites: "/favourites",
    recipes: "/recipes",
    
    adminHome: "/admin",
    userManagement: "/admin/user",
    recipeManagement: "/admin/recipe",

    logout: "/logout",
};

export default routes;