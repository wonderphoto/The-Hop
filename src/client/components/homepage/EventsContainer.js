import React from 'react'
import { EventCard } from './EventCard';

export const EventsContainer = ({ apiEvents }) => {
    const numEvents = apiEvents.length;
    return (
        <div className="h-auto bg-gray-100 relative">
            {apiEvents.length > 0 ?
                <div className="border-b py-0.5 mt-1 mb-2 flex justify-around">
                    <p className='text-md font-medium'>No. of events: {numEvents}</p>
                </div>
                :
                <div className="border-b py-0.5 mt-1 flex justify-around">
                    <p className='text-md font-medium'>Please enter a query to see events</p>
                </div>
            }
            <div className='p-4 h-[33rem] space-y-2 overflow-y-scroll relative'>
                {apiEvents.length > 0 ?
                    apiEvents.map((event, index) => (
                        <EventCard event={event} key={index}></EventCard>
                    )) :
                    <div></div>
                }
            </div>

        </div>
    )
}
