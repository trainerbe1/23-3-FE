import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";

function MealPlannerContent() {
  const [selectedDate, setSelectedDate] = useState({});

  function handleDateClick(e) {
    setSelectedDate(e);
    openModal();
  }

  return (
    <div>
      <div className="pt-5">
        <FullCalendar
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
          <div className="mb-3">All planned meals:</div>
          <div className="flex flex-wrap">
            <div className="w-1/4 pr-5 pb-5">
              <div className="flex rounded bg-slate-800 p-3">
                <div>
                  <img width={80} className="rounded" src="https://media.cookbookmanager.com/61/AI5cPNmtGFZvOYsDaecASWbMDBFzNwONFXy0Qsbeh5rmhodaRTXSWfPd3ZBbZ0j5.png" alt="" srcset="" />
                </div>

                <div className="px-4 flex-grow">
                  <div className="text-white font-semibold">Lunch</div>
                  <div>Pumpkin Soup</div>
                  <div className="text-xs">Vegetarian</div>
                </div>
                
                <div className="px-4">
                  <button className="p-.5 px-1.5 hover:bg-gray-600 rounded">
                    <FontAwesomeIcon icon={faX} className='text-sm' title='Remove' />
                  </button>
                </div>
              </div>
            </div>
            
            <button className="w-1/4 pr-5 pb-5">
              <div className="rounded hover:bg-slate-700 border-dashed border bg-slate-800 p-3 h-full flex items-center justify-center">
                <FontAwesomeIcon icon={faAdd} className='text-sm' title='Add Meal' />&nbsp;&nbsp;New Meal
              </div>
            </button>
          </div>
      </div>
    </div>
  );
}

  export default MealPlannerContent;
  