import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import RecipeSelector from "../RecipeSelector";
import { addMealPlan, deleteMealPlan, getMealPlans, getMealPlansByDate } from "../../services/meal_planner_service";
import { toast } from "react-toastify";
import DatePicker from "../../assets/svg/date_picker.svg";

function MealPlannerContent() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [mealPlansByDate, setMealPlansByDate] = useState([]);

  useEffect(() => {
    getMealPlansData();
  }, []);

  async function getMealPlansData() {
    const data = await getMealPlans();
    setMealPlans(data.data.map(d => ({
      id: d.id,
      title: d.recipe.name,
      date: d.date_string
    })));
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDateClick(e) {
    setSelectedDate(e);
    const data = await getMealPlansByDate(e.dateStr);
    setMealPlansByDate(data.data);
  }
  
  async function selectRecipe(r) {
    closeModal();
    const mealPlan = await addMealPlan({
      recipeId: r.id,
      dateString: selectedDate.dateStr
    });

    setMealPlans([...mealPlans, {
      id: mealPlan.data.id,
      title: r.name,
      date: selectedDate.dateStr
    }]);

    setMealPlansByDate([...mealPlansByDate, mealPlan.data]);
  }

  function openModal() {
    if(selectedDate == null) {
      toast.error('Please select a date first');
      return;
    }

    setIsOpen(true);
  }

  async function deleteMealPlanClick(e, m) {
    e.stopPropagation();
    await deleteMealPlan(m.id);
    setMealPlansByDate(mealPlansByDate.filter(meal => m.id != meal.id));
    setMealPlans(mealPlans.filter(meal => m.id != meal.id));
  }

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            background: "rgba(33, 35, 47, 0.7)",
          },
          content: {
            border: 0,
            width: '700px',
            background: '#1f2937',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            boxShadow: 'var(0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            transform: 'translate(-50%, -50%)',
          }
        }}
        contentLabel="Example Modal"
      >
        <RecipeSelector selectHandler={selectRecipe} />
      </ReactModal>

      <div className="pt-5">
        <FullCalendar
          viewClassNames={'z-0'}
          events={mealPlans}
          height={550}
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          selectable
          dayCellClassNames={'cursor-pointer'}
          headerToolbar={{
            right: 'prev,next'
          }}
        />
      </div>
      <hr />
      <div className="p-5">
          {
            selectedDate != null
              ? <>
                <div className="mb-3">All planned meals on {selectedDate.dateStr}:</div>
                <div className="flex flex-wrap">
                  {
                    mealPlansByDate.map((m, i) => <div key={i} className="w-1/4 text-left pr-5 pb-5">
                      <div className="flex rounded bg-slate-800 cursor-pointer hover:bg-slate-700 p-3 h-24">
                        <div>
                          <img width={70} className="rounded" src={m.recipe.img_url} alt="" srcSet="" />
                        </div>
      
                        <div className="px-4 flex-grow">
                          <div className="text-white font-semibold">{m.recipe.name}</div>
                          <div>{m.recipe.category.name}</div>
                          <div className="text-xs">Tags: {m.recipe.tags ?? '-'}</div>
                        </div>
                        
                        <div className="px-4">
                          <button onClick={(e) => deleteMealPlanClick(e, m)} className="p-.5 px-1.5 hover:bg-gray-600 rounded">
                            <FontAwesomeIcon icon={faX} className='text-sm' title='Remove' />
                          </button>
                        </div>
                      </div>
                    </div>)
                  }
                  
                  <button className="w-1/4 pr-5 pb-5" onClick={openModal}>
                    <div className="h-24 rounded hover:bg-slate-700 border-dashed border bg-slate-800 p-3 h-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faAdd} className='text-sm' title='Add Meal' />&nbsp;&nbsp;New Meal
                    </div>
                  </button>
                </div>
              </>
              : <div className="text-center">
                <center>
                  <img width={220} className="rounded p-5 bg-slate-700" src={DatePicker} alt="" srcSet="" />
                  <div className="mt-4 text-lg font-bold">
                    Please select a date
                  </div>
                </center>
              </div>
          }
      </div>
    </div>
  );
}

  export default MealPlannerContent;
  