import { useEffect, useState } from "react";
import themes from "../common/theme";
import { getRecipes } from "../services/recipe_service";

export default function RecipeSelector({
    selectHandler
}) {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState({});

    useEffect(() => {
        getRecipesData();
    }, []);

    async function getRecipesData() {
        const recipeData = await getRecipes();
        setRecipes(recipeData.data.data);
    }

    function selectRecipe(r) {
        setSelectedRecipe(r);
        selectHandler(r);
    }

    return(
        <div>
            <input type="text" className={themes.textfield} placeholder="Find recipe" />

            <div className="h-96">
                {
                    recipes.map((r, i) => <div key={i} onClick={() => selectRecipe(r)} className="hover:bg-slate-700 flex p-1 rounded cursor-pointer">
                        <div className="p-2">
                            <img width={95} className="rounded" src={r.img_url} alt="" srcSet="" />
                        </div>
                        <div className="text-slate-400 p-2 w-full">
                            <div>{r.name}</div>
                            <div className="text-xs">Tags: {r.tags ?? '-'}</div>
                            <div className="mt-3">
                                <span className="border p-1 px-2 text-xs rounded-lg">{r.category.name}</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}