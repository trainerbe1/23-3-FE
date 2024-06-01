import { faAdd, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function ShoppingListContent() {
  const [showShoppingListInput, setShowShoppingListInput] = useState(false);
  const [title, setTitle] = useState('Pizza Pepperoni');
  const [progress, setProgress] = useState('0');

  const [list, setList] = useState([
    {
      name: 'Pizza Pepperoni',
    },
    {
      name: 'AK 47',
    }
  ]);

  const [todos, setTodos] = useState([
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
  ]);

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
    setTitle(selectedList.name);
  }

  function deleteList(e, l) {
    e.stopPropagation();
  }

  function calculateCompletionPercentage(array) {
    if (array.length === 0) return 0;

    const completedCount = array.reduce((count, obj) => {
        return count + (obj.isDone ? 1 : 0);
    }, 0);

    const completionPercentage = (completedCount / array.length) * 100;
    
    return Math.floor(completionPercentage);
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
          {title} ({progress}%)
        </div>
        <div className="p-3">
          {
            todos.map((t, i) => <button key={i} onClick={() => check(t)} className="flex w-full text-left hover:bg-gray-700 p-2 rounded">
              <div>
                <input readOnly type="checkbox" checked={t.isDone} name="" id="" />
              </div>
              <div>&nbsp;&nbsp;</div>
              <div className={`${t.isDone ? 'line-through' : ''}`}>
                {t.text}
              </div>
            </button>
            )
          }

          {
            showShoppingListInput && <form onSubmit={addShoppingList}>
              <input required type="text" className="w-full mb-2 px-2 py-1" autoFocus placeholder="Enter to submit" />
            </form>
          }
          
          <button onClick={() => setShowShoppingListInput(true)} className="w-full dark:bg-gray-800 bg-white p-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faAdd} title='Add' /> Add Shopping List
          </button>
        </div>
      </div>
      <div className="w-1/3 h-screen border-l">
        <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
          Lists
        </div>
        <div className="p-3">
          {
            list.map((l, i) => <div key={i} onClick={() => selectList(l)} className="cursor-pointer flex text-left hover:bg-gray-700 p-2 rounded">
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
        </div>
      </div>
    </div>
  );
}
  
  export default ShoppingListContent;
  