import { faAdd, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteUser, getUsers } from '../../../services/user_service';
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import { getRecipes } from "../../../services/recipe_service";

function RecipeManagementContent() {
  const [recipes, setRecipes] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getRecipesData();
  }, []);

  function handlePageClick(e) {
    getRecipesData(e.selected + 1);
  }

  async function getRecipesData(page = 1) {
    const data = await getRecipes(page);
    setRecipes(data.data.data);
    setTotalPage(data.data.totalPages);
  }

  async function deleteUserHandler(r) {
    await deleteUser(r.id);
    getRecipesData();
    toast.success('User deleted successfully');
  }

  return (
    <div>
      <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
        Recipes Management
      </div>


      <div className="p-6">
        <div className="mb-6">
          <button type="button" className="text-sm rounded bg-slate-800 hover:bg-gray-700  py-1 px-3"><FontAwesomeIcon icon={faAdd} /> Add Recipe</button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 w-28">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tags
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Area
                      </th>
                      <th scope="col" className="px-6 py-3 w-28">
                        Total steps
                      </th>
                      <th scope="col" className="px-6 py-3 w-28">
                        Total ingredients
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    recipes.map((r, i) => 
                      <tr key={i} className="bg-white dark:bg-gray-800">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="rounded w-full" src={r.img_url} alt="" />
                          </th>
                          <td className="px-6 py-4">
                            {r.name}
                          </td>
                          <td className="px-6 py-4">
                            {r.tags ?? '-'}
                          </td>
                          <td className="px-6 py-4">
                            {r.category.name}
                          </td>
                          <td className="px-6 py-4">
                            {r.area.name}
                          </td>
                          <td className="px-6 py-4">
                            {r.ingredient.split('\n').length}
                          </td>
                          <td className="px-6 py-4">
                            {r.instructions.split('\n').length}
                          </td>
                          <td className="px-6 py-4">
                            <button type="button" onClick={() => deleteUserHandler(u)} className="text-blue-400 hover:text-blue-600">
                              Delete
                            </button>
                          </td>
                      </tr>
                    )
                  }
                </tbody>
            </table>
        </div>
      </div>

      <div className='mt-5'>
        <ReactPaginate
          className='react-paginate'
          breakLabel="..."
          nextLabel=">>"
          previousLabel="<<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
  
export default RecipeManagementContent
  