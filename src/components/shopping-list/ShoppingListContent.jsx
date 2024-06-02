import { faAdd, faLongArrowAltRight, faTrashAlt, faX } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import themes from "../../common/theme";
import OptionsLogo from "../../assets/svg/options.svg";

function ShoppingListContent() {
  const [showListInput, setShowListInput] = useState(false);
  const [showShoppingListInput, setShowShoppingListInput] = useState(false);
  const [progress, setProgress] = useState('0');
  const [selectedList, setSelectedList] = useState({
    name: 'Shopping List'
  });

  const [list, setList] = useState([
    {
      id: 1,
      name: 'Pizza Pepperoni',
    },
    {
      id: 2,
      name: 'AK 47',
    }
  ]);
  const [todos, setTodos] = useState([]);

  function check(selectedTodo) {
    const updatedTodos = todos.map((t) => {
      if(t.id === selectedTodo.id) {
        return {
          ...t,
          isDone: !selectedTodo.isDone
        }
      }

      return t;
    });

    setProgress(calculateCompletionPercentage(updatedTodos));
    setTodos(updatedTodos);
  }
  
  function selectList(selectedList) {
    const todosList = [
      {
        id: 1,
        isDone: false,
        text: '1 gr cocaine',
      },
      {
        id: 2,
        isDone: false,
        text: '1 gr sugar',
      },
      {
        id: 3,
        isDone: false,
        text: '1 bar chocolate',
      }
    ]
    setTodos(todosList);
    setProgress(calculateCompletionPercentage(todosList));
    setSelectedList(selectedList);
  }

  function deleteList(e, selectedL) {
    e.stopPropagation();

    if(selectedList.id == selectedL.id) {
      setTodos([]);
      setSelectedList({});
    }

    const updatedList = list.filter((l) => {
      if(l.id === selectedL.id) {
        return false
      }

      return true;
    });

    setList(updatedList);
  }
  
  function deleteTodo(e, selectedTodo) {
    e.stopPropagation();

    const updatedTodos = todos.filter((t) => {
      if(t.id === selectedTodo.id) {
        return false
      }

      return true;
    });

    setProgress(calculateCompletionPercentage(updatedTodos));
    setTodos(updatedTodos);
  }

  function calculateCompletionPercentage(array) {
    if (array.length === 0) return 0;

    const completedCount = array.reduce((count, obj) => {
        return count + (obj.isDone ? 1 : 0);
    }, 0);

    const completionPercentage = (completedCount / array.length) * 100;
    
    return Math.floor(completionPercentage);
  }

  function addNewList(e) {
    e.preventDefault();
    setList([
      ...list,
      {
        id: list.length + 1,
        name: e.target.elements[0].value,
      }
    ]);
    setShowListInput(false);
  }

  function addShoppingList(e) {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        isDone: false,
        text: e.target.elements[0].value,
      }
    ]);
    setShowShoppingListInput(false);
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-2/3">
        <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
          {
            todos.length === 0 
              ? <>Shopping List</>
              : <>{selectedList.name} ({progress}%)</>
          }
          
        </div>

        {
          todos.length === 0 
            ? <center>
              <img src={OptionsLogo} className="bg-slate-600 p-10 rounded-lg w-1/3 mt-24" alt="" srcSet="" />
              <div className="mt-6 font-semibold text-xl">
                Select a list from the right pane&nbsp;&nbsp;<FontAwesomeIcon icon={faLongArrowAltRight} /> 
              </div>
            </center>
            : <div className="p-3">
              {
                todos.map((t, i) => <div key={i} onClick={() => check(t)} className="cursor-pointer flex w-full text-left hover:bg-gray-700 p-2 rounded">
                  <div>
                    <input readOnly type="checkbox" checked={t.isDone} name="" id="" />
                  </div>
                  <div>&nbsp;&nbsp;</div>
                  <div className={`${t.isDone ? 'line-through' : ''} flex-grow`}>
                    {t.text}
                  </div>
                  <button onClick={(e) => deleteTodo(e, t)} className="p-.5 px-1.5 hover:bg-gray-600 rounded">
                    <FontAwesomeIcon icon={faX} className='text-xs' title='Delete' />
                  </button>
                </div>
                )
              }
    
              {
                showShoppingListInput && <form onSubmit={addShoppingList}>
                  <input required type="text" className={`mt-3 ${themes.textfield}`} autoFocus placeholder="Enter to submit" />
                </form>
              }
              
              <button onClick={() => setShowShoppingListInput(true)} className="mt-3 w-full dark:bg-gray-800 bg-white p-2 rounded hover:bg-gray-700">
                <FontAwesomeIcon icon={faAdd} title='Add' /> Add Shopping List
              </button>
            </div>
        }
        
      </div>
      <div className="w-1/3 h-screen border-l">
        <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
          Lists
        </div>
        <div className="p-3">
          {
            list.map((l, i) => <div key={i} onClick={() => selectList(l)} className={`mb-2 cursor-pointer flex text-left hover:bg-gray-700 p-2 rounded ${selectedList.id === l.id ? 'bg-slate-600' : ''}`}>
              <div className="flex-grow">
                {l.name}
              </div>

              <div>
                <button onClick={(e) => deleteList(e, l)} className="p-.5 px-1.5 hover:bg-gray-600 rounded">
                  <FontAwesomeIcon icon={faTrashAlt} className='text-xs' title='Delete' />
                </button>
              </div>
            </div>)
          }

          {
            showListInput && <form onSubmit={addNewList}>
              <input required type="text" className={`mt-3 ${themes.textfield}`} autoFocus placeholder="Enter to submit" />
            </form>
          }
          
          <button onClick={() => setShowListInput(true)} className="mt-3 w-full dark:bg-gray-800 bg-white p-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faAdd} title='Add' /> New List
          </button>
        </div>
      </div>
    </div>
  );
}
  
  export default ShoppingListContent;
  