import React from 'react'
import { EventCard } from './EventCard';

export const EventsContainer = ({ apiEvents, user }) => {
    const numEvents = apiEvents.length;
    return (
        <div className="h-auto bg-gray-100 relative">
            {apiEvents.length > 0 ?
                <div className="border-b py-0.5 flex justify-around  bg-sky-100 ">
                    <p className='text-md font-medium text-gray-600'>No. of events found: <span className="font-semibold text-cyan-800">{numEvents}</span></p>
                </div>
                :
                <div className="py-0.5 flex justify-around  bg-sky-100 ">
                    <p className='font-medium text-md text-gray-600'>Please enter a query above to see events</p>
                </div>
            }
            {apiEvents.length > 0 ?
                <div className='p-4 h-[33rem] space-y-2 overflow-y-scroll relative'>
                    {apiEvents.map((event, index) => (
                        <EventCard event={event} cardId={index} key={index} user={user} num={index + 1}></EventCard>
                    ))
                    }
                </div>
                :
                <div className='flex relative h-[33rem] bg-slate-50'>

                </div>
            }


        </div>
    )
}
