import ReactPaginate from 'react-paginate';
import themes from '../../common/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLayerGroup, faMapMarkerAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getRecipes, getRecipesByName } from "../../services/recipe_service";
import EmptyCart from "../../assets/svg/empty_cart.svg";
import routes from '../../routes/routes';

function RecipesContent() {
  const userId = useRef(JSON.parse(localStorage.getItem('info')).id);
  const [recipes, setRecipes] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    getRecipeData();
  }, []);

  function handlePageClick(e) {
    getRecipeData(e.selected + 1);
  }

  async function getRecipeData(page = 1) {
    const data = await getRecipes(page);
    setRecipes(data.data.data);
    setTotalPage(data.data.totalPages);
  }

  function useDebounce(effect, dependencies, delay) {
    const callback = useCallback(effect, dependencies);

    useEffect(() => {
      const timeout = setTimeout(callback, delay);
      return () => clearTimeout(timeout);
    }, [callback, delay]);
  }

  useDebounce(
    async () => {
      try {
        if(inputValue.length === 0) {
          getRecipeData();
          setSearchMode(false);
          return;
          }
          
          const data = await getRecipesByName(inputValue);
          setRecipes(data.data);
          setSearchMode(true);
      } catch (error) {
        console.error(error);
      }
    },
    [inputValue],
    500
  );

  return (
    <div>
      <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
        All Recipes
      </div>

      <div className='p-4'>

        <input onChange={(e) => setInputValue(e.target.value)}  type="text" className={`${themes.textfield} mt-5`} placeholder='Whats your craving?' />
        
        <div className='flex flex-wrap mt-4'>
          {
            recipes.map((r, i) => 
              <a href={routes.recipeDetail(r.id)} key={i} className="w-1/3 p-2">
                <div className='rounded border cursor-pointer p-2 flex hover:bg-slate-800 text-left'>
                  <div>
                    <img width={150} className='rounded' src={r.img_url} alt="" />
                  </div>

                  <div className='w-full ml-4'>
                    <div className='font-bold text-white text-2xl'>
                      {r.name}&nbsp;&nbsp;
                      {
                        r.favourites.some(f => f.user_id == userId.current) && <FontAwesomeIcon width={20} icon={faHeart} />
                      }
                    </div>

                    <div className='mt-3 text-sm'>
                    <FontAwesomeIcon width={15} icon={faLayerGroup} /> {r.category.name}
                    </div>

                    <div className='mt-1 text-sm'>
                      <FontAwesomeIcon width={15} icon={faMapMarkerAlt} /> {r.area.name}
                    </div>
                    
                    <div className='mt-1 text-sm'>
                      <FontAwesomeIcon width={15} icon={faTags} /> {r.tags ?? '-'}
                    </div>
                </div>
                </div>
              </a>
            )
          }
        </div>

        {
          recipes.length === 0 && <center className='mt-4'>
            <img width={400} className='rounded p-5 bg-slate-700' src={EmptyCart} alt="" srcSet="" />
            <div className='font-bold mt-3 text-2xl text-white'>No Recipes Found</div>
          </center>
        }
        
        {
          !searchMode && 
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
        }
      </div>
    </div>
  );
}
  
export default RecipesContent;