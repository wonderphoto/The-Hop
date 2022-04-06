import React from 'react'
import { SavedEventCard } from './SavedEventCard';
import { useState } from 'react';

//savedEventsContainer holds individual event cards that display all event information
//rendering the event cards fetched from the database

export const SavedEventsContainer = ({ user }) => {
    const [userEvents, setUserEvents] = useState({});
    //if we are logged in then we fetch from DB
    //const loadEvents = async () => {
        fetch('http://localhost:3000/api/events', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                setUserEvents(data);
                console.log("userEvents = ", userEvents);
            })
            .catch(err => {
                console.log(err);
            })
   // }
    //loadEvents();
        return (
            <div className="inline-flex h-3/4 border-2 border-red-300 justify-center">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm text-center">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-4 flex">Saved Events</h5>
                    {/* <p className="list-item text-gray-700 text-base mb-4">
                        
                    </p>
                    <p className="list-item text-gray-700 text-base mb-4">
                        
                    </p> */}
                    
                        {userEvents.length > 0 ? userEvents.map((event, index) => (
                        <SavedEventCard event={event} cardId={index} key={index} user={user}></SavedEventCard> 
                        )): <div></div> }
                </div>
            </div>
        )
    }

//     return (
//         <div className="h-auto bg-gray-100 relative">
//             {apiEvents.length > 0 ?
//                 <div className="border-b py-0.5 flex justify-around  bg-sky-100 ">
//                     <p className='text-md font-medium text-gray-600'>No. of events saved: <span className="font-semibold text-cyan-800">{userEvents}</span></p>
//                 </div>
//                 :
//                 <div className="py-0.5 flex justify-around  bg-sky-100 ">
//                     <p className='font-medium text-md text-gray-600'>Please enter a query above to see events</p>
//                 </div>
//             }
//             {apiEvents.length > 0 ?
//                 <div className='p-4 h-[33rem] space-y-2 overflow-y-scroll relative'>
//                     {apiEvents.map((event, index) => (
//                         <SavedEventCard event={event} cardId={index} key={index} user={user}></SavedEventCard>
//                     ))
//                     }
//                 </div>
//                 :
//                 <div className='flex relative h-[33rem] bg-slate-50'>

//                 </div>
//             }
//         </div>
//     )
// }