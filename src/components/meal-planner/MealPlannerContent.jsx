import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faX } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";

function MealPlannerContent() {
  const [selectedDate, setSelectedDate] = useState({});
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleDateClick(e) {
    setSelectedDate(e);
  }

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
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
        <div className="text-slate-400">
          Lorem ipsum dolor sit amet consectetur
        </div>
      </ReactModal>

      <div className="pt-5">
        <FullCalendar
          viewClassNames={'z-0'}
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
                  <img width={80} className="rounded" src="https://media.cookbookmanager.com/61/AI5cPNmtGFZvOYsDaecASWbMDBFzNwONFXy0Qsbeh5rmhodaRTXSWfPd3ZBbZ0j5.png" alt="" srcSet="" />
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
            
            <button className="w-1/4 pr-5 pb-5" onClick={() => setIsOpen(true)}>
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
  